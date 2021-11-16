import { object, string } from 'yup';

export interface SignUp {
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
}

export const signupFormValidator = object().shape( {
    email: string().email().required(),
    password: string().required(),
} );