# Weather Dashboard
Written by Forrest Faulkner for Vanderbilt Full Stack Web Development course 2020

Uses Bootstrap CSS, MomentJS, jQuery, and the OpenWeatherMap API to display the current weather, UV Index, and next 5 day forecast for whatever city is searched. The last 10 searches will also be stored in localStorage to persist across browsing sessions. OpenWeatherMap is used to get the current weather, which fills out most of the upper display, before making another request to get the current UV Index, which finishes off the upper display. The lower 5 day forecast is acquired from the One Call API, once again from OpenWeatherMap, which returns the next 7 days in forecast. That's cut to 5 days, and then sorted into Bootstrap cards before being displayed.

A live version of the code for this project can be found [here](https://quaggwastaken.github.io/Weather-Dashboard/)