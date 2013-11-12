var wordsArray = new Array();
wordsArray[0] = "PELOTA";
wordsArray[1] = "ALIEN";
wordsArray[2] = "JIRAFA";

var auxWord; //Palabra generada (La primera por defecto)
var letrasUsadas;
var vidas;
var minutes;
var seconds;

var newWidth;
var newImageWidth;
var intervalTime;
var intervalDivMove;
var intervalImageMove;

var divMessages;
var divAddWords;
var divInstructions;
var buttonStart;
var buttonAddWord;
var buttonInstructions;
var divGame;
var divTitleGame;
var inputWord;
var drawWord;
var letterBox;
var chekButton;
var divCalendar;
var divLetrasUsadas;
var divTime;
var divVida;
var imageAhorcado;
var divTiempoInvertido;
var divVidasRestantes;
var divPuntuacion;
var divStateMessage;
var divWordMessages;
var succesImage;

function init ()
{
	divMessages = document.getElementById("divMessages");
	divAddWords = document.getElementById("divAddWords");
	divInstructions = document.getElementById("divInstructions");
	buttonStart = document.getElementById("buttonStart");
	buttonAddWord = document.getElementById("buttonAddWord");
	buttonInstructions = document.getElementById("buttonInstructions");
	divGame = document.getElementById("divPlayGame");
	divTitleGame = document.getElementById("divTitleDisplay");
	inputWord = document.getElementById("inputWord");
	drawWord = document.getElementById("divShowGame");
	letterBox = document.getElementById("divInputLetter");
	chekButton = document.getElementById("buttonCheck");
	divCalendar = document.getElementById("divCalendarDate");
	divLetrasUsadas = document.getElementById("divLetrasUsadas");
	divTime = document.getElementById("divClockTime");
	divVida = document.getElementById("divVidas");
	imageAhorcado = document.getElementById("imageAhorcado");
	divTiempoInvertido = document.getElementById("divTiempoInvertido");
	divVidasRestantes = document.getElementById("divVidasRestantes");
	divPuntuacion = document.getElementById("divPuntuacion");
	divStateMessage = document.getElementById("divStateMessage");
	divWordMessages = document.getElementById("divWordMessages");
	succesImage = document.getElementById("succesImage");
}

function reset ()
{
	auxWord = wordsArray[0]; //Palabra generada (La primera por defecto)
	letrasUsadas = "";
	
	var innerSpan = divLetrasUsadas.getElementsByTagName("span")[0];
	innerSpan.innerHTML = letrasUsadas;

	vidas = 6;
	minutes = 0;
	seconds = 0;
	newWidth = 0;
	newImageWidth = 0;

	innerSpan = divTime.getElementsByTagName("span")[0];
	innerSpan.innerHTML = "00:00";
	
	var innerSpanVida = divVida.getElementsByTagName("span")[0];
	innerSpanVida.innerHTML = vidas;
	
	imageAhorcado.src = "images/GIFS/Life6.gif";
					
	clearInterval(intervalTime);
	clearInterval(intervalDivMove);
	clearInterval(intervalImageMove);

	divTiempoInvertido.style.width = newWidth+'%';
	divVidasRestantes.style.width = newWidth+'%';
	divPuntuacion.style.width = newWidth+'%';

	divWordMessages.innerHTML = "";
	inputWord.value = "";
}

function startGame ()
{
	reset();

	divMessages.style.display = 'none';
	divAddWords.style.display = 'none';
	divInstructions.style.display = 'none';

	buttonStart.disabled = true;
	buttonAddWord.disabled = true;
	buttonInstructions.disabled = true;

	divAddWords.style.display = 'none';
	divGame.style.display = 'inline-block';	
	divTitleGame.style.display = 'inline-block';

	var maxWords = wordsArray.length;
	var aleat = Math.floor(Math.random()*maxWords);
	auxWord = wordsArray[aleat];

	var innerSpan = drawWord.getElementsByTagName("span")[0];

	letterBox.focus();	
	chekButton.disabled = true;

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

	intervalTime = setInterval(increaseTime, 1000);
}

function showAddWord ()
{
	divGame.style.display = 'none';
	divTitleGame.style.display = 'none';
	divInstructions.style.display = 'none';
	divMessages.style.display = 'none';
	divAddWords.style.display = 'inline-block';
	buttonStart.disabled = false;
	
	inputWord.focus();
}

function showInstructions ()
{
	buttonStart.disabled = false;
	divGame.style.display = 'none';
	divTitleGame.style.display = 'none';
	divAddWords.style.display = 'none';
	divMessages.style.display = 'none';
	divInstructions.style.display = 'inline-block';
}

