import { supabase } from '../supabase';

export async function signUpWithEmailPassword ( email: string, password: string ): Promise<Error | null> {
    // TODO: change url based on env
    const { user, error } = await supabase.auth.signUp( { email, password }, { redirectTo: 'http://localhost:3000/emailConfirmed' } );

    console.log( 'user', user );
    console.log( 'error', error );

    return error;
}

export async function signUpWithEmail ( email: string ) {
    const { user, error } = await supabase.auth.signUp( { email } );

    console.log( 'user', user );
    console.log( 'error', error );
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
    } catch ( error ) {
        console.log( error );
        // TODO: show toaster with error message
        return error;
    }
}