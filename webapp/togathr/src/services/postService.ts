import { POSTS } from '../models/constants/tableNames';
import { CreatePostRequest } from '../models/request/createPostRequest';
import { APIResponse } from '../models/response/apiResponse';
import { supabase } from '../supabase';
import { convertToCamelCase, convertToCamelCaseArray } from '../utils/convertToCamelCase';

export async function createPost ( request: CreatePostRequest ): Promise<APIResponse> {
    const { data, error } = await supabase.from( POSTS ).insert( {
        content: request.content,
        event_id: request.eventId,
        created_by: request.createdBy,
        profile_id: request.profileId
    } ).single();

    return {
        error,
        payload: convertToCamelCase( data )
    }
}

export async function deletePost ( postId: number ): Promise<APIResponse> {
    const { data, error } = await supabase.from( POSTS ).delete().match( {
        id: postId
    } ).single();

    return {
        objectId: data.id,
        payload: data,
        error
    }
}

export async function getTopLevelPosts ( eventId: number ): Promise<APIResponse> {
    const { data, error } = await supabase.from( POSTS )
        .select( `
            id, 
            content, 
            created_at,
            created_by,
            updated_at,
            profiles:profile_id (
                avatar_url,
                full_name,
                picture_url
            )`
        )
        .eq( 'event_id', eventId )
        .is( 'parent_id', null )
        .order( 'created_at', { ascending: false } );

    // TODO: update convertToCamelCaseArray to handle nested objects
    return {
        payload: convertToCamelCaseArray( data ),
        error: error
    }
}