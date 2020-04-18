class MyStorage {
	constructor() {
		this.city;
		this.defaultCity = 'Miami';
	}
	// get loc data
	getLocationData() {
		if (localStorage.getItem('city') === null) {
			this.city = this.defaultCity;
		} else {
			this.city = localStorage.getItem('city');
		}
		return this.city;
	}
	// set location data
	setLocationData(city) {
		localStorage.setItem('city', city);
	}
}

export {
	MyStorage
}