import { supabase } from '../supabase';

export async function signUpWithEmailPassword ( email: string, password: string ): Promise<Error | null> {
    // TODO: change url based on env
    const { user, error } = await supabase.auth.signUp( { email, password }, { redirectTo: 'http://localhost:3000/emailConfirmed' } );

    console.log( 'user', user );
    console.log( 'error', error );

    return error;
}

export async function loginWithEmailPassword ( email: string, password: string ): Promise<Error | null> {
    // TODO: change url based on env
    const { user, error } = await supabase.auth.signIn( { email, password } );

    console.log( 'user', user );
    console.log( 'error', error );

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