// Global Variables ----------
var dayNow = moment().format("dddd");
var dateNow = moment().format("L");
var numberOfFlights = 20;
var selectedAirportIcao = $("#airportSelectForm option:selected").val();
var selectedAirportIata = $("#airportSelectForm option:selected")
  .val()
  .slice(1);
var airportFullName = $("#airportSelectForm option:selected").text();

// Render day of the week to weather card
var dayNow = moment().format("dddd");
$("#WeatherTitleEl").html(dayNow);

// airlabs API variables
let icao_code = selectedAirportIcao;
let dep_icao = selectedAirportIcao;
let arr_icao = selectedAirportIcao;
let dep_iata = selectedAirportIata;
let AVIATION_API_KEY = "9f80e7-64a740";
let AIRLABS_API_KEY = "4126101b-5b8e-49b5-b65a-a7a54ac5914b";
let AIRLABS_AIRPORT_API_URL =
  "https://airlabs.co/api/v9/airports?icao_code=" +
  icao_code +
  "&api_key=" +
  AIRLABS_API_KEY;
let AVIATION_SCHEDULES_DEP_API_URL =
  "https://aviation-edge.com/v2/public/timetable?key=" +
  AVIATION_API_KEY +
  "&iataCode=" +
  selectedAirportIata +
  "&type=departure&status=scheduled";
let AIRLABS_SCHEDULES_ARR_API_URL =
  "https://airlabs.co/api/v9/schedules?arr_icao=" +
  arr_icao +
  "&api_key=" +
  AIRLABS_API_KEY;

// weather API Variables
var localWeatherJSON = localStorage.getItem("coordinates");
var localWeather = JSON.parse(localWeatherJSON);
let WEATHER_API_KEY = "1bc692c8904a4be88cf05232220411";
let WEATHER_API_URL_INIT =
  "https://api.weatherapi.com/v1/current.json?key=" +
  WEATHER_API_KEY +
  "&q=41.061,-73.5429&aqi=no";


// let AIRLABS_SCHEDULES_DEP_API_URL =
//   "https://airlabs.co/api/v9/schedules?dep_icao=" +
//   dep_icao +
//   "&api_key=" +
//   AIRLABS_API_KEY;

var airportData;

function pageLoad() {
  $("#arrivalContainer").html("");
  $("#departureContainer").html("");
  getAirportInfo();
  getWeatherInit();
  renderFlightInfo();
  getDepartures();
  getArrivals();
  var reloadUsingLocationHash = () => {
    window.location.hash = "reload";
  };
  window.onload = reloadUsingLocationHash();
}
function init() {
  $("#arrivalContainer").html("");
  $("#departureContainer").html("");
  getAirportInfo();
  getWeatherInit();
  renderFlightInfo();
  getDepartures();
  getArrivals();
}

function getAirportInfo() {
  fetch(AIRLABS_AIRPORT_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("");
        throw response.json();
      }
      return response.json();
    })

    .then(function (returnResults) {
      console.log(returnResults);
      var coordinates = JSON.stringify({
        lat: returnResults.response[0].lat,
        lng: returnResults.response[0].lng,
      });
      localStorage.setItem("coordinates", coordinates);
    });
}

// API call to pull back weather information; lat,long stored in local store.

