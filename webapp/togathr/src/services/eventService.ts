import { Event, EventDetail } from '../models/event';
import { CreateEventRequest } from '../models/request/createEventRequest';
import { APIResponse } from '../models/response/apiResponse';
import { EventDetailResponse } from '../models/response/eventDetailResponse';
import { GetEventsResponse } from '../models/response/getEventsResponse';
import { supabase } from '../supabase';
import { convertToCamelCase } from '../utils/convertToCamelCase';

export async function createEvent ( request: CreateEventRequest ): Promise<APIResponse> {
    const {
        address1, address2, city, country, locationName, name, createdBy,
        description, endDate, endTime,
        isPrivate, startDate, startTime, state, zip } = request;

    const { data, error } = await supabase.from( 'event' ).insert( {
        address1,
        address2,
        city,
        country,
        created_by: createdBy,
        description: description,
        end_date: endDate,
        end_time: endTime,
        is_private: isPrivate,
        location_name: locationName,
        name: name,
        start_date: startDate,
        start_time: startTime,
        state,
        zip
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

export async function getEventDetail ( eventId: number, currentUserId: string ): Promise<EventDetailResponse> {
    const { data, error } = await supabase.from( 'event' )
        .select( '*' )
        .match( {
            created_by: currentUserId,
            id: eventId
        } ).single();

    if ( error || !data ) {
        return {
            error,
        }
    }

    const converted = convertToCamelCase( data ) as EventDetail;
    converted.isOwner = converted.createdBy === currentUserId;

    return {
        data: converted
    }
}

/**
 * 
 * @param createdBy 
 * @returns 
 */
export async function getPastEvents ( createdBy: string ): Promise<GetEventsResponse> {
    const today = new Date().toISOString().slice( 0, 10 );
    // const now = new Date().toLocaleTimeString();

    const { data, error } = await supabase.from( 'event' )
        .select( 'id, name, start_time, end_time, start_date, end_date, location_name' )
        .eq( 'created_by', createdBy )
        .lte( 'end_date', today );

    if ( error ) {
        return {
            error,
            data: []
        };
    }

    const converted = data?.map( ( obj: any ) => {
        return convertToCamelCase( obj );
    } ) as Event[];

    return {
        error: null,
        data: converted
    };
}

export async function getUpcomingEvents ( createdBy: string ): Promise<GetEventsResponse> {
    const today = new Date().toISOString().slice( 0, 10 );
    // const now = new Date().toLocaleTimeString();

    const { data, error } = await supabase.from( 'event' )
        .select( 'id, name, start_time, end_time, start_date, end_date, location_name' )
        .eq( 'created_by', createdBy )
        .gte( 'start_date', today );

    if ( error ) {
        return {
            error,
            data: []
        };
    }

    const converted = data?.map( ( obj: any ) => {
        return convertToCamelCase( obj );
    } ) as Event[];

    return {
        error: null,
        data: converted
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