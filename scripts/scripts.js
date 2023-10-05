//create 16x16 square
const size = 16;
const BACKGROUNDCOLOR = "blue";

const resizeButton = document.querySelector(".resize");
const container = document.querySelector(".container");

resizeButton.addEventListener('click', (e) => {
    removeAllChildren(container);
})

for (let i = 0; i < size * size; i++) {
    const divSize = (1 / size)*100;
    const div = document.createElement("div");
    div.classList.add("grid-element");
    div.style.flexBasis = divSize + "%";
    div.addEventListener('mouseenter', (e) => {
        div.style.backgroundColor = BACKGROUNDCOLOR;
    })
    container.appendChild(div);
}

function removeAllChildren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}