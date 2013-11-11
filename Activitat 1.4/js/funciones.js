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
var intervalTime;
var intervalDivMove;

function reset ()
{
	auxWord = wordsArray[0]; //Palabra generada (La primera por defecto)

	letrasUsadas = "";
	var divLetrasUsadas = document.getElementById("divLetrasUsadas");
	var innerSpan = divLetrasUsadas.getElementsByTagName("span")[0];
	innerSpan.innerHTML = letrasUsadas;

	vidas = 6;
	minutes = 0;
	seconds = 0;

	var divTime = document.getElementById("divClockTime");
	innerSpan = divTime.getElementsByTagName("span")[0];
	innerSpan.innerHTML = "00:00";

	var divVida = document.getElementById("divVidas");
	var innerSpanVida = divVida.getElementsByTagName("span")[0];

	innerSpanVida.innerHTML = vidas;

	var imageAhorcado = document.getElementById("imageAhorcado");
	imageAhorcado.src = "images/GIFS/Life6.gif";
				
	newWidth = 0;
	clearInterval(intervalTime);
	clearInterval(intervalDivMove);

	var divTiempoInvertido = document.getElementById("divTiempoInvertido");
	var divVidasRestantes = document.getElementById("divVidasRestantes");
	var divPuntuacion = document.getElementById("divPuntuacion");

	divTiempoInvertido.style.width = newWidth+'%';
	divVidasRestantes.style.width = newWidth+'%';
	divPuntuacion.style.width = newWidth+'%';
}

function startGame ()
{
	reset();

	var divMessages = document.getElementById("divMessages");
	divMessages.style.display = 'none';

	var buttonStart = document.getElementById("buttonStart");
	buttonStart.disabled = true;

	var divGame = document.getElementById("divPlayGame");
	divGame.style.display = 'inline-block';

	var divTitleGame = document.getElementById("divTitleDisplay");
	divTitleGame.style.display = 'inline-block';

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

	intervalTime = setInterval(increaseTime, 1000);
	intervalTime();
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
			var divVida = document.getElementById("divVidas");
			var innerSpanVida = divVida.getElementsByTagName("span")[0];

			innerSpanVida.innerHTML = vidas;

			var imageAhorcado = document.getElementById("imageAhorcado");

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

	var divLetrasUsadas = document.getElementById("divLetrasUsadas");
	var innerSpan = divLetrasUsadas.getElementsByTagName("span")[0];

	innerSpan.innerHTML = letrasUsadas;
}

function checkLoose ()
{
	if (vidas <= 0)
	{
		setMessages("FRACASO", "looseSpin", 0);
		var buttonStart = document.getElementById("buttonStart");
		buttonStart.disabled = false;

		intervalDivMove = setInterval(divMove, 30);
		intervalDivMove();
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

		setMessages("ENHORABUENA", "winSpin", points);
		var buttonStart = document.getElementById("buttonStart");
		buttonStart.disabled = false;

		intervalDivMove = setInterval(divMove, 30);
		intervalDivMove();
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

function setMessages (state, image, points)
{
	var divGame = document.getElementById("divPlayGame");
	divGame.style.display = 'none';

	var divTitleGame = document.getElementById("divTitleDisplay");
	divTitleGame.style.display = 'none';

	var divMessages = document.getElementById("divMessages");
	divMessages.style.display = 'inline-block';

	var divStateMessage = document.getElementById("divStateMessage");
	divStateMessage.innerHTML = "<img src='images/GIFS/"+image+".gif' class='classImageSpin' alt='looseSpin'><h2>&#161;&#161;&#161;&#161;"+state+"!!!!</h2>"+
	"<img src='images/GIFS/"+image+".gif' class='classImageSpin' alt='looseSpin'>";

	var divVidasRestantes = document.getElementById("divVidasRestantes");
	var innerSpanVidasRestantes = divVidasRestantes.getElementsByTagName("span")[0];

	var divTiempoInvertido = document.getElementById("divTiempoInvertido");
	var innerSpanTiempoInvertido = divTiempoInvertido.getElementsByTagName("span")[0];

	var divPuntuacion = document.getElementById("divPuntuacion");
	var innerSpanPuntuacion = divPuntuacion.getElementsByTagName("span")[0];

	innerSpanVidasRestantes.innerHTML = "Vidas Restantes: "+vidas;
	innerSpanTiempoInvertido.innerHTML = "Tiempo invertido: "+getTime();
	innerSpanPuntuacion.innerHTML = "Puntuacion total: "+points+"/100";
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
	var divTiempoInvertido = document.getElementById("divTiempoInvertido");
	var divVidasRestantes = document.getElementById("divVidasRestantes");
	var divPuntuacion = document.getElementById("divPuntuacion");

	if (newWidth < 40)
	{
		newWidth++; 
		divTiempoInvertido.style.width = newWidth+'%';
		divVidasRestantes.style.width = newWidth+'%';
		divPuntuacion.style.width = newWidth+'%';
	}
}