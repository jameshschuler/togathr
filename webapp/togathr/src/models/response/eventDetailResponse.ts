import { PostgrestError } from '@supabase/postgrest-js';
import { EventDetail } from '../event';

export interface EventDetailResponse {
    data?: EventDetail;
    error?: PostgrestError | null;
}