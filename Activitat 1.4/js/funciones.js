var wordsArray = new Array();
wordsArray[0] = "PELOTA";
wordsArray[1] = "ALIEN";
wordsArray[2] = "JIRAFA";

var auxWord = wordsArray[0]; //Palabra generada (La primera por defecto)
var letrasUsadas = "";

function startGame ()
{
	var divGame = document.getElementById("divPlayGame");
	divGame.style.display = 'block';

	var maxWords = wordsArray.length;
	var aleat = Math.floor(Math.random()*maxWords);

	auxWord = wordsArray[aleat];

	var drawWord = document.getElementById("divShowGame");
	var innerSpan = drawWord.getElementsByTagName("span")[0];

	var i;
	var cont = 0;
	var allLetters = "";

	for (i = 0; i < wordsArray[aleat].length; i++)
	{
		allLetters = allLetters.concat("<input type='text' id=letter"+cont+" class='classLetters classShowLetter' value='' disabled/>");
		cont++;
	}

	innerSpan.innerHTML = allLetters;
}

function checkLetter ()
{
	var letterBox = document.getElementById("divInputLetter");
	var letter = letterBox.value;
	letter = letter.toUpperCase();

	var i;

	for (i = 0; i < auxWord.length; i++)
	{
		if (auxWord[i] === letter)
		{
			var casilla = document.getElementById("letter"+i);
			casilla.value = letter;
		}

		letterBox.value = ""; //Limpiamos la entrada de la letra
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