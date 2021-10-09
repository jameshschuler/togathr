export function getCountryOptions () {
    return [ {
        text: 'United States',
        value: 'US'
    } ];
}

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

export function getStateOptions () {
    return [
        { text: 'Alabama', value: 'AL' },
        { text: 'Alaska', value: 'AK' },
        { text: 'American Samoa', value: 'AS' },
        { text: 'Arizona', value: 'AZ' },
        { text: 'Arkansas', value: 'AR' },
        { text: 'California', value: 'CA' },
        { text: 'Colorado', value: 'CO' },
        { text: 'Connecticut', value: 'CT' },
        { text: 'Delaware', value: 'DE' },
        { text: 'District of Columbia', value: 'DC' },
        { text: 'States of Micronesia', value: 'FM' },
        { text: 'Florida', value: 'FL' },
        { text: 'Georgia', value: 'GA}' },
        { text: 'Guam', value: 'GU}' },
        { text: 'Hawaii', value: 'HI' },
        { text: 'Idaho', value: 'ID' },
        { text: 'Illinois', value: 'IL' },
        { text: 'Indiana', value: 'IN' },
        { text: 'Iowa', value: 'IA' },
        { text: 'Kansas', value: 'KS' },
        { text: 'Kentucky', value: 'KY' },
        { text: 'Louisiana', value: 'LA' },
        { text: 'Maine', value: 'ME' },
        { text: 'Marshall Islands', value: 'MH' },
        { text: 'Maryland', value: 'MD' },
        { text: 'Massachusetts', value: 'MA' },
        { text: 'Michigan', value: 'MI' },
        { text: 'Minnesota', value: 'MN' },
        { text: 'Mississippi', value: 'MS' },
        { text: 'Missouri', value: 'MO' },
        { text: 'Montana', value: 'MT' },
        { text: 'Nebraska', value: 'NE' },
        { text: 'Nevada', value: 'NV' },
        { text: 'New Hampshire', value: 'NH' },
        { text: 'New Jersey', value: 'NJ' },
        { text: 'New Mexico', value: 'NM' },
        { text: 'New York', value: 'NY' },
        { text: 'North Carolina', value: 'NC' },
        { text: 'North Dakota', value: 'ND' },
        { text: 'Northern Mariana Islands', value: 'MP' },
        { text: 'Ohio', value: 'OH' },
        { text: 'Oklahoma', value: 'OK' },
        { text: 'Oregan', value: 'OR' },
        { text: 'Palau', value: 'PW' },
        { text: 'Pennsilvania', value: 'PA' },
        { text: 'Puerto Rico', value: 'PR' },
        { text: 'Rhode Island', value: 'RI' },
        { text: 'South Carolina', value: 'SC' },
        { text: 'South Dakota', value: 'SD' },
        { text: 'Tennessee', value: 'TN' },
        { text: 'Texas', value: 'TX' },
        { text: 'Utah', value: 'UT' },
        { text: 'Vermont', value: 'VT' },
        { text: 'Virgin Islands', value: 'VI' },
        { text: 'Virginia', value: 'VA' },
        { text: 'Washington', value: 'WA' },
        { text: 'West Virginia', value: 'WV' },
        { text: 'Wisconsin', value: 'WI' },
        { text: 'Wyoming', value: 'WY' }
    ];
}