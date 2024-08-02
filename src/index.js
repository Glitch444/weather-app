import "./style.css";

const search = document.getElementById("search");
const getWeatherBtn = document.getElementById("get-weather-btn");
const showWeatherContainer = document.getElementById("show-weather-container");

const apiKey = "2BE3U3PEW3NV9JG9Z5XQVWSNP";

let city;


getWeatherBtn.addEventListener("click", async () => {
    city = search.value;

    let weatherData = await getWeatherData(city);

    displayWeatherData(weatherData);

        
    console.log(weatherData);
});

search.addEventListener("keydown", async function (event) {
    if(event.key === "Enter") {

        city = search.value;

        let weatherData = await getWeatherData(city);

        displayWeatherData(weatherData);

        console.log(weatherData);
    }
})


function displayWeatherData(weatherData) {
    const {address: city, 
        currentConditions: { 
            datetime, 
            temp, 
            humidity, 
            conditions, 
            sunrise, 
            sunset 
        } 
    } = weatherData;

    showWeatherContainer.textContent = ""

    const cityNameDisplay = document.createElement("p");
    const tempDispaly = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const conditionsDisplay = document.createElement("p");
    const sunriseDisplay = document.createElement("p");
    const sunsetDisplay = document.createElement("p");

    cityNameDisplay.textContent = city.charAt(0).toUpperCase() + city.slice(1) + " " + `at time: ${datetime}`;
    tempDispaly.textContent = `Temperature: ${temp} °C`; 
    humidityDisplay.textContent = `Humidity: ${humidity} %`;
    conditionsDisplay.textContent = `Conditions: ${conditions}`;
    sunriseDisplay.textContent = `Sunrise is at: ${sunrise}`;
    sunsetDisplay.textContent = `Sunset is at: ${sunset}`;


    showWeatherContainer.appendChild(cityNameDisplay);
    showWeatherContainer.appendChild(tempDispaly);
    showWeatherContainer.appendChild(humidityDisplay);
    showWeatherContainer.appendChild(conditionsDisplay);
    showWeatherContainer.appendChild(sunriseDisplay);
    showWeatherContainer.appendChild(sunsetDisplay);
}



async function getWeatherData(city) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`
    
    try {
        
    const response = await fetch(apiUrl);
    
    if(!response.ok){

        throw new Error ("could not fetch weather data" + response.statusText);
    }

    const data = await response.json();
    return data 
      

    } catch(error) {

        console.error(error);
    } 

}