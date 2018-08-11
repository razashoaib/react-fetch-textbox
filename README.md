# Textbox with Lazy loading using Fetch API in React

This Component can be used in any [React](https://reactjs.com) app, consuming a Rest API which sends response in the JSON format. 

## Demo

![DemoGif](/examples/InAction.gif?raw=true "Gif")


## Installation and Usage Guide
### Installation
`npm i react-fetch-textbox`

### Usage Guide
This component is developed to work with [Bootstrap v4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) and can be used in the following way inside your application:

```js
<FetchTextBox url='https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=' method='GET' jsonArrayKey='player' fieldName="strPlayer" sendData={getData.bind(this)} />
```
  - In the above snippet, **`url`** is the URL of the Rest API which returns the data in the JSON format (must be a url that accepts querystrings as parameters as used in the example above, for instance, **p** in the above url). An example response can be similar  to the following:

      ```js
      {
        "player": [
          {
            "strNationality": "Denmark",
            "strPlayer": "Christian Rye",
            "strTeam": "AaB",
            "strSport": "Soccer"
          },
          {
            "strNationality": "Ghana",
            "strPlayer": "Christian Atsu",
            "strTeam": "Newcastle",
            "strSport": "Soccer"
          },
          {
            "strNationality": "Germany",
            "strPlayer": "Christian Lell",
            "strTeam": "_Retired Soccer",
            "strSport": "Soccer"
          }
        ]
      }
      ```
  - **`method`** is the method of the request,
  - **`jsonArrayKey`** is the key of the JSON response array which you want to map with the textbox suggestions. `player` in the above example's case,
  - **`fieldName`** is the key of JSON response's field you want to show as suggestions for the Textbox. `strPlayer` in the above example's case,
  - **`sendData`** is the name of the function where you want to get the data from the textbox. Example implementation can be found in `examples/src/index.js`.
  
### Example Usage
The complete implementation can be seen in `examples/src/index.js`.

## Contributing
This project welcomes contributions and suggestions.
