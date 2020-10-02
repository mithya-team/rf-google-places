/// <reference types="googlemaps" />
export declare type TGooglePlaceSuggestCategories = '(cities)' | 'establishment';
export interface TPosition {
    lat: number;
    lng: number;
}
export declare const GoogleUtils: {
    geoAddressFields: string[];
    placeSuggest: (input: string, types: TGooglePlaceSuggestCategories[]) => Promise<unknown>;
    placeDetails: (placeId: string) => Promise<google.maps.places.PlaceResult>;
    placeTypesParser: (types: string[] | undefined, typeMap: Record<string, string[]>) => string[];
    transformAddress: (place: google.maps.places.PlaceResult) => {
        placeid: string | undefined;
        full_address: string | undefined;
        address1: string;
        state: string;
        city: string;
        locality: string;
        zipcode: string;
        country: string;
    } | undefined;
    getDistance: (coord1: TPosition, coord2: TPosition) => number;
    formatOpeningHours: (openingHours: google.maps.places.OpeningHours | undefined) => {
        periods: any[];
    } | undefined;
};
