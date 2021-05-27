let hHand = document.querySelector(".hand-h");
let mHand = document.querySelector(".hand-m");
let sHand = document.querySelector(".hand-s");

let isTwelve = JSON.parse(localStorage.getItem("_19_isTwelve"));
let isDark = JSON.parse(localStorage.getItem("_19_isDark"));


let formatSwitch = document.getElementById("format_switch");
formatSwitch.addEventListener("click", () => {
    isTwelve = !isTwelve;
    localStorage.setItem("_19_isTwelve", isTwelve);

    updateClockTime();
});

let themeToggle = document.getElementById("theme_toggle");

themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    localStorage.setItem("_19_isDark", isDark);

    loadOrChangeMode(isDark);
});

loadOrChangeMode(isDark);

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
	];

const days = [
	'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'    
	];

let curTime = new Date();

let totalSec = curTime.getSeconds() * 6;
let totalMin = curTime.getMinutes() * 6;
let totalHour = (curTime.getHours() * 30) +
     0.5 * curTime.getMinutes();

setInterval(rotateClock, 1000);
updateClockTime();
updateClockDate();

function loadOrChangeMode(mode) {
    if(!mode) {
        themeToggle.innerText = "Light mode";
        document.body.parentElement.classList.remove("dark");
    } else {
        themeToggle.innerText = "Dark mode";
        document.body.parentElement.classList.add("dark");
    }
}

function rotateClock() {
    totalSec += 6;

    if(totalSec % 360 == 0) {
        totalMin += 6;
        totalHour += 0.5;

        updateClockTime();

        if(totalMin % 360 == 0) {
            updateClockDate();
        }
    }

    sHand.style = `transform: translate(-50%, -100%) 
        rotate(${totalSec}deg)`;
    mHand.style = `transform: translate(-50%, -100%) 
        rotate(${totalMin}deg)`;
    hHand.style = `transform: translate(-50%, -100%) 
        rotate(${totalHour}deg)`;
}

function updateClockTime() {
    let clockTime = document.getElementById("clock-time");
    
    let time = new Date();

    let hours = time.getHours();
    let mins = time.getMinutes();

    if(isTwelve) {
        let dayHalf = hours <= 12 ? "AM" : "PM";

        clockTime.innerText = `${hours % 12}:${mins < 10 ? '0' + mins : mins} ${dayHalf}`;
        return;
    }

    clockTime.innerText = `${hours}:${mins < 10 ? '0' + mins : mins}`;
}

function updateClockDate() {
    let clockDate = document.getElementById("clock-date");

    let time = new Date();

    let day = time.getDay();
    let date = time.getDate();
    let month = time.getMonth();

    clockDate.innerHTML = `${days[day]}, ${months[month]}` + ` <span>${date}</span>`;
}