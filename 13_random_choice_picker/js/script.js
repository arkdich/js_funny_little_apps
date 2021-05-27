let textTag = document.getElementById('text_input');
let textOutput = document.querySelector('.text-output');

textTag.addEventListener('keyup', (ev) => {
    let textValues = textTag.value.split(',')
    .filter(tag => tag.trim() != '');

    if(ev.code == 'Enter' || ev.code == 'NumpadEnter') {
        pickRandom(3000);
        return;
    }

    fillContainer(textValues);
});

function pickRandom(clearTimeout) {
    let pickId = setInterval(pickRandomEntry, 100);
    setTimeout(clearInterval, clearTimeout, pickId);
    textTag.value = '';
}

function pickRandomEntry() {
    let TextEntries = document.querySelectorAll('.text-entry');

    if(TextEntries.length == 0) {
        return;
    }

    TextEntries.forEach(entry => entry.classList.remove("active"));
    
    TextEntries[Math.round(Math.random() * (TextEntries.length - 1))].classList.add('active');
}

function fillContainer(textValues) {
    textOutput.innerHTML = '';

    textValues.forEach((value) => {
        let textEntry = document.createElement('div');

        textEntry.className = 'text-entry';
        textEntry.innerText = value;

        textOutput.appendChild(textEntry);
    })
}