function checkLetter ()
{
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

		chekButton.disabled = true;
	}

	if (!correct)
	{
			vidas--;
			var innerSpanVida = divVida.getElementsByTagName("span")[0];

			innerSpanVida.innerHTML = vidas;

			switch (vidas)
			{
				case 6:
				imageAhorcado.src = "images/GIFS/Life6.gif";
				break;

				case 5:
				imageAhorcado.src = "images/GIFS/Life5.gif";
				break;

				case 4:
				imageAhorcado.src = "images/GIFS/Life4.gif";
				break;

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

			checkLoose();
	}
	else
	{
		checkWin();
	}

	if (!lookForLetter(letter)) letrasUsadas = letrasUsadas.concat(letter+" "); 

	var innerSpan = divLetrasUsadas.getElementsByTagName("span")[0];
	innerSpan.innerHTML = letrasUsadas;
}

function checkLoose ()
{
	if (vidas <= 0)
	{
		setMessages("FRACASO", 0);

		buttonStart.disabled = false;
		buttonAddWord.disabled = false;
		buttonInstructions.disabled = false;

		succesImage.src = "images/GIFS/Life2.gif";

		intervalDivMove = setInterval(divMove, 5);
		intervalImageMove = setInterval(imageMove, 12);
	}
}

function checkWin ()
{
	var i = 0;
	var all = true;

	while (i < auxWord.length && all)
	{
		var casilla = document.getElementById("letter"+i);

		if (casilla.value === "") all = false;

		i++;
	}

	if (all)
	{
		var points = calculatePuntuation();
		points = points.toFixed(0);

		setMessages("ENHORABUENA", points);

		buttonStart.disabled = false;
		buttonAddWord.disabled = false;
		buttonInstructions.disabled = false;

		succesImage.src = "images/GIFS/Life6.gif";

		intervalDivMove = setInterval(divMove, 5);
		intervalImageMove = setInterval(imageMove, 12);
	}
}

//Se quitan puntos por vida perdida y se pierden 10 puntos por minuto
function calculatePuntuation ()
{
	var points = (vidas*100)/6;
	var resta = minutes*10;
	
	points -= resta;

	return points;
}

function setMessages (state, points)
{
	divGame.style.display = 'none';
	divTitleGame.style.display = 'none';
	divMessages.style.display = 'inline-block';
	
	divStateMessage.innerHTML = "<span class='classMessageTitle'>&#161;&#161;&#161;&#161;"+state+"!!!!</span>";

	var innerSpanVidasRestantes = divVidasRestantes.getElementsByTagName("span")[0];
	var innerSpanTiempoInvertido = divTiempoInvertido.getElementsByTagName("span")[0];
	var innerSpanPuntuacion = divPuntuacion.getElementsByTagName("span")[0];

	innerSpanVidasRestantes.innerHTML = "Vidas Restantes:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+vidas;
	innerSpanTiempoInvertido.innerHTML = "Tiempo invertido:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+getTime();
	innerSpanPuntuacion.innerHTML = "Puntuacion total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+points+"/100";
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
	var letter = letterBox.value;

	if (letter != "")
	{
		chekButton.disabled = false;
	}
	else chekButton.disabled = true;
}

function increaseTime()
{
	var innerSpan = divTime.getElementsByTagName("span")[0];
	var auxTime = getTime();

	innerSpan.innerHTML = auxTime;
}

function getTime ()
{
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

	return auxMinutes+":"+auxSeconds;
}

function divMove ()
{
	if (newWidth < 100)
	{
		newWidth++; 
		divTiempoInvertido.style.width = newWidth+'%';
		divVidasRestantes.style.width = newWidth+'%';
		divPuntuacion.style.width = newWidth+'%';
	}
}

function imageMove ()
{
	if (newImageWidth < 40)
	{
		newImageWidth++;
		succesImage.style.width = newImageWidth+'%';
	}
}

function checkInputWord ()
{
	var word = inputWord.value;

	if (word != "")
	{
		word = word.toUpperCase();
		word = getWordLessSpaces(word);

		if (!checkEqualsWord(word))
		{
			inputWord.value = "";
			setMessage(3, word);
			wordLeft.options[wordsArray.length] = new Option(word,"0","0");
			wordsArray.push(word);
		}
		else
		{
			setMessage(1);
		}
	}
	else setMessage(2);

	inputWord.focus();
}

function getWordLessSpaces (word)
{
	var splitArray = word.split(" ");
	var auxWord = "";
	var i;

	for (i = 0; i < splitArray.length; i++)
	{
		auxWord += splitArray[i];
	}

	return auxWord;
}

function checkEqualsWord (word)
{
	var found = false;

	wordsArray.forEach(function(aux)
	{
		if (word === aux) found = true;
	});

	return found;
}

function setMessage (num, word)
{
	switch (num)
	{
		case 1:
		divWordMessages.innerHTML = "ESTA PALABRA YA EXISTE!!";
		break;

		case 2:
		divWordMessages.innerHTML = "DEBES ESCRIBIR UNA PALABRA!";
		break;

		case 3:
		divWordMessages.innerHTML = "SE HA A&#209;ADIDO LA PALABRA "+word;
		break;

		default:
		divWordMessages.innerHTML = "";
		break;
	}
}

