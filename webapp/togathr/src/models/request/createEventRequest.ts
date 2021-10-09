export interface CreateEventRequest {
    address1?: string;
    address2?: string;
    city?: string;
    country?: string;
    createdBy: string;
    description?: string;
    endDate: string;
    endTime: string;
    isPrivate: boolean;
    locationName?: string;
    name: string;
    startDate: string;
    startTime: string;
    state?: string;
    zip?: string;
}