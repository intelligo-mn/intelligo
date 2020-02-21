import { InMemoryDbService } from "angular-in-memory-web-api";
export declare class MaterialLabDbService implements InMemoryDbService {
    createDb(): {
        'my-profile': {
            id: string;
            name: string;
            profileImg: string;
            backgroundImg: string;
            phone: string;
            email: string;
        }[];
        'my-contacts': {
            id: string;
            name: string;
            img: string;
            email: string;
            phone: string;
            status: string;
        }[];
        'user-contacts': {
            id: string;
            starred: string[];
            frequentContacts: string[];
        }[];
        'chat-messages': {
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
        'list': {
            title: string;
            img: string;
            text: string;
        }[];
        'tabs-over-card': {
            "tabsOverId": string;
            "name": string;
            "details": {
                "title": string;
                "content": string;
            }[];
        }[];
        'mail': {
            mailId: number;
            fromImg: string;
            from: string;
            subject: string;
            body: string;
            profileImg: string;
        }[];
    };
}
