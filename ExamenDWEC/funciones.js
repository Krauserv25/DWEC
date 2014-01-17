
var increment = 0;
var randomArray = [];
var AltArray = [];

var totalNum = 0;
var increaseTime;

var arrayNums = [];

var intervalIncrease;
var intervalRandom;
var intervalALT;

//Función que inicia todo el proceso y que permite llamar una función cada 1 segundo para que se muestren los resultados
function escriuLog()
{
	increaseTime = setInterval(print, 1000);
}

//Función que dibuja en consola el resultado de cada número cada un segundo
function print()
{
	console.log("NUMBER :" + totalNum);
	guardaAArray();
}

//Función que almacena los números obtenidos en un array y en la base de datos de indexDB
function guardaAArray()
{
	arrayNums.push(totalNum);
	saveNumIndexDB(totalNum);
}

//Función que se ejecuta cada un segundo e incrementa el total acumulado con el valor indicado por el usuario.
function increaseNum()
{
	totalNum += increment;
}

//Función que se ejecuta cada 1 segundo y calcula un valor aleatorio entre dos números indicados por el usuario
function randomNum()
{
	totalNum = Math.floor(Math.random()*(randomArray[1]-1)+randomArray[0]);
}

//Función que se ejecuta cada 1 segundo y calcula el mayor número entre ambos indicados por el usuario
function altNum ()
{
	totalNum = Math.max(AltArray[0],AltArray[1]);
}

//Función que permite modificar el comportamiento
function changeMode()
{
	clearInterval(intervalIncrease);
	clearInterval(intervalRandom);
	clearInterval(intervalALT);

	var text = getElementHTML("inputChange").value;
	var splitArray = text.split("-");

	switch (splitArray[0])
	{
		case "INC":
		increment = parseInt(splitArray[1]);
		intervalIncrease = setInterval(increaseNum, 1000);
		break;

		case "RND":
		randomArray[0] = parseInt(splitArray[1]);
		randomArray[1] = parseInt(splitArray[2]);
		intervalRandom = setInterval(randomNum, 1000);
		break;

		case "ALT":
		AltArray[0] = parseInt(splitArray[1]);
		AltArray[1] = parseInt(splitArray[2]);
		intervalALT = setInterval(altNum, 1000);
		break;
	}
}

//Función que devuelve un elemento HTML de la web para operar con él
function getElementHTML (id)
{
	return document.getElementById(id);
}