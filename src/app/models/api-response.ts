import { Job } from "./job";

export interface ResponseObject {
    counts: number;
    data: Job[];
}

export class ApiResponse<T> {
    responseCode: string;
    responseFriendlyMessage: string;
    responseObject: T;
    token?: any;
}

export interface UserInfo {
    username: string;
    companyName: string;
    isInidividual: string;
    fullname: string;
    userid: string;
    phone: string;
    iat: number;
    email: string;
    dateCreated: string;
    userrole: string;
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
    entityName: string;
    firstName: string;
    lastName: string;
    userType: number;
}

export interface UserProfile {
    userProfile?: any;
    userWorkExp: any;
    userEducation: any;
    userCV: any;
    userRole: string;
}

export interface JobCategory {
    id: number;
    category: string;
    iconImage: string;
    jobCounts: number;
}

export const Employer = "EMPLOYER";
export const Candidate = "CANDIDATE";
