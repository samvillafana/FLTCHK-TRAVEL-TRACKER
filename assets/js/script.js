// Global Variables ----------
var dayNow = moment().format('dddd')
var dateNow = moment().format('L')
var numberOfFlights = 20
var selectedAirport = $(".form-select").val()
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
let icao_code = selectedAirport;
let dep_icao = selectedAirport;
let arr_icao = selectedAirport;
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

// function to render flight cards
function renderFlightInfo() {
  $('#departureContainer').append(`<h6 class="flightsHeader">Departures</h6>`)
  $('#arrivalContainer').append(`<h6 class="flightsHeader">Arrivals</h6>`)
  for (i = 0; i <= numberOfFlights; i++) {
      //Render Departure Flights.
    $('#departureContainer').append(`
      <div class="card flightCardCustom" style="width: 100%;">
          <div class="row g-0">
            <div class="col-md-9 flightInfoCustom ">
              <div class="card-body">
                    <h6 class="card-title flightText">Departure: <span id="departureFrom${i}"></span></h6>
                    <h6 class="card-title flightText">Arrival: <span id="departureTitle${i}">[Destination Airport Name]</span></h6>
                    <h6 class="card-title flightText">Flight: <span id="departureFlightName${i}">[Airline - Flight No]</span></h6>
                    <h6 class="card-title flightText">Sch Time/Date: <span id="departureSchTime${i}">[time/date]</span></h6>
                    <h6 class="card-title flightText">Destination Arrival: <span id="departureArrTime${i}">[Time]</span></h6>
                    <h6 class="card-title flightText">Terminal: <span id="departureTerminal${i}">[Terminal]</span></h6>
                    <h6 class="card-title flightText">Gate: <span id="departureGate${i}">[Gate #]</span></h6>
                    <h6 class="card-title flightText">Flight Duration: <span id="departureDuration${i}"></span></h6>
              </div>
            </div>
            <div id = "departureDelayStatusCont${i}" class="col-md-3 d-flex align-items-center justify-content-center">
                    <h6 id="departureStatus${i}">[On Time]</h6>
            </div>
          </div>
      </div>`)  
      //Render Arriving Flights.
    $('#arrivalContainer').append(`
      <div class="card flightCardCustom" style="width: 100%;">
          <div class="row g-0 flightCard">
            <div class="col-md-9 flightInfoCustom">
                <div class="card-body">
                    <h6 class="card-title flightText">Arrival: <span id="arrivalTo${i}"></span></h6>
                    <h6 class="card-title flightText">Departure: <span id="arrivalTitle${i}">[Departed From Airport Name]</span></h6>
                    <h6 class="card-title flightText">Flight: <span id="arrivalFlightName${i}">[Airline - Flight No]</span></h6>
                    <h6 class="card-title flightText">Departed Time: <span id="arrivalDepartedTime${i}">[time/date]</span></h6>
                    <h6 class="card-title flightText">Sch.Arrival Time: <span id="arrivalSchTime${i}">[estTime]</span></h6>
                    <h6 class="card-title flightText">Terminal: <span id="arrivalTerminal${i}">[Terminal]</span></h6>
                    <h6 class="card-title flightText">Gate: <span id="arrivalGate${i}">[Gate #]</span></h6>
                    <h6 class="card-title flightText">Flight Status: <span id="arrivalFlightStatus${i}">[Flight Status]</span></h6>
                </div>
            </div>
            <div id = "arrivalDelayStatusCont${i}" class="col-md-3 d-flex align-items-center justify-content-center">
                <h6 id ="arrivalDelayStatus${i}">[On-Time]</h6>
            </div>
          </div>
      </div>`)
  }
}

