const apiKey = "f88b248bdd6294af9e91335e2bbf74b0";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    // Fix the weather icon URL and conditions
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "./images/mist.png";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
var input = document.getElementById("myInput");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
    document.getElementById("myBtn").click();
  }
});
