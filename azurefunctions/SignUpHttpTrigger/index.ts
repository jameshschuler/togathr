import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface SignUp {
    email: string;
    password: string;
}

function createSupabaseClient (): SupabaseClient {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_KEY!;
    return createClient( supabaseUrl, supabaseKey );
}

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {
    console.log( 'request', req );

    const supabase = createSupabaseClient();

    const { email, password } = req.body as SignUp;

    let { user, error, session, url } = await supabase.auth.signIn( {
        email,
        password
    } );

    console.log( session );
    console.log( url );

    let response;

    if ( error ) {
        response = {
            errors: [ {
                ...error
            } ]
        };
    } else {
        response = {
            user: {
                email: user?.email,
                createdAt: user?.created_at,
                updatedAt: user?.updated_at
            }
        }
    }

    console.log( user );

    context.res = {
        status: error ? 400 : 200,
        body: response
    };

};

export default httpTrigger;