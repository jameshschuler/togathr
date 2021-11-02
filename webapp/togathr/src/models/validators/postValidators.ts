import { object, string } from 'yup';

export const newPostFormValidator = object().shape( {
    content: string().required().max( 2000 ).label( 'Post body' )
} );