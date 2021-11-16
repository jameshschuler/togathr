import { reactive } from "vue";
import { AppUser } from './models/response/supabase';
import { CurrentEvent } from './models/state/currentEvent';
import { Profile } from './models/state/profile';

interface StoreState {
    user: AppUser | null,
    currentEvent: CurrentEvent | null,
    profile: Profile | null;
}

const state = reactive( {
    user: null,
    currentEvent: null,
    profile: null
} as StoreState );

const methods = {
    setCurrentEvent () {

    },
    setProfile ( payload: any ) {
        state.profile = payload ? payload : null;
    },
    setUser ( payload: AppUser | null ) {
        state.user = payload ? payload : null;
    },
};

export default {
    methods,
    state
}