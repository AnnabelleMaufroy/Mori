const minutes = document.querySelector(".minutes");
const secondes = document.querySelector(".secondes");
const minutesNext = document.querySelector('.minutesNext');
const secondesNext = document.querySelector('.secondesNext');
const buttonStartPause = document.querySelector(".startPause");
const addToTimer = document.querySelector(".addToTimer");
const removeToTimer = document.querySelector(".removeToTimer");
const timer = document.querySelector('.timer');
const nextTimer = document.querySelector('.nextTimer');
const cycleButton = document.querySelector('.cycleButton');
const timerButton = document.querySelector('.timerButton');
const cycleText = document.querySelector('.cycleText');
let min = 25;
let sec = 0;
let minNext =5;
let secNext =0;
let minMemory = 25;
let secMemory = 0;
let nextMinMemory= 5;
let nextSecMemory =0;
let start = false;
displayTimer();
let interval = null;
let restart = false;
let inputMinutes = null;
let inputSecondes = null;
let editing = false;
let isCycle = false;
let isPause = false;

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

cycleButton.addEventListener('click', () => {
	buttonStartPause.innerHTML = '<i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>';
	nextTimer.style.display = 'flex';
	cycleText.style.display ='flex';
	cycleText.textContent ='Work';
	isCycle = true;
	isPause =false;

	min = 25;
	sec = 0;
	minNext = 5;
	secNext = 0;
	minMemory = 25;
	secMemory = 0;
	nextMinMemory= 5;
	nextSecMemory = 0;

	resetEditingInputs()

	displayTimer();
	clearInterval(interval);
	start = false;
	restart = false;
});

timerButton.addEventListener('click', () => {
	buttonStartPause.innerHTML = '<i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>';
	nextTimer.style.display = 'none';
	cycleText.style.display ='none';
	isCycle = false;
	isPause =false;

	min = 25;
	sec = 0;
	minMemory = 25;
	secMemory = 0;

	resetEditingInputs()

	displayTimer();
	clearInterval(interval);
	start = false;
	restart = false;
});
buttonStartPause.addEventListener("click", () => {
	if (editing) {
		const newMin = parseInt(inputMinutes.value, 10);
		const newSec = parseInt(inputSecondes.value, 10);

		if (!isNaN(newMin) && newMin >= 0 && !isNaN(newSec) && newSec >= 0 && newSec < 60) {
			min = newMin;
			sec = newSec;
			minMemory = newMin;
			secMemory = newSec;
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

function resetEditingInputs() {
	if (editing) {
		if (inputMinutes) inputMinutes.remove();
		if (inputSecondes) inputSecondes.remove();
		inputMinutes = null;
		inputSecondes = null;
		editing = false;
	}
}
addToTimer.addEventListener("click", () => {
	min += 5;
	minMemory += 5;
	displayTimer();
});
removeToTimer.addEventListener("click", () => {
	if(min>4){
		min -= 5;
		minMemory -= 5;
		displayTimer();
	}
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
	inputMinutes.setAttribute('maxlength',2);
	inputSecondes.setAttribute("type", "text");
	inputSecondes.setAttribute('maxlength',2);
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
			sec = secMemory;
			buttonStartPause.innerHTML = '<i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>';
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
		notifyTimerEnd();

		if (isCycle) {
			const tempMin = minMemory;
			const tempSec = secMemory;
			const tempMinNext = nextMinMemory;
			const tempSecNext = nextSecMemory;
			isPause =!isPause;

			min = tempMinNext;
			sec = tempSecNext;

			minNext = tempMin;
			secNext = tempSec;

			minMemory = min;
			secMemory = sec;
			nextMinMemory = minNext;
			nextSecMemory = secNext;

			start = true;
			displayText();
			startTimer();
		} else {
			start = false;
			restart = true;
			buttonStartPause.innerHTML = start ? 
				'<i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-rotate-right"></i>';
		}
	} else if (sec === 0) {
		min--;
		sec = 59;
	} else {
		sec--;
	}
	displayTimer();
}

function formatTime(value) {
	return value < 10 ? "0" + value : value;
}
function displayTimer() {
	secondes.textContent = formatTime(sec);
	minutes.textContent = formatTime(min);
	secondesNext.textContent = formatTime(secNext);
	minutesNext.textContent = formatTime(minNext);
}
function displayText() {
	const newText = isPause ? 'Pause' : 'Work';
	cycleText.classList.add('text-exit');
	setTimeout(() => {
		cycleText.textContent = newText;
		cycleText.classList.remove('text-exit');
		cycleText.classList.add('text-enter');
		void cycleText.offsetWidth;
		cycleText.classList.add('text-enter-active');
		setTimeout(() => {
			cycleText.classList.remove('text-enter');
			cycleText.classList.remove('text-enter-active');
		}, 400);
	}, 400);
}

function notifyTimerEnd() {
  new Notification("Timer terminé !", {
    body: isCycle ? (isPause ? "Fin de la pause. Retour au travail !" : "Temps de travail terminé. Faisons une pause !") : "Temps écoulé.",
    icon: "mori.png",
  });

  const audio = new Audio("ding.mp3");
  audio.play();
}

