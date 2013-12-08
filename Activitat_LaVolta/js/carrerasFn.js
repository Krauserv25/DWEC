
var arrayTeams;
var intervalTime;
var disabledPasarTurno;
var randomMessagesList;
var startGame;
var currentIdToEatLeaf;

//Función que inicializa los datos de una partida para jugar
function init ()
{
	disabledPasarTurno = false;
	startGame = true;

	var partidaName = getPartidaName();

	randomMessagesList = new Array();

	setTimeout(function ()
	{
		getCurrentPartida(partidaName, function(obj)
			{
				arrayTeams = obj;

				renderGame();
				moveToNextPoint();
				startGame = false;
			});
	}, 3000);

    setRandomMessages(); 
}

//Función que añade comentarios para los caracoles en un array
function setRandomMessages()
{
	randomMessagesList.push("Soy el mejor ;)");
	randomMessagesList.push("Voy a ganar como sea");
	randomMessagesList.push("Nuestro equipo debe ser vencedor");
	randomMessagesList.push("Arriba TTTTTTTTTTTN"); //TTTTTTTTTTTN es el código que representa Team Name y va a sustituirse por el mismo
	randomMessagesList.push("Me llamo Hebensnail");
	randomMessagesList.push("Caracoles, Cu&aacute;nto caracol!");
	randomMessagesList.push("Mi abuelo fue corredor");
	randomMessagesList.push("CCCCCCCCCCCCC color winner"); //CC es el código que representa Code Color y va a sustituirse por el mismo
	randomMessagesList.push("Vamos equipo. Ui mira que caracola");
	randomMessagesList.push("Si pierdo el director me echa sal");
	randomMessagesList.push("No me traje las babas de recambio!");
	randomMessagesList.push("Mis ojitos enamoran al personal");
	randomMessagesList.push("Traigo sal en la concha");
	randomMessagesList.push("Concha lista para derrapar");
	randomMessagesList.push("Voy a llegar el primero");
	randomMessagesList.push("Voy a mirar fijamente mi objetivo");
	randomMessagesList.push("Guerra en la pista!");
	randomMessagesList.push("A quien se me cruce le golpeo");
	randomMessagesList.push("TTTTTTTTTTTN rules!");
	randomMessagesList.push("Me he clavado una piedra antes");
	randomMessagesList.push("My team is on fire.");
}

//Función que dibuja la información de la bolsa en cada caracol
function setInfoBolsa (id)
{
	currentIdToEatLeaf = id;

	var colorSnail;
	var rolSnail;
	var colorSrc;

	var splitID = id.split("_");
	var i = parseInt(splitID[0]);
	var j = parseInt(splitID[1]);

	colorSnail = getTeamColor(arrayTeams[i-1].color);

	if (arrayTeams[i-1].corredores[j-1].rol === 0) colorSrc = "images/snail"+colorSnail+".png";
	else colorSrc = "images/snailBoss"+colorSnail+".png";

	getElementHTML("mejorarModalTitle").innerHTML = "MEJORAR CARACOL - "+arrayTeams[i-1].nombre;
	getElementHTML("imageSnailMejorarCaracol").src = colorSrc;

	var currentLeafsBolsa = arrayTeams[i-1].corredores[j-1].leafsBolsa;
	getElementHTML("divTotalLeafs").innerHTML = "<span>Max. Hojas en Bolsa de Equipo: "+arrayTeams[i-1].leafsBolsa+"</span>";
	getElementHTML("divCurrentMaxTurnosMejorarCaracol").innerHTML = "<span>Max. Metros por Turno: "+arrayTeams[i-1].corredores[j-1].metrosMaxPorTurno+"</span>";
}

//Función principal del juego que dibuja todos las pistas de carrera con sus respectivos caracoles, barras de progresión, etc
function renderGame ()
{
	var totalTeams = arrayTeams.length;
	var divContainerCarreras = getElementHTML("divContainerCarreras");
	var code = "";
	var auxImageSrc;
	var auxColor;
	var par_impar = false;
	var nombre;
	var metrosRecorridos;
	var messageSpeak;

	var i;
	var j;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			var auxClassPar;

			if (!par_impar)
			{
				par_impar = true;
				auxClassPar = "classFieldsCarrerasImpar";
			} 
			else 
			{
				par_impar = false;
				auxClassPar = "classFieldsCarrerasPar";
			}

			auxColor = getTeamColor(arrayTeams[i].color);
			nombre = arrayTeams[i].nombre;
			var pattSpace = / /g;

			nombre = nombre.replace(pattSpace, "&nbsp;");

			metrosRecorridos = arrayTeams[i].corredores[j].metrosAvanzados;
			messageSpeak = randomMessagesList[Math.floor(Math.random()*(21)+0)]; //21 es el total de mensajes posibles
			messageSpeak = messageSpeak.replace(pattSpace, "&nbsp;");
			messageSpeak = messageSpeak.replace("TTTTTTTTTTTN", nombre);
			messageSpeak = messageSpeak.replace("CCCCCCCCCCCCC", auxColor);

			if (arrayTeams[i].corredores[j].rol === 0) auxImageSrc = "images/snail"+auxColor+".png";
			else auxImageSrc = "images/snailBoss"+auxColor+".png";

			code += "<div class="+auxClassPar+"><img src="+auxImageSrc+" onclick='setInfoBolsa(\""+(i+1)+"_"+(j+1)+"\");' id="+("snailInCurse"+(i+1)+"_"+(j+1))+" class='classSnailImage' alt='snail' rel='tooltip' title="+messageSpeak+" data-toggle='modal' data-target='#modalSpeedBolsaCorredores'>";
			code += "</div><img src='images/chess.jpeg' class='classImageGoal' alt='goal'>";

			code += "<div class='progress progress-striped active' style='float: left; margin-left:1%; margin-bottom:0; height: 4%; background-color:gray!important;'>";
			code += "<div id="+("Progress"+(i+1)+"_"+(j+1))+" class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%; background-color:"+auxColor+"!important;'>";
			code += "<span id="+("spanMetrosAvanzados"+(i+1)+"_"+(j+1))+" class='classSpanProgress'>"+metrosRecorridos+"/1000</span></div></div>";
			code += "<img src='images/endFlag"+auxColor+".png' id="+("imagenWin"+(i+1)+"_"+(j+1))+" style='width:3%; height: 4%; margin-left:1%; float:left;' hidden></img>";
		}
	}

	code += "<button type='button' id='buttonPasarTurno' class='btn btn-danger' onclick='updateCorredores();''><img src='images/go.png' alt='go'>PASAR TURNO</button>";
	divContainerCarreras.innerHTML = code;

    $(function () {
        $('.classSnailImage').tooltip();
    });
}

