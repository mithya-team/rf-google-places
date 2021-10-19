import { TextFieldProps } from "@material-ui/core/TextField";
import { FC } from "react";
import { TGooglePlaceSuggestCategories } from "./google";
import { IFieldProps } from "react-forms";
export declare type GoogleLocationSuggestProps = TextFieldProps & {
    onResultClick: (result: any) => void;
    suggestionsTypes: TGooglePlaceSuggestCategories[];
    value?: any;
    responseParser?: (res: any) => any;
    /**
       * true if needed the complete place detail instead of autocomplete response object.
       * default is false
       *
          ```typescript
          interface FormattedAddress {
              placeId: string,
              fullAddress: string;
              address1: string;
              state: string;
              city: string;
              locality: string;
              zipCode: string;
              country: string;
          }
          ```
       */
    detailedResponse?: boolean;
};
export interface GoogleLocationProps extends IFieldProps {
    fieldProps: GoogleLocationSuggestProps;
}
export declare const GoogleLocationSuggest: FC<GoogleLocationProps>;
