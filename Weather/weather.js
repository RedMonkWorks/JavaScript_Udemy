class Weather {
  constructor(city) {
    this.apiKey = "23f8a3d36d284f1e97276e574c3b20d7";
    this.city = city;
  }

  // Fetch weather from api
  async getWeather() {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}`
    );

    const responseData = await weatherResponse.json();

    return responseData;
  }

  changeLocation(city) {
    this.city = city;
  }
}
