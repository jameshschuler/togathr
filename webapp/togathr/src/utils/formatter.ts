import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend( relativeTime );

export function formatDate ( dateValue: string ): string {
    return new Date( dateValue ).toLocaleDateString( undefined, formatDateOptions );
}

export function formatTime ( timeValue: string ): string {
    const timeSubstring = timeValue.substring( 0, timeValue.length - 3 );
    const formattedTime = new Date( '1970-01-01T' + timeSubstring + 'Z' ).toLocaleTimeString(
        'en-US',
        formatTimeOptions
    );
    return formattedTime;
}

export function formatDateAndTime ( value: string ): string {
    return new Date( value ).toLocaleString();
}
declare module 'dayjs' {
    interface Dayjs {
        fromNow (): string;
    }
}
export function formatRelativeTime ( value: string ): string {
    return dayjs( value ).fromNow();
}

export const formatDateOptions: Intl.DateTimeFormatOptions = {
    //weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

export const formatTimeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
}
