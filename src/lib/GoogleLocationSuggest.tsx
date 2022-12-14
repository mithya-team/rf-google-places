import { IconButton, InputAdornment, ListItemText, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { TextFieldProps } from '@material-ui/core/TextField';
import Clear from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { IFieldProps, MUIReadOnly } from 'react-forms';
import { GoogleUtils, TGooglePlaceSuggestCategories } from './google';

export type GoogleLocationSuggestProps = TextFieldProps & {
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

export const GoogleLocationSuggest: FC<GoogleLocationProps> = (props) => {
    const classes = useStyles();
    const { fieldProps, formikProps, fieldConfig, isReadOnly } = props;
    const [input, setInput] = useState('');
    const [result, setResult] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!open) setOpen(true);
        setInput(e.target.value);
        // anchorEl || setAnchorEl(e.currentTarget);
    };
    const { onResultClick, suggestionsTypes, value, detailedResponse = false, responseParser = (res: any) => res, ...textFieldProps } = fieldProps;
    const clearInput = () => {
        if (open) setOpen(false);
        setInput('');
        setResult([]);
    };
    const getSuggestions = async () => {
        const res = (await GoogleUtils.placeSuggest(input, suggestionsTypes)) as any[];
        if (res) setResult(res);
    };

    useEffect(() => {
        if (input) {
            getSuggestions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    const handleResultClick = async (item: any) => {
        setInput(item.description);
        setOpen(false);
        const response = fieldProps.detailedResponse
            ? GoogleUtils.transformAddress(await GoogleUtils.placeDetails(item.place_id), item.description)
            : item;
        onResultClick?.(response);
        formikProps?.setFieldValue(fieldConfig?.valueKey!, responseParser(response));
    };
    const getValue = (value?: any) => {
        if (!value) return 'NA';
        if (typeof value === typeof '') return value;
        if (Object.keys(value).length) return value.description;
        return 'NA';
    };
    if (isReadOnly) {
        return <MUIReadOnly label={undefined} value={getValue(value)} />;
    }

    return (
        <>
            <Autocomplete
                getOptionLabel={(option) => option.description || ''}
                classes={{ popper: classes.popper }}
                filterOptions={(x) => x}
                options={result}
                includeInputInList
                fullWidth={textFieldProps.fullWidth}
                autoComplete
                open={open && input.length > 0}
                forcePopupIcon={false}
                disableClearable={!value}
                getOptionSelected={(option, value) => option.description === value.description}
                value={value || null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={handleInputChange}
                        value={input || ''}
                        // inputProps={{
                        //     ...params.inputProps,

                        //     // ...inputProps
                        // }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={'end'}>
                                    <IconButton onClick={clearInput}>
                                        <Clear fontSize="small" className={classes.endIcon} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position={'start'}>
                                    <IconButton disableRipple disableFocusRipple disableTouchRipple>
                                        <SearchIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            ...params.InputProps,
                            ...textFieldProps.InputProps,
                        }}
                        placeholder="Search on google"
                        variant="standard"
                        {...textFieldProps}
                    />
                )}
                renderOption={(item) => <ListItemText onClick={() => handleResultClick(item)}>{item.description}</ListItemText>}
            />
        </>
    );
};

const useStyles = makeStyles<Theme>(() => {
    return createStyles({
        popper: {
            // zIndex: theme.zIndex.modal + 1
        },
        endIcon: {
            cursor: 'pointer',
        },
    });
});
