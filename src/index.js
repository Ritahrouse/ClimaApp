function updateWeather(response){
   
let temperatureElement=document.querySelector("#temp");
let temperature=response.data.temperature.current;

temperatureElement.innerHTML=Math.round(temperature)
//console.log(response);
let cityElement=document.querySelector("#city_search");
    cityElement.innerHTML=response.data.city;
let conditionElement=document.querySelector("#condition");
conditionElement.innerHTML=response.data.condition.description;
let humidElement=document.querySelector("#humidity");
humidElement.innerHTML=`${response.data.temperature.humidity}%`;
let windElement=document.querySelector("#wind");
let speed=response.data.wind.speed;
windElement.innerHTML=`${speed}km/hr`;
let timeElement=document.querySelector("#time_day");
 let date = new Date(response.data.time * 1000);
 timeElement.innerHTML=formatDate(date);
 let iconElement=document.querySelector("#icon");
 iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;


    
}
function searchCity(city) {
  let apiKey="b579d6fac1o352ebdf78a025daetc942";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let date1=date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months=["Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let month=months[date.getMonth()];
  let day = days[date.getDay()];
  let year=date.getFullYear();
   year = year.toString().substr(2,2);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}-${day} ${date1} ${month} ${year}`;
}



function Search(event){
    event.preventDefault();
    let searchInput=document.querySelector("#input");
    
   searchCity(searchInput.value);
    
}


let formElement=document.querySelector("#search-form");
formElement.addEventListener("submit",Search);
searchCity("Lisbon");