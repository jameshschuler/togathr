import { reactive } from "vue";
import { AppUser } from './models/response/supabase';
import { CurrentEvent } from './models/state/currentEvent';
import { Profile } from './models/state/profile';

interface Store {
    user: AppUser | null,
    currentEvent: CurrentEvent | null,
    profile: Profile | null;
}

export const store = reactive( {
    user: null,
    currentEvent: null,
    profile: null
} as Store );