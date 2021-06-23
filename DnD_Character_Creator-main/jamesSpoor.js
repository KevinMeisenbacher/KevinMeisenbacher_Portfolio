// James Spoor
var canvas;
var ctx;

var faceType = 0;
var legsType = 0;
//var shoesType = 0;
var torsoType = 0;
var mouthType = 0;
var noseType = 0;
var eyesType = 0;
var hairBottomType = 0;
var hairTopType = 0;
var earsType = 0;
var hornsType = 0;

window.addEventListener('load', function () {
  updateCharacterPortrait();
})

function updateCharacterPortrait() {
	//get canvas
	canvas = document.getElementById("characterPortrait");
	ctx = canvas.getContext("2d");

	//fill background
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//draw character elements
	drawBody();
	drawFace();
	drawLegs();
	//drawShoes();
	drawTorso();
	drawMouth();
	drawNose();
	drawEyes();
	drawHairTop();
	drawHairBottom();
	drawEars();
	drawHorns();
}

function drawBody() {
	var detailString = "body"+bodyType()+gender();
	var colorString = "body"+bodyType()+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawBodyElement(color);
	drawBodyElement(detail);
}

function drawFace() {
	var detailString = "face_"+faceType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawHeadElement(color);
	drawHeadElement(detail);
}

function drawLegs() {
	var detailString = "legs"+bodyType()+gender()+"_"+legsType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawBodyElement(color);
	drawBodyElement(detail);
}

function drawTorso() {
	var detailString = "torso"+bodyType()+gender()+"_"+torsoType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawBodyElement(color);
	drawBodyElement(detail);
}

function drawMouth() {
	var detailString = "mouth_"+mouthType.toString().padStart(2, '0');
	
	var detail = document.getElementById(detailString);
	
	drawHeadElement(detail);
}

function drawNose() {
	var detailString = "nose_"+noseType.toString().padStart(2, '0');
	
	var detail = document.getElementById(detailString);
	
	drawHeadElement(detail);
}

function drawEyes() {
	var detailString = "eyes_"+eyesType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawHeadElement(color);
	drawHeadElement(detail);
}

function drawHairTop() {
	var detailString = "hair_top_"+hairTopType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawHeadElement(color);
	drawHeadElement(detail);
}

function drawHairBottom() {
	var detailString = "hair_bottom_"+hairBottomType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawHeadElement(color);
	drawHeadElement(detail);
}

function drawEars() {
	var detailString = "ears_"+earsType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawHeadElement(color);
	drawHeadElement(detail);
}

function drawHorns() {
	var detailString = "horns_"+hornsType.toString().padStart(2, '0');
	var colorString = detailString+"_COLOR";
	
	var color = document.getElementById(colorString);
	var detail = document.getElementById(detailString);
	
	drawHeadElement(color);
	drawHeadElement(detail);
}

function drawBodyElement(img) {
	ctx.drawImage(img, bodyPosX(), bodyPosY(), bodyScaleX(), bodyScaleY());
}

function drawHeadElement(img) {
	var headPosX = (canvas.width - img.width * headScale())/2
	ctx.drawImage(img, headPosX, headPosY(), img.width * headScale(), img.height * headScale());
}

function elementExists(id) {
	if (document.getElementById(id) != null) return(true);
	else return(false);
}

function changeFace() {
	faceType++;
	var elementId = "face_"+faceType.toString().padStart(2, '0');
	if (!elementExists(elementId)) faceType = 0;
	updateCharacterPortrait();
}

function changeLegs() {
	legsType++;
	var elementId = "legs"+bodyType()+gender()+"_"+legsType.toString().padStart(2, '0');
	if (!elementExists(elementId)) legsType = 0;
	updateCharacterPortrait();
}

function changeTorso() {
	torsoType++;
	var elementId = "torso"+bodyType()+gender()+"_"+torsoType.toString().padStart(2, '0');
	if (!elementExists(elementId)) torsoType = 0;
	updateCharacterPortrait();
}

function changeMouth() {
	mouthType++;
	var elementId = "mouth_"+mouthType.toString().padStart(2, '0');
	if (!elementExists(elementId)) mouthType = 0;
	updateCharacterPortrait();
}

function changeNose() {
	noseType++;
	var elementId = "nose_"+noseType.toString().padStart(2, '0');
	if (!elementExists(elementId)) noseType = 0;
	updateCharacterPortrait();
}

function changeEyes() {
	eyesType++;
	var elementId = "eyes_"+eyesType.toString().padStart(2, '0');
	if (!elementExists(elementId)) eyesType = 0;
	updateCharacterPortrait();
}

function changeHairTop() {
	hairTopType++;
	var elementId = "hair_top_"+hairTopType.toString().padStart(2, '0');
	if (!elementExists(elementId)) hairTopType = 0;
	updateCharacterPortrait();
}

function changeHairBottom() {
	hairBottomType++;
	var elementId = "hair_bottom_"+hairBottomType.toString().padStart(2, '0');
	if (!elementExists(elementId)) hairBottomType = 0;
	updateCharacterPortrait();
}

function changeEars() {
	earsType++;
	var elementId = "ears_"+earsType.toString().padStart(2, '0');
	if (!elementExists(elementId)) earsType = 0;
	updateCharacterPortrait();
}

function changeHorns() {
	hornsType++;
	var elementId = "horns_"+hornsType.toString().padStart(2, '0');
	if (!elementExists(elementId)) hornsType = 0;
	updateCharacterPortrait();
}

function bodyType() {
	var heightInput = document.getElementById("height").value;
	var height;
	if (heightInput > 66) height = "tall";
	else if (heightInput > 33) height = "average";
	else height = "short";
	
	var weightInput = document.getElementById("weight").value;
	var weight;
	if (weightInput > 66) weight = "large";
	else if (weightInput > 33) weight = "medium";
	else weight = "thin";
	
	var strengthInput = document.getElementById("muscular").checked;
	var strength;
	if (strengthInput == true) strength = "strong";
	else strength = "weak";
	
	return("_"+height+"_"+weight+"_"+strength);
}

function gender() {
	var genderInput = document.getElementById("gender").value;
	var gender;
	if (genderInput == 0) gender = "_male";
	else gender = "_female";
	
	return(gender);
}

function headScale() {
	var minScale = 0.8;
	
	var height = document.getElementById("height").value;
	return(minScale + (1-minScale) * height/100);
}

function headPosY() {
	var minHeight = 0.525;
	
	var height = document.getElementById("height").value;
	return(canvas.height*(1-minHeight) - canvas.height*(1-minHeight) * height/100);
}

function bodyScaleX() {
	var minWidth = 0.6;
	
	var width = document.getElementById("weight").value;
	return(canvas.width*minWidth + canvas.width*(1-minWidth) * width/100);
}

function bodyPosX() {
	return((canvas.width - bodyScaleX())/2);
}

function bodyScaleY() {
	var minHeight = 0.5;
	
	var height = document.getElementById("height").value;
	return(canvas.height*minHeight + canvas.height*(1-minHeight) * height/100);
}

function bodyPosY() {
	return(canvas.height - bodyScaleY());
}