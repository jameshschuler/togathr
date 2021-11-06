import { supabase } from '../supabase';
import { createProfile } from './profileService';

export async function signUpWithEmailPassword ( email: string, password: string ): Promise<Error | null> {
    // TODO: move to env variable
    let redirectTo = import.meta.env.DEV ? 'http://localhost:3000/emailConfirmed' :
        'https://www.togathr.app/emailConfirmed'

    const { user, error } = await supabase.auth.signUp( { email, password },
        { redirectTo: redirectTo } );

    if ( !error && user ) {
        const defaultAvatarUrl = import.meta.env.VITE_DEFAULT_AVATAR_URL as string;
        await createProfile( {
            userId: user!.id,
            avatarUrl: defaultAvatarUrl
        } );
    }

    return error;
}

export async function signInWithGoogle (): Promise<any> {
    const { user, session, error } = await supabase.auth.signIn( {
        provider: 'google'
    } );

    return {
        error,
        payload: user
    };
}

export async function loginWithEmailPassword ( email: string, password: string | undefined ): Promise<Error | null> {
    const { user, error } = await supabase.auth.signIn( { email, password } );

    return error;
}

export async function signOut (): Promise<Error | null> {
    try {
        let { error } = await supabase.auth.signOut();

        return error;
    } catch ( err ) {
        console.log( err );
        // TODO: show toaster with error message
        return err as Error;
    }
}