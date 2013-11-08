var wordsArray = new Array();
wordsArray[0] = "PELOTA";
wordsArray[1] = "ALIEN";
wordsArray[2] = "JIRAFA";

var auxWord = wordsArray[0]; //Palabra generada (La primera por defecto)
var letrasUsadas = "";

var vidas = 4;
var minutes = 0;
var seconds = 0;

function startGame ()
{
	var divGame = document.getElementById("divPlayGame");
	divGame.style.display = 'block';

	var divGame = document.getElementById("divTitleDisplay");
	divGame.style.display = 'block';

	var maxWords = wordsArray.length;
	var aleat = Math.floor(Math.random()*maxWords);

	auxWord = wordsArray[aleat];

	var drawWord = document.getElementById("divShowGame");
	var innerSpan = drawWord.getElementsByTagName("span")[0];

	var letterBox = document.getElementById("divInputLetter");
	letterBox.focus();

	var chekButton = document.getElementById("buttonCheck");
	chekButton.disabled = true;

	var divCalendar = document.getElementById("divCalendarDate");
	var innerSpanCalendar = divCalendar.getElementsByTagName("span")[0];

	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	innerSpanCalendar.innerHTML = day+"/"+month+"/"+year;

	var i;
	var cont = 0;
	var allLetters = "";

	for (i = 0; i < wordsArray[aleat].length; i++)
	{
		allLetters = allLetters.concat("<input type='text' id=letter"+cont+" class='classLetters classShowLetter' value='' disabled/>");
		cont++;
	}

	innerSpan.innerHTML = allLetters;

	setInterval(increaseTime, 1000);
}

function checkLetter ()
{
	var letterBox = document.getElementById("divInputLetter");
	var letter = letterBox.value;
	letter = letter.toUpperCase();

	var i;
	var correct = false;

	for (i = 0; i < auxWord.length; i++)
	{
		if (auxWord[i] === letter)
		{
			var casilla = document.getElementById("letter"+i);
			casilla.value = letter;
			correct = true;
		}

		letterBox.value = ""; //Limpiamos la entrada de la letra
		letterBox.focus();
		var chekButton = document.getElementById("buttonCheck");
		chekButton.disabled = true;
	}

	if (!correct)
	{
			vidas--;
			var imageAhorcado = document.getElementById("imageAhorcado");

			switch (vidas)
			{
				case 3:
				imageAhorcado.src = "images/GIFS/Life3.gif";
				break;

				case 2:
				imageAhorcado.src = "images/GIFS/Life2.gif";
				break;

				case 1:
				imageAhorcado.src = "images/GIFS/Life1.gif";
				break;
			}
	}

	if (!lookForLetter(letter)) letrasUsadas = letrasUsadas.concat(letter+" "); 

	var divLetrasUsadas = document.getElementById("divLetrasUsadas");
	var innerSpan = divLetrasUsadas.getElementsByTagName("span")[0];

	innerSpan.innerHTML = letrasUsadas;
}

function lookForLetter (letter)
{
	var splitArray = letrasUsadas.split(" ");

	var found = false;
	var i = 0;

	while ((i < splitArray.length) && !found)
	{
		if (splitArray[i] === letter) found = true;
		i++;
	}

	return found;
}

function checkWrite ()
{
	var chekButton = document.getElementById("buttonCheck");

	var letterBox = document.getElementById("divInputLetter");
	var letter = letterBox.value;

	if (letter != "")
	{
		chekButton.disabled = false;
	}
	else chekButton.disabled = true;
}

function increaseTime()
{
	var divTime = document.getElementById("divClockTime");
	var innerSpan = divTime.getElementsByTagName("span")[0];
	var auxMinutes = "";
	var auxSeconds = "";

	seconds++;

	if (seconds === 60) minutes++;

	seconds %= 60;
	minutes %= 60;

	if (minutes < 10) auxMinutes = "0"+minutes.toString();
	else 
	{
		auxMinutes = minutes.toString();
	}

	if (seconds < 10) auxSeconds = "0"+seconds.toString();
	else 
	{
		auxSeconds = seconds.toString();
	}

	innerSpan.innerHTML = auxMinutes+":"+auxSeconds;
}