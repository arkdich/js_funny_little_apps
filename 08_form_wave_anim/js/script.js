let labels = document.querySelectorAll(".form-entry label");

labels.forEach((label) => {
    let labelText = label.innerText.split('');
    label.innerText = "";
    labelText.forEach((char, index) => {
        label.innerHTML += `<span style="transition-delay: ${(index + 1) * 50}ms">${char}</span>`;
    })
});