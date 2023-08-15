export enum Status {
	content = 'content',
	done = 'done',
}

export interface IMessage {
	userMessage?: boolean,
	status: Status
	value: string | null
}
