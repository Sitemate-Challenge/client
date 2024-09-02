export interface IIssueData {
	id: string;
	title: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IIssuePayload {
	id?: string;
	title: string;
	description: string;
}
