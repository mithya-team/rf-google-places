import { TextFieldProps } from '@material-ui/core/TextField';
import { FC } from 'react';
import { TGooglePlaceSuggestCategories } from './google';
export declare type GoogleLocationSuggestProps = TextFieldProps & {
    onResultClick: (result: any) => void;
    suggestionsTypes: TGooglePlaceSuggestCategories[];
};
export declare const GoogleLocationSuggest: FC<GoogleLocationSuggestProps>;
