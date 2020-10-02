import { attachField} from 'react-forms';
import React from 'react';
import {GoogleLocationSuggest} from './GoogleLocationSuggest'
export * from './GoogleLocationSuggest'
export * from './google'

// @ts-ignore
attachField('google-location-suggest', <GoogleLocationSuggest />);

