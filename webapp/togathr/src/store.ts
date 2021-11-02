import { User } from '@supabase/supabase-js';
import { reactive } from "vue";

interface Store {
    user: User | null,
    currentEvent: any,
}

export const store = reactive( {
    user: {},
    currentEvent: {}
} as Store );