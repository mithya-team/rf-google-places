import { createStyles, ListItemText, TextField, Theme, InputAdornment, IconButton } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete, { } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { GoogleUtils, TGooglePlaceSuggestCategories } from './google';
import Clear from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';


export type GoogleLocationSuggestProps = TextFieldProps & {
    onResultClick: (result: any) => void
    suggestionsTypes: TGooglePlaceSuggestCategories[]
    value?: any
}

export interface GoogleLocationProps {
    fieldProps: GoogleLocationSuggestProps
}

export const GoogleLocationSuggest: FC<GoogleLocationProps> = (props) => {
    const classes = useStyles();
    const { fieldProps, } = props
    const [input, setInput] = useState('');
    const [result, setResult] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!open)
            setOpen(true);
        setInput(e.target.value);
        // anchorEl || setAnchorEl(e.currentTarget);
    };
    const {
        onResultClick,
        suggestionsTypes,
        value,
        ...textFieldProps
    } = fieldProps

    const clearInput = () => {
        if (open)
            setOpen(false);
        setInput('');
        setResult([]);
    }
    const getSuggestions = async () => {
        const res = await GoogleUtils.placeSuggest(input, suggestionsTypes) as any[];
        if (res) setResult(res);
    }

    useEffect(() => {
        if (input) {
            getSuggestions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    const handleResultClick = (item: any) => {
        setInput(item.description)
        typeof onResultClick === 'function' && onResultClick(item);
        setOpen(false);
    }
    return (
        <>
            <Autocomplete
                getOptionLabel={option => option.description}
                classes={{ popper: classes.popper }}
                filterOptions={x => x}
                options={result}
                includeInputInList
                fullWidth={textFieldProps.fullWidth}
                autoComplete
                open={open && (input.length > 0)}
                forcePopupIcon={false}
                disableClearable
                getOptionSelected={(option) => option.description}
                value={value || null}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            onChange: handleInputChange, value: input || '',
                            // ...inputProps
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={'end'} >
                                    <IconButton onClick={clearInput} >
                                        <Clear fontSize='small' className={classes.endIcon} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position={'start'} >
                                    <IconButton disableRipple disableFocusRipple disableTouchRipple >
                                        <SearchIcon fontSize='small' />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            ...params.InputProps,
                            ...textFieldProps.InputProps
                        }}
                        placeholder='Search on google'
                        variant='standard'
                        {...textFieldProps}
                    />
                }
                renderOption={(item) => (<ListItemText onClick={() => handleResultClick(item)}>{item.description}</ListItemText>)}
            />
        </>
    )
}

const useStyles = makeStyles<Theme>(() => {
    return (createStyles({
        popper: {
            // zIndex: theme.zIndex.modal + 1
        },
        endIcon: {
            cursor: 'pointer'
        }
    }))
})

