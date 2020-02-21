export declare class chatMessagesData {
    static chatMessages: {
        threads: {
            userId: string;
            threadId: string;
            displayName: string;
            email: string;
            img: string;
            status: string;
        }[];
        messages: {
            messageId: string;
            thread: string;
            displayName: string;
            email: string;
            img: string;
            message: string;
            timestamp: number;
        }[];
    }[];
}
