//create 16x16 square
const BACKGROUNDCOLOR = "blue";
const MAX_SIZE = 50;

const resizeButton = document.querySelector(".resize");
const monocolorButton = document.querySelector(".monocolor");
const container = document.querySelector(".container");
let monoColor = true;

resizeButton.addEventListener('click', (e) => {
    let newSize = +prompt(`How big should be new canva?(current max size is ${MAX_SIZE})`);
    if (!isNaN(newSize)) {
        removeAllChildren(container);   
        if (newSize > MAX_SIZE) {
            newSize = MAX_SIZE;
        }
        if (newSize < 0) {
            newSize = 0;
        }
        createCanva(newSize);
    }

})

monocolorButton.addEventListener('click', (e) => {
    if (monoColor) {
        monocolorButton.textContent = "MONOCOLOR OFF";
        monoColor = false;
    } else {
        monocolorButton.textContent = "MONOCOLOR ON";
        monoColor = true;
    }
})

createCanva();

function removeAllChildren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

function createCanva(size=16) {
    for (let i = 0; i < size * size; i++) {
			const divSize = (1 / size) * 100;
			const div = document.createElement("div");
			div.classList.add("grid-element");
			div.style.flexBasis = divSize + "%";
        div.addEventListener("mouseenter", (e) => {
            let selectedColor = "";
            if (monoColor) {
                selectedColor = BACKGROUNDCOLOR;
            } else {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                selectedColor = "#"+randomColor;
            }
            div.style.backgroundColor = selectedColor;
			});
			container.appendChild(div);
		}
}