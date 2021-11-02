import { ValidationError } from 'yup';

export function handleValidationErrors ( error: ValidationError ) {
    let errors: { [ key: string ]: any } = {};
    error.inner.forEach( ( e: ValidationError ) => {
        if ( e.path ) {
            errors[ e.path ] = e.message;
        }
    } );

    return errors;
}