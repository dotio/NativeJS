const profile = document.querySelector('#profile');

class UI {
	constructor() {
		this.profile = profile
	}
	// show profile
	showProfile(user) {
		this.profile.innerHTML = `
		<div class='profile-info'>
			<div class='profile-img'>
				<div class='img-wrap'><img src='${user.avatar_url}'></div>
				<a href='${user.html_url}' class='btn' target='_blank'>View Profile</a>
			</div>
			<div class='profile-content'>
				<div class='profile-content__descr'>
					<span class='indicator blue'>Repos: ${user.public_repos}</span>
					<span class='indicator gray' >Gists: ${user.public_gists}</span>
					<span class='indicator green'>Followers ${user.followers}</span>
					<span class='indicator yellow'>Following ${user.following}</span>
				</div>
				<ul class='list-content'>
					<li class='list-content__item'>Company: ${user.company}</li>
					<li class='list-content__item'>Website: ${user.blog}</li>
					<li class='list-content__item'>Location: ${user.location}</li>
					<li class='list-content__item'>Member:${user.created_at}</li>
				</ul>
			</div>
		</div>
		<h2>Latest Repos</h2>
		<div class='profile-repos'></div>
		`;
	}
	// show profile repo
	showRepos(repos) {
		let output = '';
		repos.forEach((repo) => {
			output += `
			<ul class='list-profile'>
				<li class='list-profile__item'>
					<a href='${repo.html_url}' target='_blank' class='list-profile__link'>${repo.name}</a>
					<div class='profile-repos__content'>
						<span class='indicator blue'>Stars: ${repo.stargazers_count}</span>
						<span class='indicator green'>Watchers: ${repo.watchers_count}</span>
						<span class='indicator yellow'>Forks: ${repo.forks_count}</span>
					</div>
				</li>
			</ul>
			`
		});
		document.querySelector('.profile-repos').innerHTML = output;
	}
	// show alert
	showAlert(msg, className) {
		// clear repeates
		this.clearAlert();
		const div = document.createElement('div');
		div.className = className;
		div.appendChild(document.createTextNode(msg));
		const container = document.querySelector('.searchCard');
		const h1 = document.querySelector('h1');
		container.insertBefore(div, h1);
		// timiout alert
		setTimeout(() => {
			this.clearAlert();
		}, 2000);

	}
	// clear alert
	clearAlert() {
		const currentAlert = document.querySelector('.alert');
		if (currentAlert) {
			currentAlert.remove()
		}
	}

	// clear profile
	clearProfile() {
		this.profile.innerHTML = '';
	}


}
export {
	UI,
	profile
};