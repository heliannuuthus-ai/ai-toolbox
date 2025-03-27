import {
  BlockEnum,
  ErrorHandleTypeEnum,
  FileResponse,
  IterationDurationMap,
  LoopDurationMap,
  TransferMethod,
} from "./common";

export type AgentLogItem = {
  node_execution_id: string;
  id: string;
  node_id: string;
  parent_id?: string;
  label: string;
  data: object; // debug data
  error?: string;
  status: string;
  metadata?: {
    elapsed_time?: number;
    provider?: string;
    icon?: string;
  };
};

export type AgentLogItemWithChildren = AgentLogItem & {
  hasCircle?: boolean;
  children: AgentLogItemWithChildren[];
};

export type WorkflowStartedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    id: string;
    workflow_id: string;
    sequence_number: number;
    created_at: number;
  };
};

export type WorkflowFinishedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    id: string;
    workflow_id: string;
    status: string;
    outputs: any;
    error: string;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number;
    created_by: {
      id: string;
      name: string;
      email: string;
    };
    finished_at: number;
    files?: FileResponse[];
  };
};

export type NodeStartedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type NodeFinishedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type IterationStartedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type IterationNextResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type IterationFinishedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type ParallelBranchStartedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type ParallelBranchFinishedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: NodeTracing;
};

export type NodeTracing = {
  id: string;
  index: number;
  predecessor_node_id: string;
  node_id: string;
  iteration_id?: string;
  loop_id?: string;
  node_type: BlockEnum;
  title: string;
  inputs: any;
  process_data: any;
  outputs?: any;
  status: string;
  parallel_run_id?: string;
  error?: string;
  elapsed_time: number;
  execution_metadata?: {
    total_tokens: number;
    total_price: number;
    currency: string;
    iteration_id?: string;
    iteration_index?: number;
    loop_id?: string;
    loop_index?: number;
    parallel_id?: string;
    parallel_start_node_id?: string;
    parent_parallel_id?: string;
    parent_parallel_start_node_id?: string;
    parallel_mode_run_id?: string;
    iteration_duration_map?: IterationDurationMap;
    loop_duration_map?: LoopDurationMap;
    error_strategy?: ErrorHandleTypeEnum;
    agent_log?: AgentLogItem[];
    tool_info?: {
      agent_strategy?: string;
      icon?: string;
    };
  };
  metadata: {
    iterator_length: number;
    iterator_index: number;
    loop_length: number;
    loop_index: number;
  };
  created_at: number;
  created_by: {
    id: string;
    name: string;
    email: string;
  };
  iterDurationMap?: IterationDurationMap;
  loopDurationMap?: LoopDurationMap;
  finished_at: number;
  extras?: any;
  expand?: boolean; // for UI
  details?: NodeTracing[][]; // iteration or loop detail
  retryDetail?: NodeTracing[]; // retry detail
  retry_index?: number;
  parallelDetail?: {
    // parallel detail. if is in parallel, this field will be set
    isParallelStartNode?: boolean;
    parallelTitle?: string;
    branchTitle?: string;
    children?: NodeTracing[];
  };
  parallel_id?: string;
  parallel_start_node_id?: string;
  parent_parallel_id?: string;
  parent_parallel_start_node_id?: string;
  agentLog?: AgentLogItemWithChildren[]; // agent log
};
