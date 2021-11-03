import { CreatePostRequest } from '../models/request/createPostRequest';
import { APIResponse } from '../models/response/apiResponse';
import { supabase } from '../supabase';
import { convertToCamelCaseArray } from '../utils/convertToCamelCase';

export async function createPost ( request: CreatePostRequest ): Promise<APIResponse> {
    const { data, error } = await supabase.from( 'post' ).insert( {
        content: request.content,
        event_id: request.eventId,
        created_by: request.createdBy,
        profile_id: request.profileId
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
            created_at,
            updated_at,
            profiles:profile_id (
                avatar_url,
                full_name,
                picture_url
            )`
        )
        .eq( 'event_id', eventId )
        .is( 'parent_id', null );

    return {
        payload: convertToCamelCaseArray( data ),
        error: error
    }
}