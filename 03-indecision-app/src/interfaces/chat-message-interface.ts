export interface ChatMessage {
	id: number;
	message: string;
	sentByMe: boolean;
	image: string | null;
}
