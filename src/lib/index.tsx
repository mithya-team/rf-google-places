import { attachField} from 'react-forms';
import React from 'react';
import {GoogleLocationSuggest} from './GoogleLocationSuggest'
export {GoogleLocationSuggest} from './GoogleLocationSuggest'
export {TGooglePlaceSuggestCategories,TPosition,GoogleUtils} from './google'

// @ts-ignore
attachField('GoogleLocationSuggest', <GoogleLocationSuggest />);

