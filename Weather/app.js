const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city);
const ui = new UI();

// Get weather on DOM load
document.addEventListener("DOMContentLoaed", getWeather());

function getWeather() {
  weather
    .getWeather()
    .then((results) => {
      ui.paint(results);
      // console.log(results);
    })
    .catch((err) => console.log(err));
}

// Change Location Event
document.getElementById("w-change-btn").addEventListener("click", (e) => {
  const city = document.getElementById("city").value;

  storage.setLocationData(city);
  weather.changeLocation(city);
  getWeather();
});
