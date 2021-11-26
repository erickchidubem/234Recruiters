import { Job } from "./job";

export interface ResponseObject {
    counts: number;
    data: Job[];
}

export interface ApiResponse {
    responseCode: string;
    responseFriendlyMessage: string;
    responseObject: ResponseObject | Job;
    token?: any;
}