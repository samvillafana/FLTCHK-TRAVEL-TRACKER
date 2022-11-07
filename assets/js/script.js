// Global Variables ----------
var dayNow = moment().format('dddd')
var dateNow = moment().format('L')

// Render Data and Time to Weather Card.
$("#dateWeather").html(dateNow)
$("#WeatherTitleEl").html(dayNow)

// 

// Global Variables ----------
var dayNow = moment().format('dddd')
var dateNow = moment().format('L')

// Render Data and Time to Weather Card.
$("#dateWeather").html(dateNow)
$("#WeatherTitleEl").html(dayNow)

// start of api calls

// airlabs API variables
const icao_code = "KJFK";
const dep_icao = "KJFK";
const arr_icao = "KJFK";
const AIRLABS_API_KEY = "4126101b-5b8e-49b5-b65a-a7a54ac5914b";
const AIRLABS_AIRPORT_API_URL =
  "https://airlabs.co/api/v9/airports?icao_code=" +
  icao_code +
  "&api_key=" +
  AIRLABS_API_KEY;
const AIRLABS_SCHEDULES_DEP_API_URL =
  "https://airlabs.co/api/v9/schedules?dep_icao=" +
  dep_icao +
  "&api_key=" +
  AIRLABS_API_KEY;
const AIRLABS_SCHEDULES_ARR_API_URL =
  "https://airlabs.co/api/v9/schedules?arr_icao=" +
  arr_icao +
  "&api_key=" +
  AIRLABS_API_KEY;

// API call to pull back airpport information
var requestAirportInfo = {
  method: "GET",
  redirect: "follow",
};

var airportData;

fetch(AIRLABS_AIRPORT_API_URL, requestAirportInfo)
  .then((response) => response.json())
  .then((data) => {
    airportData = data;
  })
  .then(() => {
    console.log(airportData);
    var coordinates = JSON.stringify({
        lat: airportData.response[0].lat,
        lng: airportData.response[0].lng,
    })
    localStorage.setItem("coordinates",coordinates);
  })
  .catch((error) => console.log("error", error));


// API call to pull back all departures at JFK for current day +1
var requestDepartures = {
  method: "GET",
  redirect: "follow",
};

fetch(AIRLABS_SCHEDULES_DEP_API_URL, requestDepartures)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

//   API call to pull back all arrivals at JFK for current day +1
var requestArrivals = {
  method: "GET",
  redirect: "follow",
};

fetch(AIRLABS_SCHEDULES_ARR_API_URL, requestArrivals)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

// API call to pull back weather information; lat,long stored in local store.
var localWeatherJSON = localStorage.getItem("coordinates");
var localWeather = JSON.parse(localWeatherJSON);
const WEATHER_API_KEY = '1bc692c8904a4be88cf05232220411';
const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json?key=" + WEATHER_API_KEY + "&q=" + localWeather.lat + "," + localWeather.lng + "&aqi=no";

var requestWeather = {
  method: 'GET',
  redirect: 'follow',
};

fetch(WEATHER_API_URL, requestWeather)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
