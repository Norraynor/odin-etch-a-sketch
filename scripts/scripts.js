//create 16x16 square
const BACKGROUNDCOLOR = "hsl(240,100%,50%)"; //blue 
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
            if (!div.style.backgroundColor) {
                div.style.backgroundColor = selectedColor;    
            } else {
                selectedColor = div.style.backgroundColor;
                let convertToRGB = selectedColor;
                if (selectedColor[0] === "#") {
                    convertToRGB = hexToRGB(selectedColor);                    
                }
                convertToRGB = convertToRGB.replace(/[^\d,]/g, "").split(",");
                let colorToHSL = RGBToHSL(convertToRGB[0], convertToRGB[1], convertToRGB[2]);
                let newLightValue = colorToHSL[2] * 0.9;
                selectedColor = [colorToHSL[0], colorToHSL[1], newLightValue];
                div.style.backgroundColor = `hsl(${selectedColor[0]},${selectedColor[1]}%,${selectedColor[2]}%)`;                 

            }
			});
			container.appendChild(div);
		}
}

function RGBToHSL(r, g, b){
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	const h = s
		? l === r
			? (g - b) / s
			: l === g
			? 2 + (b - r) / s
			: 4 + (r - g) / s
		: 0;
	return [
		60 * h < 0 ? 60 * h + 360 : 60 * h,
		100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
		(100 * (2 * l - s)) / 2,
	];
};

function hexToRGB(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}