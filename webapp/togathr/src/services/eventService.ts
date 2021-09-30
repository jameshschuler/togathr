import { CreateEventRequest } from '../models/request/createEventRequest';
import { supabase } from '../supabase';

export async function createEvent ( request: CreateEventRequest ) {
    console.log( request );

    const { data, error } = await supabase.from( 'event' ).insert( {
        name: request.name,
        created_by: request.createdBy
    } );

    console.log( data );
    console.log( error );
}