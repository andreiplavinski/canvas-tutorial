let image = document.getElementById('sourceImage');

let rotate = 0, flipHorizontal = 1, flipVertical = 1;


let brightnessSlider = document.getElementById("brightnessSlider");
let contrastSlider = document.getElementById("contrastSlider");
let grayscaleSlider = document.getElementById("grayscaleSlider");
let hueRotateSlider = document.getElementById("hueRotateSlider");
let saturateSlider = document.getElementById("saturationSlider");
let sepiaSlider = document.getElementById("sepiaSlider");
let sizeSlider = document.getElementById("sizeSlider");
let zoomSlider = document.getElementById("zoomSlider");
let rotateOptions = document.querySelectorAll(".control");
let sizeLabel = document.getElementById("sizeLabel");
let fileInput = document.getElementById("fileInput");


function uploadImage() {

	let file = fileInput.files[0];
	if(!file) return;
	image.src = URL.createObjectURL(file);

	image.onload = function () {
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.crossOrigin = "anonymous";
		applyFilter();
	};

	document.querySelector('.help-text').style.display = "none";
	document.querySelector('.image-save').style.display = "block";
	document.querySelector('.image-controls').style.display = "block";
	document.querySelector('.preset-filters').style.display = "block";
	document.querySelector('.image-rotate').style.display = "block";
	document.querySelector('.image-resize').style.display = "block";
	document.querySelector('.image-rezoom').style.display = "block";
};


function applyFilter() {
	let canvas = document.getElementById('canvas');

	canvas.style.scale = zoomSlider.value

	let context = canvas.getContext('2d');

	canvas.width = image.naturalWidth;

	canvas.height = image.naturalHeight;

	currentX = canvas.width/2;

  currentY = canvas.height/2;


	let filterString =
		"brightness(" + brightnessSlider.value + "%" +
		") contrast(" + contrastSlider.value + "%" +
		") grayscale(" + grayscaleSlider.value + "%" +
		") saturate(" + saturateSlider.value + "%" +
		") sepia(" + sepiaSlider.value + "%" +
		") hue-rotate(" + hueRotateSlider.value + "deg" + ")";

	context.filter = filterString;
	context.translate(canvas.width / 2, canvas.height / 2);

	context.scale(flipHorizontal, flipVertical);

	if(rotate !== 0) {
		context.rotate(rotate * Math.PI / 180);
}

	context.drawImage(image, -canvas.width / 2 * sizeSlider.value, -canvas.height / 2 * sizeSlider.value, canvas.width * sizeSlider.value, canvas.height * sizeSlider.value);
	// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

	sizeLabel.innerHTML = `${Math.round(canvas.width * sizeSlider.value)}x${Math.round(canvas.height * sizeSlider.value)}`
}


function brightenFilter() {
	resetImage();
	brightnessSlider.value = 130;
	contrastSlider.value = 120;
	saturateSlider.value = 120;
	applyFilter();
}

function bwFilter() {
	resetImage();
	grayscaleSlider.value = 100;
	brightnessSlider.value = 120;
	contrastSlider.value = 120;
	applyFilter();
}

function funkyFilter() {
	resetImage();

	// Set a random hue rotation everytime
	hueRotateSlider.value =
		Math.floor(Math.random() * 360) + 1;
	contrastSlider.value = 120;
	applyFilter();
}

function vintageFilter() {
	resetImage();
	brightnessSlider.value = 120;
	saturateSlider.value = 120;
	sepiaSlider.value = 150;
	applyFilter();
}

function testFilter() {
	resetImage();
	brightnessSlider.value = 125;
	hueRotateSlider.value = 320;
	grayscaleSlider.value = 20;
	applyFilter();
}


function resetImage() {
	brightnessSlider.value = 100;
	contrastSlider.value = 100;
	grayscaleSlider.value = 0;
	hueRotateSlider.value = 0;
	saturateSlider.value = 100;
	sepiaSlider.value = 0;
	zoomSlider.value = 1;
	sizeSlider.value = 1;
	rotate = 0;
	flipHorizontal = 1;
	flipVertical = 1;
	applyFilter();
}

function saveImage() {
	let linkElement = document.getElementById('link');
	linkElement.setAttribute(
	'download', 'edited_image.png'
	);


	let canvasData = canvas.toDataURL("image/png")
	canvasData.replace(
	"image/png", "image/octet-stream"
	)

	linkElement.setAttribute('href', canvasData);
	linkElement.click();
}



rotateOptions.forEach(option => {
	option.addEventListener("click", () => {
			if(option.id === "left") {
					rotate -= 90;
			} else if(option.id === "right") {
					rotate += 90;
			} else if(option.id === "horizontal") {
					flipHorizontal = flipHorizontal === 1 ? -1 : 1;
			} else {
					flipVertical = flipVertical === 1 ? -1 : 1;
			}
			applyFilter();
	});
});


function dropHandler(ev) {
  ev.preventDefault();
	var dt = ev.dataTransfer;
  var files = dt.files;
	fileInput.files = files;
	uploadImage()

}

function dragOverHandler(ev) {
  ev.preventDefault();
}