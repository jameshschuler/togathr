import { object, string } from 'yup';

export interface Login {
    email: string;
    password?: string;
}

export const loginFormValidator = object().shape( {
    email: string().email().required(),
    password: string().required(),
} );