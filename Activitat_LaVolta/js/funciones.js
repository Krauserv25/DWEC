
var colorSnailButtonBlack;
var colorSnailButtonBlue;
var colorSnailButtonRed;
var colorSnailButtonGreen;
var colorSnailButtonOrange;
var colorSnailButtonPurple;

var imageColor;

function init ()
{
	colorSnailButtonBlack = document.getElementById("colorSnailButtonBlack");
	colorSnailButtonBlack = document.getElementById("colorSnailButtonBlue");
	colorSnailButtonBlack = document.getElementById("colorSnailButtonRed");
	colorSnailButtonBlack = document.getElementById("colorSnailButtonGreen");
	colorSnailButtonBlack = document.getElementById("colorSnailButtonOrange");
	colorSnailButtonBlack = document.getElementById("colorSnailButtonPurple");

	imageColor = document.getElementById("imageColor");
}

function changeSnailColor (code)
{
	var auxForward = "images/snail";

	switch(code)
	{
		case 1:
		imageColor.src = auxForward+"Black.png";
		break;

		case 2:
		imageColor.src = auxForward+"Blue.png";
		break;

		case 3:
		imageColor.src = auxForward+"Red.png";
		break;

		case 4:
		imageColor.src = auxForward+"Green.png";
		break;

		case 5:
		imageColor.src = auxForward+"Orange.png";
		break;

		case 6:
		imageColor.src = auxForward+"Purple.png";
		break;
	}
}
