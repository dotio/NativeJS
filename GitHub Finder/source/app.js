import './scss/style.scss';
import {
	GitHub
} from './github';
import {
	UI
} from './ui';

// init github
const github = new GitHub;
// init UI
const ui = new UI;

// search input
const searchUser = document.querySelector('#searchUser');

// Search input event
searchUser.addEventListener('keyup', (e) => {
	// get text
	const userText = e.target.value;

	if (userText !== '') {
		// GitHub get user
		github.getUser(userText)
			.then(data => {
				if (data.profile.message === 'Not Found') {
					//alert
					ui.showAlert('User not found', 'alert');
				} else {
					//show profile
					ui.showProfile(data.profile);
					ui.showRepos(data.repos);
				}

			})
	} else {
		// clear profile
		ui.clearProfile();
	}
});