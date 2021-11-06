export interface UpdateProfileRequest {
    userId: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    avatarUrl: string;
}