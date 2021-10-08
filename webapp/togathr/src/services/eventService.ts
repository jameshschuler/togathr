import { PostgrestError } from '@supabase/postgrest-js';
import { Event } from '../models/event';
import { CreateEventRequest } from '../models/request/createEventRequest';
import { GetEventsResponse } from '../models/response/getEventsResponse';
import { supabase } from '../supabase';

export interface Response {
    error: PostgrestError | null;
    createdObjectId?: number;
}

export async function createEvent ( request: CreateEventRequest ): Promise<Response> {
    const { name, createdBy, description, endDate, endTime, isPrivate, startDate, startTime } = request;

    const { data, error } = await supabase.from( 'event' ).insert( {
        created_by: createdBy,
        description: description,
        end_date: endDate,
        end_time: endTime,
        is_private: isPrivate,
        name: name,
        start_date: startDate,
        start_time: startTime
    } );

    if ( !error && data && data[ 0 ] ) {
        return {
            createdObjectId: data[ 0 ].id,
            error: null
        };
    }

    return {
        error
    };
}

export async function getUpcomingEvents ( createdBy: string ): Promise<GetEventsResponse> {
    const today = new Date().toISOString().slice( 0, 10 );
    // const now = new Date().toLocaleTimeString();

    const { data, error } = await supabase.from( 'event' )
        .select( 'id, name' )
        .eq( 'created_by', createdBy )
        .gte( 'start_date', today );

    if ( error ) {
        return {
            error,
            data: []
        };
    }

    return {
        error: null,
        data: data as Event[]
    };
}

export async function isEventNameUnique ( createdBy: string, eventName: string ): Promise<boolean> {
    const { count, error } = await supabase.from( 'event' )
        .select( 'id', { count: 'exact' } )
        .match( {
            created_by: createdBy,
            name: eventName
        } );

    return count !== null && count === 0;
}