// function to render flight cards
function renderFlightInfo() {
  $("#departureContainer").append(`<h6 class="flightsHeader">Departures</h6>`);
  $("#arrivalContainer").append(`<h6 class="flightsHeader">Arrivals</h6>`);

  for (var i = 0; i <= numberOfFlights; i++) {
    //Render Departure Flights.
    $("#departureContainer").append(`
      <div class="card flightCardCustom" style="width: 100%;">
          <div class="row g-0">
            <div class="col-md-9 flightInfoCustom ">
              <div class="card-body">
                    
              <h6 class="card-title flightText"><span id="departureAirlineName${i}"></span></h6>
                    <h6 class="card-title flightText"><img id ="departureAirlineIcon${i}"> <span id="departureFlightName${i}">[Airline - Flight No]</span></h6>
                    <h6 class="card-title flightText">Departure: <span id="departureFrom${i}"></span></h6>
                    <h6 class="card-title flightText">Arrival: <span id="departureTitle${i}">[Destination Airport Name]</span></h6>
                    <h6 class="card-title flightText">Sch Time/Date: <span id="departureSchTime${i}">[time/date]</span></h6>
                    <h6 class="card-title flightText">Dest Arrival: <span id="departureArrTime${i}">[Time]</span></h6>
                    <h6 class="card-title flightText">Terminal: <span id="departureTerminal${i}">[Terminal]</span></h6>
                    <h6 class="card-title flightText">Gate: <span id="departureGate${i}">[Gate #]</span></h6>
              </div>
            </div>
            <div id = "departureDelayStatusCont${i}" class="col-md-3 d-flex align-items-center justify-content-center">
                    <h6 id="departureStatus${i}">[On Time]</h6>
            </div>
          </div>
      </div>`);
    //Render Arriving Flights.
    $("#arrivalContainer").append(`
      <div class="card flightCardCustom" style="width: 100%;">
          <div class="row g-0 flightCard">
            <div class="col-md-9 flightInfoCustom">
                <div class="card-body">
                    <h6 class="card-title flightText"><img id ="arrivalAirlineIcon${i}"> <span id="arrivalFlightName${i}">[Airline - Flight No]</span></h6>
                    <h6 class="card-title flightText">Arrival: <span id="arrivalTo${i}"></span></h6>
                    <h6 class="card-title flightText">Departure: <span id="arrivalTitle${i}">[Departed From Airport Name]</span></h6>
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
      </div>`);
  }
}

// function to render departures
function getDepartures() {
  fetch(AVIATION_SCHEDULES_DEP_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("");
        throw response.json();
      }
      return response.json();
    })

    .then(function (returnResults) {
      console.log(returnResults);

      for (var i = 0; i <= numberOfFlights; i++) {
        $("#departureAirlineIcon" + i).attr(
          "src",
          "https://tracker.flightview.com/FVAccess3/res/img/FlightFinder/AirlineLogo/" +
            returnResults[i].airline.iataCode +
            ".gif"
        );
        $("#departureAirlineName" + i).html(returnResults[i].airline.name);
        $("#departureFrom" + i).html(selectedAirportIcao.slice(1));
        $("#departureTitle" + i).html(returnResults[i].arrival.iataCode);
        $("#departureFlightName" + i).html(returnResults[i].flight.iataNumber);
        $("#departureSchTime" + i).html(
          returnResults[i].departure.scheduledTime
        );
        $("#departureArrTime" + i).html(returnResults[i].arrival.scheduledTime);
        $("#departureTerminal" + i).html(returnResults[i].departure.terminal);
        $("#departureGate" + i).html(returnResults[i].departure.gate);
        if (returnResults[i].departure.delay === null) {
          $("#departureStatus" + i)
            .html("On Time")
            .attr("class", "ontimeText");
          $("#departureDelayStatusCont" + i).attr(
            "class",
            "col-md-3 d-flex align-items-center justify-content-center ontimeCont"
          );
        } else {
          $("#departureStatus" + i)
            .html("Delayed by: " + returnResults[i].departure.delay + " Mins")
            .attr("class", "delayedText");
          $("#departureDelayStatusCont" + i).attr(
            "class",
            "col-md-3 d-flex align-items-center justify-content-center delayedCont"
          );
        }
      }
    });
}
// function to render arrivals
function getArrivals() {
  fetch(AIRLABS_SCHEDULES_ARR_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("");
        throw response.json();
      }
      return response.json();
    })

    .then(function (returnResults) {
      console.log(returnResults);
      for (var i = 0; i <= numberOfFlights; i++) {
        $("#arrivalAirlineIcon" + i).attr(
          "src",
          "https://tracker.flightview.com/FVAccess3/res/img/FlightFinder/AirlineLogo/" +
            returnResults.response[i].airline_iata +
            ".gif"
        );
        $("#arrivalTo" + i).html(selectedAirportIcao.slice(1));
        $("#arrivalTitle" + i).html(returnResults.response[i].dep_iata);
        $("#arrivalFlightName" + i).html(returnResults.response[i].flight_iata);
        $("#arrivalDepartedTime" + i).html(returnResults.response[i].dep_time);
        $("#arrivalSchTime" + i).html(returnResults.response[i].arr_time);
        $("#arrivalTerminal" + i).html(returnResults.response[i].arr_terminal);
        $("#arrivalGate" + i).html(returnResults.response[i].arr_gate);
        $("#arrivalFlightStatus" + i).html(returnResults.response[i].status);
        if (returnResults.response[i].arr_delayed === null) {
          $("#arrivalDelayStatus" + i)
            .html("On Time")
            .attr("class", "ontimeText");
          $("#arrivalDelayStatusCont" + i).attr(
            "class",
            "col-md-3 d-flex align-items-center justify-content-center ontimeCont"
          );
        } else {
          $("#arrivalDelayStatus" + i)
            .html(
              "Delayed by: " + returnResults.response[i].arr_delayed + " Mins"
            )
            .attr("class", "delayedText");
          $("#arrivalDelayStatusCont" + i).attr(
            "class",
            "col-md-3 d-flex align-items-center justify-content-center delayedCont"
          );
        }
      }
    });
}
//Function to render the weather data to the page.
function getWeather() {
  let WEATHER_API_URL =
  "https://api.weatherapi.com/v1/current.json?key=" +
  WEATHER_API_KEY +
  "&q=" +
  localWeather.lat +
  "," +
  localWeather.lng +
  "&aqi=no";
  fetch(WEATHER_API_URL)
    .then(function (response) {
      if (!response.ok) {
        console.error("");
        throw response.json();
      }
      return response.json();
    })
    .then(function (returnResults) {
      $("#imgWeather").attr(
        "src",
        "https:" + returnResults.current.condition.icon
      );
      $("#dateWeather").html(returnResults.location.localtime);
      $("#tempWeather").html(returnResults.current.temp_f.toFixed() + "°F");
      $("#humidityWeather").html(
        returnResults.current.humidity.toFixed() + "%"
      );
      $("#windWeather").html(returnResults.current.wind_mph.toFixed() + "mph");
      $("#conditionsWeather").html(returnResults.current.condition.text);
    });
}
//Function to render the weather data to the page on init.
function getWeatherInit() {
  fetch(WEATHER_API_URL_INIT)
    .then(function (response) {
      if (!response.ok) {
        console.error("");
        throw response.json();
      }
      return response.json();
    })
    .then(function (returnResults) {
      $("#imgWeather").attr(
        "src",
        "https:" + returnResults.current.condition.icon
      );
      $("#dateWeather").html(returnResults.location.localtime);
      $("#tempWeather").html(returnResults.current.temp_f.toFixed() + "°F");
      $("#humidityWeather").html(
        returnResults.current.humidity.toFixed() + "%"
      );
      $("#windWeather").html(returnResults.current.wind_mph.toFixed() + "mph");
      $("#conditionsWeather").html(returnResults.current.condition.text);
    });
}

