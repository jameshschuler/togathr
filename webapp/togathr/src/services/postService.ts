import { CreatePostRequest } from '../models/request/createPostRequest';
import { APIResponse } from '../models/response/apiResponse';
import { supabase } from '../supabase';

export async function createPost ( request: CreatePostRequest ): Promise<APIResponse> {
    const { data, error } = await supabase.from( 'post' ).insert( {
        content: request.content,
        event_id: request.eventId,
        created_by: request.createdBy
    } );

    return {
        error,
        payload: data?.[ 0 ]
    }
}

export async function getTopLevelPosts ( eventId: number ): Promise<APIResponse> {
    const { data, error } = await supabase.from( 'post' )
        .select( `
            id, 
            content, 
            created_at`
        )
        .eq( 'event_id', eventId )
        .is( 'parent_id', null );

    return {
        payload: data,
        error: error
    }
}