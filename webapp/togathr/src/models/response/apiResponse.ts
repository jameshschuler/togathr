import { PostgrestError } from '@supabase/supabase-js';

export interface APIResponse {
    error: PostgrestError | null;
    objectId?: number;
    payload?: any;
}