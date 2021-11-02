import { PostgrestError } from '@supabase/supabase-js';

export interface APIResponse {
    error: PostgrestError | null;
    createdObjectId?: number;
    payload?: any;
}