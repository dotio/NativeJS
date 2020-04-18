// init weather constructor
class Weather {
	constructor(city) {
		this.api = '4d7cfa40c68b803c71c92611346c81d6';
		this.city = city;
	}
	// fetch weather
	async getWeather() {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.api}`)

		if (response.status < 404) {

			const responceData = await response.json();

			return responceData;

		}


	}
	// change location
	changeLocation(city) {
		this.city = city;
	}
}

export {
	Weather
}