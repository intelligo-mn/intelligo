export interface ChatServerConnection {
	Name: string;
	ServerUrl: string;
	APIKey: string;
	APISecret: string;
	IsDefault: boolean;
	ChatProjects: ChatBotProject[];
}

export interface ChatBotProject {
	Name: string;
	CreatedOn: Date;
	UpdatedOn: Date;
	Id: string;
}

export interface ChatBotReferance {
	Name: string;
	ServerUrl: string;
	APIKey: string;
	APISecret: string;
	IsDefault: boolean;
}


