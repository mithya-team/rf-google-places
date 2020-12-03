
        DOCS: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query

        'google' namespace is came from script added to index.html
        1. <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<YOUR_GOOGLE_API_KEY>&libraries=places"></script>
        2. Installing @types/googlemaps
        3. adding "types": ["googlemaps"] in compilerOptions in tsconfig.json

        fieldProps = {
                onResultClick -> function trigger on clicking result //mandatory field
                suggestionsTypes -> array of suggestion types //mandatory field
        }


# Google Places

React forms plugin for Google places

---
## Installation

DOCS: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query

'google' namespace is came from script added to index.html

1. <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?kxey=<YOUR_GOOGLE_API_KEY>&libraries=places"></script>

2. Installing @types/googlemaps
    yarn add @types/googlemaps
or 
    npm i @types/googlemaps

3. adding "types": ["googlemaps"] in compilerOptions in tsconfig.json

4. fieldProps = {
        onResultClick: function trigger on clicking result //mandatory field
        suggestionsTypes: array of suggestion types //mandatory field
        detailedResponse: boolean. If true, then place details will be fetched and set to the valueKey 
        responseParser: (res) => res. This is response parser to parse and set to the valueKey
}




## Usage
    
1. Import 'rf-google-places'
    
        import 'rf-google-places';

2. Use type name as 'google-location-suggest' in the react form config.
        
        { "type": "google-location-suggest", valueKey: "details" }

## Example

```
<MLFormContent
    formId={'form'}
    schema={{
                type: "google-location-suggest", 
                valueKey: "description",
                fieldProps: {
                    detailedResponse: true,
                    responseParser: (res: any) => {
                        return ({ name: res.name, address: res.address1 })
					}
				}
        }}
    actionConfig={{ displayActions: false }}
    formikProps={formikProps}
    settings={{
        verticalSpacing: 20,
        horizontalSpacing: 24
    }}
/>
```
