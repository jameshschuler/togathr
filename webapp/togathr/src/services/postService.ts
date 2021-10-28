import { CreatePostRequest } from '../models/request/createPostRequest';

export async function createPost ( request: CreatePostRequest ) {
    console.log( request );
}