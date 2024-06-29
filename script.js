function fetchData(pnrNumber) {
  const url = `https://real-time-pnr-status-api-for-indian-railways.p.rapidapi.com/name/${pnrNumber}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d07d2e8fccmshc4e2d39b6927c37p1b48b7jsn3f3676bd47c3",
      "X-RapidAPI-Host":
        "real-time-pnr-status-api-for-indian-railways.p.rapidapi.com",
    },
  };

  console.log("Url: ", url);

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Get the query string parameters from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const pnr_Number = urlParams.get("pnrNumber");

var mainContent = document.getElementById("main-content");
var errorContent = document.getElementById("error-content");
var loadDiv = document.getElementById("load-div");
var contentSection = document.getElementById("details-section");

var pnrNumber = document.getElementById("pnrNum");
var pnrNumber2 = document.getElementById("pnrNum2");
var chartStatusC = document.getElementById("chart-status");
var trainNo = document.getElementById("trainNo");
var trainName = document.getElementById("trainName");
var srcStation = document.getElementById("source-station");
var srcStationTime = document.getElementById("source-station-time");
var dstStation = document.getElementById("dest-station");
var dstStationTime = document.getElementById("dest-station-time");
var fullDate = document.getElementById("date");
var jclass = document.getElementById("class");
var quota = document.getElementById("quota");
var table_body = document.getElementById("table-body");
pnrNumber.innerHTML = pnr_Number;
pnrNumber2.innerHTML = pnr_Number;

errorContent.style.visibility = "hidden";

fetchData(pnr_Number).then((data) => {
  
  trainNo.innerHTML = data.trainNum;
  trainName.innerHTML = data.trainName;
  chartStatusC.innerHTML = data.chartStts;
  srcStation.innerHTML = data.boardingPoint;
  const srcTime = data.departureDate;
  const date = new Date(srcTime);
  let hour = date.getHours();
  const minute = date.getMinutes();
  // Add leading zero if hour or minute is a single digit
  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinute = minute.toString().padStart(2, "0");
  srcStationTime.innerHTML = `${formattedHour}:${formattedMinute}`;
  dstStation.innerHTML = data.reservationUpTo;
  const dstTime = data.arrivalDate;
  const date2 = new Date(dstTime);
  let hour2 = date2.getHours();
  const minute2 = date.getMinutes();
  // Add leading zero if hour or minute is a single digit
  const formattedHour2 = hour2.toString().padStart(2, "0");
  const formattedMinute2 = minute2.toString().padStart(2, "0");
  dstStationTime.innerHTML = `${formattedHour2}:${formattedMinute2}`;

  const dateString = data.dateOfJourney;
  const full_Date = new Date(dateString);

  // Define the weekdays and months arrays
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the day, date, and month from the date object
  const day3 = weekdays[full_Date.getDay()];
  const dateNumber3 = full_Date.getDate();
  const month3 = months[full_Date.getMonth()];

  // Format the result as "day, date month"
  const formattedDate3 = `${day3}, ${dateNumber3} ${month3}`;
  fullDate.innerHTML = formattedDate3;
  jclass.innerHTML = data.journeyClass;
  quota.innerHTML = data.passengerDetailsDTO[index].quotaCode;

  var no_passenger = data.noOfPassenger;

  for (let index = 0; index < no_passenger; index++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${data.passengerDetailsDTO[index].serialNo}</td>
    <td class="current">${data.passengerDetailsDTO[index].seatStts}</td>
    <td>${data.passengerDetailsDTO[index].displayName}</td>
    console.log(data.passengerDetailsDTO[index].displayName)
    <td>${data.passengerDetailsDTO[index].coachNo}</td>
  `;
  table_body.appendChild(tr);
  }

  loadDiv.style.visibility = "hidden";

}).catch((error) => {
  errorContent.style.visibility = "visible";
  mainContent.style.position = "absolute";
  mainContent.style.visibility = "hidden";

  loadDiv.style.visibility = "hidden";
  console.log(error)
});
