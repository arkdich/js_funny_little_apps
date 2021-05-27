//this code is a bit of a mess, i know :)
let goalHeader = document.querySelector(".goal-header");

let goalConf = document.querySelector(".goal-conf");
let goalChange = document.querySelector(".goal-change");

let goalOutput = document.getElementById("goal_output");

let goalInput = document.getElementById("goal_input");
goalInput.selectionStart = 1;

updateUI(localStorage.getItem("_16_goal"));
    //loading page after first time using stored values
    //ignored on the first run
updateGlasses(localStorage.getItem("_16_index"));

goalInput.addEventListener("keyup", (ev) => {
    if(ev.code == "Enter" || ev.code == "NumpadEnter") {
        updateGoal();
    }
});

goalConf.addEventListener("click", updateGoal);

goalChange.addEventListener("click", () => {
    goalHeader.classList.toggle("filled");
    goalInput.value = localStorage.getItem("_16_goal");
    goalInput.focus();
});

function updateGoal() {
    let goalValue = goalInput.value;

    localStorage.setItem("_16_goal", goalValue); //setting new goal value

    localStorage.removeItem("_16_index"); //zeroing index

    updateUI(goalValue);
    updateMainCont();
}

function updateUI(totalGoal) {
    if(!totalGoal) { //used on the first load
        return;
    }

    let goalRem = document.querySelector(".water-empty");

    goalHeader.classList.toggle("filled"); //hiding input filed

    goalOutput.innerText = totalGoal + 'L';

    goalRem.innerText = localStorage.getItem("_16_goal") + 'L Remained';

    createGlasses(totalGoal);
}

function createGlasses(totalGoal) {
    let goalML = totalGoal * 1000;
    let totalGlasses = goalML / 250;

    let glassCont = document.querySelector(".glass-cont");
    glassCont.innerHTML = "";

    document.getElementById("glass_cont_header").innerText = "Select how many glasses of water you have drank";

    for (let i = 0; i < totalGlasses; i++) {
        let glass = document.createElement("div");

        glass.classList.add("water-cont", "water-glass");
        glass.innerText = '250 ml';

        glassCont.appendChild(glass);

        glass.addEventListener("click", selectGlasses)
    }
}

function selectGlasses(ev) {
    let glasses = document.querySelectorAll(".water-glass");

    let targetIndex = Array.from(glasses).indexOf(ev.target); //getting index of exact glass

    localStorage.setItem("_16_index", targetIndex);

    updateGlasses(targetIndex);
}

function updateGlasses(index) {
    if(index == null || index == undefined) {
        return;
    }   //used on the first load

    let glasses = document.querySelectorAll(".water-glass");

    glasses.forEach((glass, glassIndx) => {
        glass.classList.remove("active");
        if(glassIndx <= index) {
            glass.classList.add("active");
        }
    });
    
    updateMainCont();
}

function updateMainCont () {
    let wEmpty = document.querySelector(".water-empty");
    let wFilled = document.querySelector(".water-filled");

    //in case of incorrect value
    if(isNaN(goalInput.value) || goalInput.value == 0) {
        wEmpty.style.height = "100%";
        wFilled.style.height = "0%";

        wEmpty.innerHTML = "Use numbers only and not zero";
        document.getElementById("glass_cont_header").innerText = "";
        localStorage.removeItem("_16_goal");
        return;
    }

    let totalGoal = localStorage.getItem("_16_goal");

    let totalGlasses = document.querySelectorAll(".water-glass").length;
    let activeGlasses = document.querySelectorAll(".active").length;

    let fillPercent = (activeGlasses / totalGlasses) * 100;

    wFilled.style.height = fillPercent + "%";

    wEmpty.style.height = 100 - fillPercent + "%";

    wEmpty.innerText = totalGoal - (totalGoal * (fillPercent / 100)) + "L Remained";

    wFilled.innerText = fillPercent + "%";
}