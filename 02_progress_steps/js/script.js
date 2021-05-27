let counter = 1;

let steps = document.querySelectorAll(".step");
let line = document.getElementById("line");

let btnNext = document.getElementById("next");
let btnBack = document.getElementById("back");


btnNext.addEventListener("click", () => {
    counter++;
    update();
});

btnBack.addEventListener("click", () => {
    counter--;
    update();
});

function update() {
    steps.forEach(function(elem, index){
        if(index < counter) {
            elem.classList.add("active");
        } else {
            elem.classList.remove("active");
        }

        if(counter == 1){
            btnBack.disabled = true;
        } else if(counter == steps.length) {
            btnNext.disabled = true;
        } else {
            btnNext.disabled = false;
            btnBack.disabled = false;
        }

        let activeSteps = document.querySelectorAll(".active");

        line.style.width = `${(--activeSteps.length / --steps.length) * 100 }%`;
    });
}