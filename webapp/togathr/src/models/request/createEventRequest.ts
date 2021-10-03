export interface CreateEventRequest {
    createdBy: string;
    description?: string;
    endDate: string;
    endTime: string;
    isPrivate: boolean;
    name: string;
    startDate: string;
    startTime: string;
}