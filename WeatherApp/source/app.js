import './scss/style.scss';
import {
	modal
} from './components/modal/modal';
import {
	Weather
} from './components/weather'

import {
	UI
} from './components/ui'

import {
	MyStorage
} from './components/storage'

// call modal
modal();

// init storage
const myStorage = new MyStorage();
// get storage loc data
const weatherLocation = myStorage.getLocationData();
// init weather const
const weather = new Weather(weatherLocation);
// init UI
const ui = new UI();


// get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
	weather.getWeather()
		.then(result => {
			ui.paint(result);
		})
		.catch(err => console.log(err))
}

// change location event
const saveLocBtn = document.querySelector('#saveLocation');

saveLocBtn.addEventListener('click', (e) => {
	const modal = document.querySelector('#modal');
	const overlay = document.querySelector('.overlay');
	const city = document.querySelector('#city').value;
	if (city !== '') {
		// weather change location
		weather.changeLocation(city)
		// get citis & paint
		getWeather();
		myStorage.setLocationData(city)
		// close modal
		modal.style.opacity = 0;
		overlay.style.display = 'none';


	}

	document.querySelector('#city').value = '';
	e.preventDefault();
});