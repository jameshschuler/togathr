import { Post } from './post';

export interface CurrentEvent {
    eventId: number;
    posts: Array<Post>;
}