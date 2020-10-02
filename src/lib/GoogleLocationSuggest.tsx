// import { createStyles, ListItemText, TextField, Theme, InputAdornment, IconButton } from '@material-ui/core';
// import { TextFieldProps } from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/styles';
// import React, { FC, useEffect, useState } from 'react';
// import GoogleUtils, { TGooglePlaceSuggestCategories } from './google';
// import Clear from '@material-ui/icons/Clear';
// import SearchIcon from '@material-ui/icons/Search';
// import { FormikValues } from 'formik';

// export type GoogleLocationSuggestProps = TextFieldProps & {
//     // onResultClick?: (result: any) => void
//     suggestionsTypes?: TGooglePlaceSuggestCategories[],
//     formikProps?: FormikValues;
// }

//export const GoogleLocationSuggest: FC<GoogleLocationSuggestProps> = (props) => {
//     const { formikProps = {} as FormikValues } = props;
//     const classes = useStyles();
//     const [input, setInput] = useState('');
//     const [result, setResult] = useState<any[]>([]);
//     const [open, setOpen] = useState<boolean>(false);
//     const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
//         if (!open)
//             setOpen(true);
//         setInput(e.target.value);
//         // anchorEl || setAnchorEl(e.currentTarget);
//     };
//     const handleSearchResultClick = async (item: any) => {
//         const res = await GoogleUtils.placeDetails(item.place_id).catch(err => { throw err });
//         formikProps.setValues({ name: res.name, address: GoogleUtils.transformAddress(res)?.full_address, place_id: item.place_id });
//     }

//     const clearInput = () => {
//         if (open)
//             setOpen(false);
//         setInput('');
//         setResult([]);
//     }
//     const getSuggestions = async () => {
//         const res = await GoogleUtils.placeSuggest(input, props.suggestionsTypes? props.suggestionsTypes : "" as unknown as TGooglePlaceSuggestCategories[]) as any[];
//         if (res) setResult(res);
//     }

//     useEffect(() => {
//         if (input) {
//             getSuggestions();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [input]);

//     const {suggestionsTypes, ...textFieldProps } = props;

//     const handleResultClick = (item: any) => {
//         setInput(item.description)
//         handleSearchResultClick(item);
//         setOpen(false);
//     }
//     return (
//         <>
//             <Autocomplete
//                 getOptionLabel={option => option.description}
//                 classes={{ popper: classes.popper }}
//                 filterOptions={x => x}
//                 options={result}
//                 includeInputInList
//                 fullWidth={textFieldProps.fullWidth}
//                 autoComplete
//                 open={open && (input.length > 0)}
//                 forcePopupIcon={false}
//                 disableClearable
//                 getOptionSelected={(option) => option.description}
//                 renderInput={(params) =>
//                     <TextField
//                         {...params}
//                         inputProps={{
//                             ...params.inputProps,
//                             onChange: handleInputChange, value: input || '',
//                         }}
//                         InputProps={{
//                             ...params.InputProps,
//                             endAdornment: (
//                                 <InputAdornment position={'end'} >
//                                     <IconButton onClick={clearInput} >
//                                         <Clear fontSize='small' className={classes.endIcon} />
//                                     </IconButton>
//                                 </InputAdornment>
//                             ),
//                             startAdornment: (
//                                 <InputAdornment position={'start'} >
//                                     <IconButton disableRipple disableFocusRipple disableTouchRipple >
//                                         <SearchIcon fontSize='small' />
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         }}
//                         placeholder='Search on google'
//                         variant='standard'
//                         {...textFieldProps}
//                     />
//                 }
//                 renderOption={(item) => (<ListItemText onClick={() => handleResultClick(item)}>{item.description}</ListItemText>)}
//             />
//         </>
//     )
// }

// const useStyles = makeStyles<Theme>((theme) => {
//     return (createStyles({
//         popper: {
//             zIndex: theme.zIndex.modal + 1
//         },
//         endIcon: {
//             cursor: 'pointer'
//         }
//     }))
// })




import { createStyles, ListItemText, TextField, Theme, InputAdornment, IconButton } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import GoogleUtils, { TGooglePlaceSuggestCategories } from './google';
import Clear from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

export type GoogleLocationSuggestProps = TextFieldProps & {
    onResultClick: (result: any) => void
    suggestionsTypes: TGooglePlaceSuggestCategories[]
}

export const GoogleLocationSuggest: FC<GoogleLocationSuggestProps> = (props) => {
    const classes = useStyles();
    const [input, setInput] = useState('');
    const [result, setResult] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!open)
            setOpen(true);
        setInput(e.target.value);
        // anchorEl || setAnchorEl(e.currentTarget);
    };

    const clearInput = () => {
        if (open)
            setOpen(false);
        setInput('');
        setResult([]);
    }
    const getSuggestions = async () => {
        const res = await GoogleUtils.placeSuggest(input, props.suggestionsTypes) as any[];
        if (res) setResult(res);
    }

    useEffect(() => {
        if (input) {
            getSuggestions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    const { onResultClick, suggestionsTypes, ...textFieldProps } = props;

    const handleResultClick = (item: any) => {
        setInput(item.description)
        typeof props.onResultClick === 'function' && props.onResultClick(item);
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
                renderInput={(params) =>
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            onChange: handleInputChange, value: input || '',
                        }}
                        InputProps={{
                            ...params.InputProps,
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
                            )
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

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        popper: {
            zIndex: theme.zIndex.modal + 1
        },
        endIcon: {
            cursor: 'pointer'
        }
    }))
})

