const minutes = document.querySelector(".minutes");
const secondes = document.querySelector(".secondes");
const buttonStartPause = document.querySelector(".startPause");
const addToTimer = document.querySelector(".addToTimer");
const removeToTimer = document.querySelector(".removeToTimer");
const timer = document.querySelector('.timer');
let min = 25;
let sec = 0;
let minMemory = 25;
let start = false;
displayTimer();
let interval = null;
let restart = false;
let inputMinutes = null;
let inputSecondes = null;
let editing = false;


buttonStartPause.addEventListener("click", () => {
	if (editing) {
		const newMin = parseInt(inputMinutes.value, 10);
		const newSec = parseInt(inputSecondes.value, 10);

		if (!isNaN(newMin) && newMin >= 0 && !isNaN(newSec) && newSec >= 0 && newSec < 60) {
			min = newMin;
			sec = newSec;
			minMemory = newMin;
		}
		inputMinutes.remove();
		inputSecondes.remove();
		inputMinutes = null;
		inputSecondes = null;
		editing = false;
	}
	start = !start;
	startTimer();
});


addToTimer.addEventListener("click", () => {
	min += 5;
	minMemory += 5;
	displayTimer();
});
removeToTimer.addEventListener("click", () => {
	min -= 5;
	minMemory -= 5;
	displayTimer();
});

timer.addEventListener("click", () => {
	if (start || editing) return;
	editing = true;
	const currentMin = min < 10 ? "0" + min : min;
	const currentSec = sec < 10 ? "0" + sec : sec;
	minutes.textContent = "";
	secondes.textContent = "";
	inputMinutes = document.createElement("input");
	inputSecondes = document.createElement("input");
	inputMinutes.setAttribute("type", "text");
	inputSecondes.setAttribute("type", "text");
	inputMinutes.classList.add("inputMinutes");
	inputSecondes.classList.add("inputSecondes");
	inputMinutes.value = currentMin;
	inputSecondes.value = currentSec;
	minutes.appendChild(inputMinutes);
	secondes.appendChild(inputSecondes);
	inputMinutes.focus();
});


function startTimer() {
	if (start) {
		if (restart) {
			min = minMemory;
			sec = 0;
			buttonStartPause.innerHTML =
				'<i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>';
			restart = false;
		}
		interval = setInterval(timerFunction, 1000);
	} else {
		clearInterval(interval);
		interval = null;
	}
}
function timerFunction() {
	if (sec === 0 && min === 0) {
		clearInterval(interval);
		interval = null;
		start = false;
		restart = true;
		buttonStartPause.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
	} else if (sec === 0) {
		min--;
		sec = 59;
	} else {
		sec--;
	}
	displayTimer();
}
function displayTimer() {
	if (sec < 10) {
		secondes.textContent = "0" + sec;
	} else {
		secondes.textContent = sec;
	}
	if (min < 10) {
		minutes.textContent = "0" + min;
	} else {
		minutes.textContent = min;
	}
}
