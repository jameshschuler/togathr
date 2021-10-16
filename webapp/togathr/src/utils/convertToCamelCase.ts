import { camelCase } from 'change-case';

export function convertToCamelCase ( object: any ): any {
    const convertedObject = Object.keys( object ).reduce( ( c: { [ k: string ]: any }, key ) => {
        return ( c[ camelCase( key ) ] = object[ key ], c );
    }, {} );

    return convertedObject;
}