import { supabase } from '../supabase';

export async function signUpWithEmailPassword ( email: string, password: string ): Promise<Error | null> {
    let redirectTo = import.meta.env.DEV ? 'http://localhost:3000/emailConfirmed' :
        'https://www.togathr.app/emailConfirmed'

    const { user, error } = await supabase.auth.signUp( { email, password },
        { redirectTo: redirectTo } );

    return error;
}

export async function signInWithGoogle (): Promise<Error | null> {
    const { user, session, error } = await supabase.auth.signIn( {
        provider: 'google'
    } );

    return error;
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