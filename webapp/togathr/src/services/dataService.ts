export function getSelectTimeOptions () {
    let options = [
        '12:00 AM',
        '12:30 AM'
    ];

    for ( let i = 1; i < 12; i++ ) {
        options.push( `${i}:00 AM` );
        options.push( `${i}:30 AM` );
    }

    options.push( '12:00 PM' );
    options.push( '12:30 PM' );
    for ( let i = 1; i < 12; i++ ) {
        options.push( `${i}:00 PM` );
        options.push( `${i}:30 PM` );
    }

    return options;
}