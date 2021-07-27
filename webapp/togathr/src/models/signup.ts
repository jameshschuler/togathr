import { object, string } from 'yup';

export interface SignUp {
    email: string;
    password?: string;
}

export const signupFormValidator = object().shape( {
    email: string().email(),
    password: string(),
} );