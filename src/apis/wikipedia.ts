import clientFactory from "@/apis/axios";
import { AxiosResponse } from "axios";

const client = clientFactory("/api/wikipedia");

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export interface ChatRequest {
	messages: ChatMessage[];
	stream?: boolean;
}

export interface Model {
	chat_model: string;
	reasoner_model: string;
	image_to_text_model: string | null;
}

export const getModels = async (
	search: string | null = null,
	page: number = 1,
	perPage: number = 10
): Promise<AxiosResponse<Record<string, Model>>> => {
	return await client.get("/models", {
		params: { search: search && `${search}`, page, per_page: perPage },
	});
};

export const wikipedia = async (
	name: string,
	model: string,
	prompt: string,
	image: File | null,
	onDownloadProgress: (progressEvent: string) => void
): Promise<string> => {
	const formData = new FormData();
	formData.append("name", name);
	formData.append("model", model);
	formData.append("prompt", prompt);
	if (image) {
		formData.append("image", image);
	}
	return client.post("/glossary", formData, {
		onDownloadProgress: (progressEvent) => {
			const xhr = progressEvent.event.target;
			const { responseText }: { responseText: string } = xhr;
			onDownloadProgress(responseText);
		},
	});
};
