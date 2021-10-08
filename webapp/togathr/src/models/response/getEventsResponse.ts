import { PostgrestError } from '@supabase/postgrest-js';
import { Event } from '../event';

export interface GetEventsResponse {
    error: PostgrestError | null;
    data: Event[];
}