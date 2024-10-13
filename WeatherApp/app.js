const form = document.querySelector("#form");
const textInput=document.querySelector("#loc");
const temperature = document.querySelector("#temp");
const loc = document.querySelector("#place");
const weather_display = document.querySelector("#image");
const description_display = document.querySelector("#description");
const humid_value=document.querySelector("#humidValue");
const speed_value=document.querySelector("#speedValue");
const humid_img=document.querySelector("#humidity");
const speed_img=document.querySelector("#speed");
const humidity_data=document.querySelector("#humidValue");
const speed_data=document.querySelector("#speedValue");
const notFound=document.querySelector("#notFound");
const notFoundImage=document.querySelector("#notFoundImage");
const cross=document.querySelector("#cross");
const apiKey = "YOUR-API-KEY"; //Replace with your api key

form.addEventListener("submit", function(event) {
    event.preventDefault();
    humid_img.style.opacity=0;
    speed_img.style.opacity=0;
    humidity_data.style.opacity=0;
    speed_data.style.opacity=0;
    weather_display.style.opacity=0;
    const city = document.querySelector("input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    getWeather(url, city);
});
cross.addEventListener("click", function () {
    textInput.value = "";
    resetUI(); 
})

function resetUI() {
    notFound.textContent = "";
    notFoundImage.style.opacity = 0;
    temperature.textContent = "";
    loc.textContent = "";
    description_display.textContent = "";
    humid_value.textContent = "";
    speed_value.textContent = "";
    weather_display.style.opacity = 0;
    humid_img.style.opacity = 0;
    speed_img.style.opacity = 0;
    humidity_data.style.opacity = 0;
    speed_data.style.opacity = 0;
}


async function getWeather(url, city) {
    try {
        const res = await axios.get(url, {
            headers: {
                "accept": "application/json",
            }
        });
        const tempK = res.data.main.temp;
        const tempC = (tempK - 273.15).toFixed(2);
        const weather_main = res.data.weather[0]["main"];
        const weather_description = res.data.weather[0]["description"];
        const humidity=res.data.main.humidity;
        const speed=res.data.wind.speed;
        notFound.textContent="";
        notFoundImage.style.opacity=0;

        displayTemperature(tempC, city);
        showWeather(weather_main);
        showDescription(weather_description);
        showData(humidity,speed)

    } catch (e) {
        console.log(e);
        notFound.textContent="";
        temperature.textContent ="";
        notFound.textContent="City Not Found "
        loc.innerHTML = ""; 
        notFoundImage.setAttribute("src", "./images/NotFound.jpg");
        notFoundImage.style.opacity=1;
        description_display.innerHTML = ""; 
    }
}

function displayTemperature(tempC, city) {
    const valueTemp = document.createElement("p");
    const locShow = document.createElement("p");
    locShow.textContent = city;
    valueTemp.textContent = `${tempC}°C`;
    temperature.innerHTML = "";
    loc.innerHTML = "";
    loc.appendChild(locShow);
    temperature.appendChild(valueTemp);
    humid_img.style.opacity=1;
    speed_img.style.opacity=1;
    humidity_data.style.opacity=1;
    speed_data.style.opacity=1;
    weather_display.style.opacity=1;
}

function showWeather(weather_main) {
    let imagePath;
    switch(weather_main) {
        case "Clear":
        case "Clear Sky":
        case "clear-sky":
        case "clear sky":
            imagePath = "./images/sun (1).png";
            break;
        case "Clouds":
            imagePath = "./images/cloudy1.png";
            break;
        case "Rain":
        case "Drizzle":
            imagePath = "./images/heavy-rain.png";
            break;
        case "Snow":
            imagePath = "./images/snow.png";
            break;
        case "Thunderstorm":
            imagePath = "./images/storm.png";
            break;
        case "Mist":
        case "Fog":
            imagePath = "./images/cloudy_3982183.png";
            break;
        case "Smoke":
            imagePath = "./images/smoke.png";
            break;
        case "Haze":
            imagePath = "./images/haze.png";
            break;
        case "Dust":
        case "Sand":
            imagePath = "./images/dust.png"; 
            break;
        case "Tornado":
            imagePath = "./images/tornado.jpeg";
            break;
        default:
            imagePath = "./images/cloudy.png";
    }

    weather_display.setAttribute("src", imagePath);
}


function showDescription(descriptionText) {
    description_display.innerHTML = ""; 
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = descriptionText; 
    description_display.appendChild(descriptionElement);
}
function showData(humidity,speed)
{
    humid_value.innerHTML="";
    speed_value.innerHTML="";
    const humidElement=document.createElement("p");
    const speedElement=document.createElement("p");
    humid_value.textContent=`${humidity}% Humidity`;
    speed_value.textContent=`Wind Speed:${speed}m/s`;
    humid_value.appendChild(humidElement);
    speed_value.appendChild(speedElement);
}
