export interface CreateProfileRequest {
    userId: string;
    avatarUrl: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
}