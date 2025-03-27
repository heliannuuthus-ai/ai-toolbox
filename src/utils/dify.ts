import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  Method,
} from "axios";

// Define event types as an enum
export enum EventType {
  WORKFLOW_STARTED = "workflow_started",
  WORKFLOW_FINISHED = "workflow_finished",
  NODE_STARTED = "node_started",
  NODE_FINISHED = "node_finished",
  ITERATION_STARTED = "iteration_started",
  ITERATION_NEXT = "iteration_next",
  ITERATION_FINISHED = "iteration_finished",
  PARALLEL_BRANCH_STARTED = "parallel_branch_started",
  PARALLEL_BRANCH_FINISHED = "parallel_branch_finished",
  MESSAGE = "message",
  MESSAGE_END = "message_end",
  MESSAGE_REPLACE = "message_replace",
  ERROR = "error",
}

// Import types (assuming they are defined in a separate types file)
import { MessageEnd, MessageReplace } from "@/types/chat";
import {
  IterationFinishedResponse,
  IterationNextResponse,
  IterationStartedResponse,
  NodeFinishedResponse,
  NodeStartedResponse,
  ParallelBranchFinishedResponse,
  ParallelBranchStartedResponse,
  WorkflowFinishedResponse,
  WorkflowStartedResponse,
} from "@/types/workflow";

type Canceler = () => Promise<void>;

type EventHandlerMap = {
  [EventType.WORKFLOW_STARTED]: (
    data: WorkflowStartedResponse,
  ) => Promise<void>;
  [EventType.WORKFLOW_FINISHED]: (
    data: WorkflowFinishedResponse,
  ) => Promise<void>;
  [EventType.NODE_STARTED]: (data: NodeStartedResponse) => Promise<void>;
  [EventType.NODE_FINISHED]: (data: NodeFinishedResponse) => Promise<void>;
  [EventType.ITERATION_STARTED]: (
    data: IterationStartedResponse,
  ) => Promise<void>;
  [EventType.ITERATION_NEXT]: (data: IterationNextResponse) => Promise<void>;
  [EventType.ITERATION_FINISHED]: (
    data: IterationFinishedResponse,
  ) => Promise<void>;
  [EventType.PARALLEL_BRANCH_STARTED]: (
    data: ParallelBranchStartedResponse,
  ) => Promise<void>;
  [EventType.PARALLEL_BRANCH_FINISHED]: (
    data: ParallelBranchFinishedResponse,
  ) => Promise<void>;
  [EventType.MESSAGE]: (data: MessageReplace) => Promise<void>;
  [EventType.MESSAGE_END]: (data: MessageEnd) => Promise<void>;
  [EventType.MESSAGE_REPLACE]: (data: MessageReplace) => Promise<void>;
  [EventType.ERROR]: (error: unknown) => Promise<void>;
};

export class WorkflowClient {
  private axiosInstance: AxiosInstance;
  private listeners: Map<
    EventType,
    Array<EventHandlerMap[keyof EventHandlerMap]>
  > = new Map();
  private cancelTokenSource: CancelTokenSource | null = null;
  private canceler?: Canceler;
  constructor(
    baseUrl: string,
    headers?: Record<string, string>,
    timeout?: number,
    canceler?: Canceler,
  ) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...headers,
      },
      timeout: timeout || 180000,
    });
    this.canceler = canceler;
  }

  // Register event handlers with improved type safety
  public on<T extends EventType>(event: T, handler: EventHandlerMap[T]): this {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
    return this;
  }

  public unset(
    event: EventType,
    handler: EventHandlerMap[keyof EventHandlerMap],
  ) {
    return () => {
      const handlers = this.listeners.get(event) || [];
      const updatedHandlers = handlers.filter((h) => h !== handler);
      this.listeners.set(event, updatedHandlers);
    };
  }

  public setCanceler(canceler: Canceler) {
    this.canceler = canceler;
    return this;
  }

  public cleanup() {
    this.listeners.clear();
    this.cancelTokenSource = null;
    this.canceler = undefined;
  }

  // Run the workflow with improved error handling and type safety
  public async run(
    method: Method,
    url: string,
    payload?: unknown,
    options: AxiosRequestConfig = {},
  ): Promise<void> {
    // Cancel any existing request
    await this.cancel();

    // Create a new cancel token
    this.cancelTokenSource = axios.CancelToken.source();

    try {
      const response = await this.axiosInstance.request({
        method,
        url,
        data: payload,
        responseType: "stream",
        adapter: "fetch",
        cancelToken: this.cancelTokenSource.token,
        ...options,
      });

      await this.processStream(response);
    } catch (error) {
      if (!axios.isCancel(error)) {
        this.emitError(error);
      }
    }
  }

  // Improved stream processing with better error handling
  private async processStream(response: AxiosResponse): Promise<void> {
    const stream = response.data as ReadableStream<Uint8Array>;
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("stream ended");
          break;
        }

        buffer += decoder.decode(value);
        const lines = buffer.split("\n\n");

        for (let i = 0; i < lines.length - 1; i++) {
          const eventData = lines[i];
          if (eventData.startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(eventData.slice(6));
              await this.emit(jsonData);
            } catch (parseError) {
              await this.emitError(parseError);
            }
          }
        }

        buffer = lines[lines.length - 1];
      }
    } catch (error) {
      this.emitError(error);
    }
  }

  // Centralized event dispatching
  private async emit(jsonData: {
    event: EventType;
    [key: string]: unknown;
  }): Promise<void> {
    const handlers = this.listeners.get(jsonData.event as EventType);
    await Promise.all(
      handlers?.map(async (handler) => {
        try {
          await (handler as Function)(jsonData);
        } catch (handlerError) {
          await this.emitError(handlerError);
        }
      }) || [],
    );
  }

  // Centralized error notification
  private async emitError(error: unknown): Promise<void> {
    const errorHandlers = this.listeners.get(EventType.ERROR);
    await Promise.all(
      errorHandlers?.map(async (handler) => {
        try {
          await (handler as EventHandlerMap[EventType.ERROR])(error);
        } catch (handlerError) {
          console.error("Error in error handler", handlerError);
        }
      }) || [],
    );
  }

  // Cancel the current request
  public async cancel(): Promise<void> {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel("Operation canceled by the user.");
      this.cancelTokenSource = null;
      await this.canceler?.();
    }
  }
}
