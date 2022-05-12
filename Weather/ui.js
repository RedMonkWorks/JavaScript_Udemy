class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.feelsLike = document.getElementById("w-feels-like");
    this.dewpoint = document.getElementById("w-dewpoint");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {
    console.log(weather);
    console.log(weather.list[0].main.feels_like);
    const weatherIcon = weather.list[0].weather[0].icon;
    this.location.textContent = weather.city.name;
    this.desc.textContent = weather.list[0].weather[0].main;
    this.string.textContent = `${weather.list[0].main.temp} F`;
    this.icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${weatherIcon}.png`
    );
    this.humidity.textContent = `Temprature Max: ${weather.list[0].main.temp_max} F`;
    this.dewpoint.textContent = `Temprature Min: ${weather.list[0].main.temp_min} F`;
    this.feelsLike.textContent = `Feels Like: ${weather.list[0].main.feels_like} F`;
    this.details.textContent = `Pressure: ${weather.list[0].main.pressure}`;
    this.wind.textContent = `Wind Speed: ${weather.list[0].wind.speed}`;
  }
}
