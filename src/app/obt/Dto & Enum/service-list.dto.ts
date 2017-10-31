export interface ServiceList {
    AnswerID: number[];
    RecommendationID: number[];
    ResponseID: number[];
    ServiceType: string;
    IndexList: string;
}

export enum ServiceType {
    'Flight',
    'Hotel'
}