$("#btnInit").click(function () {
  selectedAirportIcao = $("#airportSelectForm option:selected").val();
  airportFullName = $("#airportSelectForm option:selected").text();
  icao_code = selectedAirportIcao;
  dep_icao = selectedAirportIcao;
  arr_icao = selectedAirportIcao;
  AVIATION_API_KEY = "9f80e7-64a740";
  AIRLABS_API_KEY = "4126101b-5b8e-49b5-b65a-a7a54ac5914b";
  AIRLABS_AIRPORT_API_URL =
    "https://airlabs.co/api/v9/airports?icao_code=" +
    icao_code +
    "&api_key=" +
    AIRLABS_API_KEY;
  AVIATION_SCHEDULES_DEP_API_URL =
    "https://aviation-edge.com/v2/public/timetable?key=" +
    AVIATION_API_KEY +
    "&iataCode=" +
    selectedAirportIata +
    "&type=departure&status=scheduled";
  AIRLABS_SCHEDULES_ARR_API_URL =
    "https://airlabs.co/api/v9/schedules?arr_icao=" +
    arr_icao +
    "&api_key=" +
    AIRLABS_API_KEY;
  localWeatherJSON = localStorage.getItem("coordinates");
  localWeather = JSON.parse(localWeatherJSON);
  WEATHER_API_KEY = "1bc692c8904a4be88cf05232220411";
  WEATHER_API_URL =
    "https://api.weatherapi.com/v1/current.json?key=" +
    WEATHER_API_KEY +
    "&q=" +
    localWeather.lat +
    "," +
    localWeather.lng +
    "&aqi=no";

  init();
});
