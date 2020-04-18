export function modal() {
	// init vars
	const btnOpen = document.querySelector('#changeLoc');
	const closeBtn = document.querySelector('#close');
	const modal = document.querySelector('#modal');
	const overlay = document.querySelector('.overlay');

	btnOpen.addEventListener('click', (e) => {
		modal.style.opacity = 1;
		overlay.style.display = 'block';
		e.preventDefault();
	});

	closeBtn.addEventListener('click', (e) => {
		modal.style.opacity = 0;
		overlay.style.display = 'none';
		e.preventDefault();
	});
}