import { PROFILES } from '../models/constants/tableNames';
import { UpdateProfileRequest } from '../models/request/updateProfileRequest';
import { APIResponse } from '../models/response/apiResponse';
import { supabase } from '../supabase';

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
    }, { returning: 'minimal' } );

    return {
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