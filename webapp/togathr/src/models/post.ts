import { object, string } from 'yup';

export interface NewPost {
    content: string;
}

export interface NewPostErrors {
    content?: string;
}

export const newPostFormValidator = object().shape( {
    content: string().max( 2000 ).label( 'Description' )
} );