const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("#location");
const weatherMessage = document.querySelector("#weather");
const errorMessage = document.querySelector("#error");

weatherForm.addEventListener("submit", getWeather);

function getWeather(e) {
  e.preventDefault();
  const location = weatherInput.value;

  fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        weatherMessage.innerHTML = "";
        errorMessage.innerHTML = "loading...";
        displayError(data);
      } else {
        errorMessage.innerHTML = "";
        weatherMessage.innerHTML = "loading...";
        displayWeather(data);
      }
    });
}

function displayError(data) {
  setTimeout(() => {
    errorMessage.innerHTML = `Error: ${data.error}`;
  }, 3000);
}

function displayWeather(data) {
  setTimeout(() => {
    weatherMessage.innerHTML = `
        <ul>
            <li>Location: ${data.location}</li>
            <li>Summary: ${data.forecast.current}</li>
            <li>Precipitation: ${data.forecast.precipitation}</li>
            <li>Temperature: ${data.forecast.temperature}</li>
        </ul>
        `;
  }, 3000);
}
