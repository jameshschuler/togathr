import { bool, date, object, ref, string } from 'yup';

export interface NewEvent {
    description?: string;
    endDate: string;
    endTime: string;
    isPrivate: boolean;
    name: string;
    startDate: string;
    startTime: string;
}

export const newEventFormValidator = object().shape( {
    description: string().max( 2000 ).label( 'Description' ),
    endDate: date().required()
        .min( ref( 'startDate' ), 'End Date must be later than Start Date' )
        .typeError( 'Please provide a valid date' )
        .label( 'End Date' ),
    endTime: string().required().label( 'End Time' ),
    isPrivate: bool().required(),
    name: string().required().max( 255 ).label( 'Name' ),
    startDate: date().required()
        .min( new Date().toISOString().slice( 0, 10 ), 'Start Date cannot be earlier than today' )
        .typeError( 'Please provide a valid date' )
        .label( 'Start Date' ),
    startTime: string().required().label( 'Start Time' ),
} );