// function to render departures
function getDepartures() {
  fetch(AIRLABS_SCHEDULES_DEP_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("")
        throw response.json();
      }
      return response.json();
    })
    
    .then(function (returnResults) {
      console.log(returnResults)

      for (var i = 0; i <= numberOfFlights; i++) {
          $("#departureFrom" + (i)).html(selectedAirport.slice(1))
          $("#departureTitle" + (i)).html(returnResults.response[i].arr_iata)
          $("#departureFlightName" + (i)).html(returnResults.response[i].flight_iata)
          $("#departureSchTime" + (i)).html(returnResults.response[i].dep_time)
          $("#departureArrTime" + (i)).html(returnResults.response[i].arr_time)
          $("#departureTerminal" + (i)).html(returnResults.response[i].dep_terminal)
          $("#departureGate" + (i)).html(returnResults.response[i].dep_gate)
          $("#departureDuration" + (i)).html(returnResults.response[i].duration + " Minutes")
        //this logic is not working
          if (returnResults.response[i].delayed === null) {
            $("#departureStatus" + (i)).html("On Time").attr("class", "ontimeText")
            $("#departureDelayStatusCont"+(i)).attr("class", "col-md-3 d-flex align-items-center justify-content-center ontimeCont")
          } else {
            $("#departureStatus" + (i)).html("Delayed by: " + returnResults.response[i].delayed + " Mins").attr("class", "delayedText")
            $("#departureDelayStatusCont"+(i)).attr("class", "col-md-3 d-flex align-items-center justify-content-center delayedCont")
          }
        } 
    })
}
// function to render arrivals
function getArrivals() {
  fetch(AIRLABS_SCHEDULES_ARR_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("")
        throw response.json();
      }
      return response.json();
    })
  
    .then(function (returnResults) {
      console.log(returnResults)
      for (var i = 0; i <= numberOfFlights; i++) {
        $("#arrivalTo" + (i)).html(selectedAirport.slice(1))
        $("#arrivalTitle" + (i)).html(returnResults.response[i].dep_iata)
        $("#arrivalFlightName" + (i)).html(returnResults.response[i].flight_iata)
        $("#arrivalDepartedTime" + (i)).html(returnResults.response[i].dep_time)
        $("#arrivalSchTime" + (i)).html(returnResults.response[i].arr_time)
        $("#arrivalTerminal" + (i)).html(returnResults.response[i].arr_terminal)
        $("#arrivalGate" + (i)).html(returnResults.response[i].arr_gate)
        $("#arrivalFlightStatus" + (i)).html(returnResults.response[i].status)
        if (returnResults.response[i].arr_delayed === null) {
          $("#arrivalDelayStatus" + (i)).html("On Time").attr("class", "ontimeText")
          $("#arrivalDelayStatusCont"+(i)).attr("class", "col-md-3 d-flex align-items-center justify-content-center ontimeCont")

        } else {
          $("#arrivalDelayStatus" + (i)).html("Delayed by: " + returnResults.response[i].dep_delayed + " Mins").attr("class", "delayedText")
          $("#arrivalDelayStatusCont"+(i)).attr("class", "col-md-3 d-flex align-items-center justify-content-center delayedCont")
        }
      }
    })
}
//Function to render the weather data to the page. 
function getWeather() {
  fetch(WEATHER_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("")
        throw response.json();
      }
      return response.json();
      
    })
    .then(function (returnResults) {
      $("#imgWeather").attr("src", "https:" + returnResults.current.condition.icon)
      $("#dateWeather").html(returnResults.location.localtime)
      $("#tempWeather").html(returnResults.current.temp_f.toFixed() + "°F")
      $("#humidityWeather").html(returnResults.current.humidity.toFixed() + "%")
      $("#windWeather").html(returnResults.current.wind_mph.toFixed() + "mph")
      $("#conditionsWeather").html(returnResults.current.condition.text)
    })
}

function init() {
  $('#arrivalContainer').html("")
  $('#departureContainer').html("")
  renderFlightInfo()
  getDepartures()
  getArrivals()
  getWeather()
}
$("#btnInit").click(function () {
init()
});