//Función que permite evolucionar la partida (Pasar Tiempo) indicando valores aleatorios de movimiento para cada caracol
//dentro de los permitido en sus metros máximos por turno
function updateCorredores ()
{
	var i;
	var j;

	var totalTeams = arrayTeams.length;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			arrayTeams[i].corredores[j].metrosAAvanzar += Math.floor((Math.random()*(parseInt(arrayTeams[i].corredores[j].metrosMaxPorTurno)/100))+1);
		}
	}

	clearInterval(intervalTime);
	intervalTime = setInterval(moveToNextPoint, 300);
	setArrayTeams(arrayTeams); //Al mismo momento actualiza la partida
}

//Función que avanza los caracoles por sus respectivos carriles y realiza una serie de comprobaciones como si ha llegado a la meta
function moveToNextPoint ()
{
	var i;
	var j;

	var totalTeams = arrayTeams.length;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			if (parseInt(arrayTeams[i].corredores[j].metrosAvanzados) < 100)
			{
				if (parseInt(arrayTeams[i].corredores[j].metrosAvanzados) < parseInt(arrayTeams[i].corredores[j].metrosAAvanzar))
				{
					disabledPasarTurno = true;
					var snailInCurse = getElementHTML("snailInCurse"+(i+1)+"_"+(j+1));
					var progress = getElementHTML("Progress"+(i+1)+"_"+(j+1));
					arrayTeams[i].corredores[j].metrosAvanzados = parseInt(arrayTeams[i].corredores[j].metrosAvanzados)+1;
					snailInCurse.style.marginLeft = arrayTeams[i].corredores[j].metrosAvanzados+'%';
					progress.style.width = arrayTeams[i].corredores[j].metrosAvanzados+'%';
				}
				else arrayTeams[i].corredores[j].metrosAvanzados = arrayTeams[i].corredores[j].metrosAAvanzar;
			}
			else 
			{
				arrayTeams[i].corredores[j].metrosAvanzados = 100;
				checkWinnerTeam();
				getElementHTML("imagenWin"+(i+1)+"_"+(j+1)).style.display = 'block';
			}

			getElementHTML("spanMetrosAvanzados"+(i+1)+"_"+(j+1)).innerHTML = (parseInt(arrayTeams[i].corredores[j].metrosAvanzados)*10)+"/1000";
		}
	}

	if (disabledPasarTurno && !startGame) 
	{
		getElementHTML("buttonPasarTurno").disabled = true;
		disabledPasarTurno = false;
	}
	else getElementHTML("buttonPasarTurno").disabled = false;
}

//Función que comprueba si un equipo entero ha llegado a la meta. En caso afirmativo mostrará la pantalla de victoria
function checkWinnerTeam ()
{
	var i;
	var j;
	var allTeamWin = true;

	var totalTeams = arrayTeams.length;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			if (parseInt(arrayTeams[i].corredores[j].metrosAvanzados) < 100)
			{
				allTeamWin = false;
			}
		}

		if (allTeamWin)
		{
			location.href= "winScreen.html?team="+arrayTeams[i].nombre+"&color="+getTeamColor(arrayTeams[i].color);
		}

		allTeamWin = true;
	}
}

//Función que da de comer hojas a los caracoles para aumentar su velocidad. Se podrán alimentar mientras haya hojas en la bolsa
function setLeafToSnail()
{
	var splitID = currentIdToEatLeaf.split("_");
	var i = parseInt(splitID[0]);
	var j = parseInt(splitID[1]);

	var currentLeafsBolsa = parseInt(arrayTeams[i-1].leafsBolsa);

	if (currentLeafsBolsa > 0)
	{
		arrayTeams[i-1].leafsBolsa = parseInt(arrayTeams[i-1].leafsBolsa)-100;
		arrayTeams[i-1].corredores[j-1].metrosMaxPorTurno = parseInt(arrayTeams[i-1].corredores[j-1].metrosMaxPorTurno)+100;
		getElementHTML("divTotalLeafs").innerHTML = "<span>Max. Hojas en Bolsa de Equipo: "+arrayTeams[i-1].leafsBolsa+"</span>";
		getElementHTML("divCurrentMaxTurnosMejorarCaracol").innerHTML = "<span>Max. Metros por Turno: "+arrayTeams[i-1].corredores[j-1].metrosMaxPorTurno+"</span>";
	}
}