const minutes = document.querySelector(".minutes");
const secondes = document.querySelector(".secondes");
const buttonStartPause = document.querySelector(".startPause");
const addToTimer = document.querySelector(".addToTimer");
const removeToTimer = document.querySelector(".removeToTimer");
let min = 25;
let sec = 0;
let minMemory = 25;
let start = false;
displayTimer();
let interval = null;
let restart = false;

buttonStartPause.addEventListener("click", () => {
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
