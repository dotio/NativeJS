class UI {
	constructor() {
		this.location = document.querySelector('#w-location');
		this.desc = document.querySelector('#w-descr');
		this.tempString = document.querySelector('#w-tempString');
		this.icon = document.querySelector('#w-icon');
		this.pressure = document.querySelector('#w-pressure');
		this.tempMax = document.querySelector('#w-temp-max');
		this.wind = document.querySelector('#w-wind');
		this.tempMin = document.querySelector('#w-temp-min');
		this.cloudiness = document.querySelector('#w-cloudiness');
		this.humidity = document.querySelector('#w-humidity');
	}
	paint(weather) {
		this.location.textContent = weather.name;
		this.desc.textContent = weather.weather[0].description;
		this.tempString.textContent = `${weather.main.temp.toFixed(0)} C`;
		this.icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
		this.cloudiness.textContent = `Cloudiness: ${weather.clouds.all} %`;
		this.humidity.textContent = `Humidity: ${weather.main.humidity} %`;
		this.pressure.textContent = `Pressure: ${weather.main.pressure} gpa`;
		this.tempMax.textContent = `Temp Max: ${weather.main.temp_max} C`;
		this.tempMin.textContent = `Temp Min: ${weather.main.temp_min} C`;
		this.wind.textContent = `Wind: ${weather.wind.speed} m/s ${weather.wind.deg} deg`;

	}
}

export {
	UI
}