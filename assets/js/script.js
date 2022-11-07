// Global Variables ----------
var dayNow = moment().format('dddd')
var dateNow = moment().format('L')

// Render Data and Time to Weather Card.
$("#dateWeather").html(dateNow)
$("#WeatherTitleEl").html(dayNow)


// //function to render html elements to the page. 
// function renderFlightInfo() {
//     var numberOfFlights = 50

//     for (i = 0; i <= numberOfFlights; i++) {

//         //Render Departure Flights.
//         $('#departureContainer').append(`<div class="card flightCardCustom" style="width: 100%;">
//             <div class="row g-0">
//             <div class="col-md-9 flightInfoCustom ">
//                 <div class="card-body">
//                     <h6 class="card-title flightText">Destination: <span id="departureTitle${i}">[Destination Airport Name]</span></h6>
//                     <h6 class="card-title flightText">Flight: <span id="departureFlightName${i}">[Airline - Flight No]</span></h6>
//                     <h6 class="card-title flightText">Sch Time/Date: <span id="departureSchTime${i}">[time/date]</span></h6>
//                     <h6 class="card-title flightText">Est Time: <span id="departureEstTime${i}">[estTime]</span></h6>
//                     <h6 class="card-title flightText">Terminal: <span id="departureTerminal${i}">[Terminal]</span></h6>
//                     <h6 class="card-title flightText">Gate: <span id="departureGate${i}">[Gate #]</span></h6>
//                 </div>
//             </div>
//             <div class="col-md-3 d-flex align-items-center justify-content-center ontime">
//                 <h6 id = "departureStatus${i}" >[On Time]</h6>
//             </div>
//             </div>
//             </div>`)  
//         //Render Arriving Flights.
//         $('#arrivalContainer').append(`<div class="card flightCardCustom" style="width: 100%;">
//             <div class="row g-0 flightCard">
//             <div class="col-md-9 flightInfoCustom">
//                 <div class="card-body">
//                     <h6 class="card-title flightText">Departed: <span id="arrivalTitle${i}">[Departed From Airport Name]</span></h6>
//                     <h6 class="card-title flightText">Flight: <span id="arrivalFlightName${i}">[Airline - Flight No]</span></h6>
//                     <h6 class="card-title flightText">Departed Time: <span id="arrivalSchTime${i}">[time/date]</span></h6>
//                     <h6 class="card-title flightText">Sch.Arrival Time: <span id="arrivalEstTime${i}">[estTime]</span></h6>
//                     <h6 class="card-title flightText">Terminal: <span id="arrivalTerminal${i}">[Terminal]</span></h6>
//                     <h6 class="card-title flightText">Gate: <span id="arrivalGate${i}">[Gate #]</span></h6>
//                 </div>
//             </div>
//             <div class="col-md-3 d-flex align-items-center justify-content-center ontime">
//                 <h6 id ="arrivalStatus${i}">[On Time]</h6>
//             </div>
//             </div>
//         </div>`)
//     }
// }
