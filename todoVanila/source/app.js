import './scss/style.scss';

// Init vars
const submitBtn = document.querySelector('#submit');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const setAlert = document.querySelector('.addTaskAlert');


// load all events
loadEventsListeners();

function loadEventsListeners() {
	// show items in local storage
	document.addEventListener('DOMContentLoaded', showTasks);
	// add task event
	submitBtn.addEventListener('click', addTask);
	// delete task event
	taskList.addEventListener('click', deleteItem);
	// clear btn event
	clearBtn.addEventListener('click', clearAll);
	// filter event
	filterInput.addEventListener('keyup', filter);
}

// Show tasks from LS
function showTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach((task) => {
		// create li
		const li = document.createElement('li');
		// li add class
		li.className = 'collection-item';
		// text node & append
		li.appendChild(document.createTextNode(task));
		// create link
		const link = document.createElement('a');
		// add class a
		link.className = 'delete-item';
		// create icon
		link.innerHTML = '<i class="fas fa-times"></i>';
		// add link to li
		li.appendChild(link);
		// add li to ul
		if (task !== '') {
			taskList.appendChild(li);
		}
	});
}

// add task
function addTask(e) {
	const taskValue = taskInput.value;
	if (taskValue === '') {
		setAlert.style.visibility = 'visible';
		setInterval(() => {
			setAlert.style.visibility = 'hidden';
		}, 2000);
	}
	// create li
	const li = document.createElement('li');
	// li add class
	li.className = 'collection-item';
	// text node & append
	li.appendChild(document.createTextNode(taskValue));
	// create link
	const link = document.createElement('a');
	// add class a
	link.className = 'delete-item';
	// create icon
	link.innerHTML = '<i class="fas fa-times"></i>';
	// add link to li
	li.appendChild(link);
	// add li to ul
	if (taskValue !== '') {
		taskList.appendChild(li);
	}
	// Store in LS
	tasksInLocalStorage(taskValue)

	// clear input
	taskInput.value = '';

	e.preventDefault();
}

// Store in LS
function tasksInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// delete item
function deleteItem(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		e.target.parentElement.parentElement.remove();
		// delete from LS
		removeFromLocalStorage(e.target.parentElement.parentElement);
	}

}

// delete from LS func
function removeFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach((task, ind) => {
		if (taskItem.textContent === task) {
			tasks.splice(ind, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all
function clearAll() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	// remove all from LS
	removeAllFromLocalStorage();
}
// remove all from LS func
function removeAllFromLocalStorage() {
	localStorage.clear();
}

// filter
function filter(e) {
	const text = e.target.value.toLowerCase();
	const items = document.querySelectorAll('.collection-item');
	items.forEach((task) => {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'flex';
		} else {
			task.style.display = 'none';
		}
	})
}