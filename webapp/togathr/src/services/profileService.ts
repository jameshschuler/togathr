import { PROFILES } from '../models/constants/tableNames';
import { CreateProfileRequest } from '../models/request/profile/createProfileRequest';
import { UpdateProfileRequest } from '../models/request/profile/updateProfileRequest';
import { APIResponse } from '../models/response/apiResponse';
import { supabase } from '../supabase';
import { convertToCamelCase } from '../utils/convertToCamelCase';

export async function updateProfile ( request: UpdateProfileRequest ): Promise<APIResponse> {
    const { avatarUrl, userId, firstName, fullName, lastName, picture } = request;
    const { objectId, error: profileError } = await getProfileId( userId );
    if ( profileError ) {
        return {
            error: profileError
        };
    }

    const { data, error } = await supabase.from( PROFILES ).upsert( {
        id: objectId,
        avatar_url: avatarUrl,
        first_name: firstName,
        full_name: fullName,
        last_name: lastName,
        user_id: userId,
        picture_url: picture,
        updated_at: objectId ? new Date() : null
    }, { returning: 'representation' } ).single();

    return {
        payload: data,
        error
    }
}

export async function createProfile ( request: CreateProfileRequest ): Promise<APIResponse> {
    const { avatarUrl, userId } = request;
    const { data, error } = await supabase.from( PROFILES ).insert( {
        avatar_url: avatarUrl,
        user_id: userId,
    }, { returning: 'representation' } ).single();

    return {
        error,
        payload: data
    };
}

export async function getProfile ( userId: string ): Promise<APIResponse> {
    const { data, error } = await supabase.from( PROFILES )
        .select( 'id, avatar_url, full_name, first_name, last_name' )
        .eq( 'user_id', userId ).single();

    return {
        objectId: data.id,
        payload: convertToCamelCase( data ),
        error
    }
}

export async function getProfileId ( userId: string ): Promise<APIResponse> {
    const { data, error } = await supabase.from( PROFILES )
        .select( 'id' ).eq( 'user_id', userId ).single();

    return {
        objectId: data.id,
        payload: data,
        error
    }
}