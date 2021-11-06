import { User } from '@supabase/supabase-js';

export interface AppUser extends User {
    identities?: Array<Identity>;
}

export interface Identity {
    provider: string;
    identity_data: IdentityData;
}

export interface IdentityData {
    avatar_url: string;
    full_name: string;
    name: string;
    picture: string;
}