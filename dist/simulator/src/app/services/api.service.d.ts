import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class APIService {
    http: HttpClient;
    fileUploadEndpoint: string;
    apiEndpoint: string;
    private chatHistoryEndpoint;
    constructor(http: HttpClient);
    setAPIEndpoint(apiEndpoint: string): void;
    uploadFile(file: File): Observable<UploadFileResponse>;
    fetchHistory(oldestMsgTimestamp: number, size?: number): Observable<ChatHistoryResponse>;
}
export interface Link {
    rel: string;
    href: string;
}
export interface UploadFileResponse {
    data: boolean;
    links: Link[];
}
export interface ChatHistoryResponse {
    content: any[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
    totalPages: number;
}
