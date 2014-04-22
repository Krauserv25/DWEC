/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LOS CÁLCULOS DEL JUEGO (BACK-END)
	AUTOR: IVAN VALERA
*/

var master = 
{
	aux_CombOculta: null, // Esta variable auxiliar contendrá la combinación oculta o parte de ella
	aux_CombPlayer: null, // Esta variable auxiliar contendrá lo que el usuario haya marcado

	//Método que comprueba cuántas fichas de color han sido correctas y bien colocadas
	CuantasOK: function()
	{
		//Paso 1: Generar bucle que recorra cada ficha de color del usuario para almacenarlo en el auxiliar
		var i;
		var j = 0;
		var contCorrectas = 0;
		var elementsListColor = $('#divSetColorsFila'+config.currentFilaNum).children(); //Obtenemos el número del color
		var elementsPistas = $('#divPistasFila'+config.currentFilaNum).children();
		var contListColor = elementsListColor.length;

		this.aux_CombPlayer = new Array();
		for (i = 0; i < contListColor; i++)
		{
			var auxNum = parseInt(elementsListColor.eq(i).find('.circleColor').find('span')[0].innerText);
			this.aux_CombPlayer[i] = auxNum;
		}
		i = 0;

		//Paso 2: Recorrer la cantidad cambiante de los elementos del usuario
		//Paso 3: Comprobar si la ficha de color recorrida coincide con la del array oculto
		/*Paso 3: 
			En caso de ser afirmativo:
				- Cambiar clase de la primera pista que esté vacía a la que sea de color negro (correcta) 
				- Excluir las "fichas" coincidientes de sus respectivos arrays y decrementar su posición y cantidad
			*/
		//Paso 4: Devolver la cantidad de aciertos para comprobar

			while (i < contListColor)
			{
				if (this.aux_CombPlayer[i] === this.aux_CombOculta[j])
				{
					elementsPistas.eq(contCorrectas).find('.circleColor').addClass('colorBlack');
					this.aux_CombPlayer.splice(i,1);
					this.aux_CombOculta.splice(j,1);
					i--;					
					j--; 
					contListColor--;
					contCorrectas++;
				}
				i++;
				j++;
			}

		utils.log(this.aux_CombOculta);

		return contCorrectas;
	},
	//Método que comprueba cuántas fichas de color han sido correctas pero mal colocadas
	CuantasKO: function()
	{
		//Paso 1: Generar bucle que recorra cada ficha de color del usuario (lo que queda de "CuantasOK")
		//Paso 2: Generar bucle que recorra cada ficha del array auxiliar (aux_CombOculta)
		//Paso 3: Comprobar si la ficha de color recorrida coincide con la del array
		/*Paso 4: 
			En caso de ser afirmativo:
				- Cambiar clase de la primera pista que esté vacía a la que sea de color blanco (correcta mal ubicada) 
				- Excluir del array auxiliar la ficha encontrada
			*/

		var i = 0;
		var j = 0;
		var exit = false;
		//Obtenemos los elementos de una fila (círculos)
		var elementsListColor = $('#divSetColorsFila'+config.currentFilaNum).children();
		var elementsPistas = $('#divPistasFila'+config.currentFilaNum).children();
		var contListColor = this.aux_CombPlayer.length;

		for (i = 0; i < contListColor; i++)
		{
			var auxNum = this.aux_CombPlayer[i];
			var auxTotalCombinacion = this.aux_CombOculta.length;

			while (j < auxTotalCombinacion && !exit)
			{
					if (auxNum === this.aux_CombOculta[j])
					{
						exit = true;
						var auxPosPista = (5 - this.aux_CombOculta.length);
						elementsPistas.eq(auxPosPista).find('.circleColor').addClass('colorWhite');
						this.aux_CombOculta.splice(j,1);
					}

				j++;
			}

			exit = false;
			j = 0;
		}

	
	},
	//Método que genera una combinación aleatoria de colores para iniciar una partida
	GenerarCodigoOculto: function()
	{
		//Paso 1: Generar un nuevo array en el config
		//Paso 2: Generar dentro del bucle un valor aleatorio entre 1 y 6 y asignarlo a cada posición del array
		//Paso 3: Copiar el array final al auxiliar
		config.combOculta = new Array();

		for (var i = 0; i < 5; i++)
		{
			config.combOculta[i] = Math.floor((Math.random()*6)+1);
		}

		this.aux_CombOculta = config.combOculta.slice();
	},
	//Método que hace draggables los colores de la barra superior
	setDraggable: function ()
	{
		$('.dragColor').draggable({revert: "invalid", refreshPositions: true,
			drag: function(event, ui)
			{
				$(this).css("z-index", "2");
			}
	  	});
	},
	//Método que hace droppable las "casillas" de la última fila generada
	setDroppable: function ()
	{
		$('.dropCircle').droppable({
			//Método que opera para cuando se ha inserido un elemento en la "casilla"
	  		drop: function(ev, ui) 
			{
				ui.draggable.remove();
				$(this).css("border-color", "#163C24");
				$(this).css("border-width", "3px");

				var auxNum = parseInt(ui.draggable.find('span')[0].innerText);

				//Se modificará el color y el valor de una "casilla" según el valor del color arrastrado a la misma
				switch(auxNum)
				{
					case 1:
					masterUI.ModificarColorClavija($(this).children(), 1);
					var codeSpan = "<span>1</span>";
					$('<div class="dragColor circleColor colorRed">'+codeSpan+'</div>').appendTo('#divContainerColorRed');
					break;

					case 2:
					masterUI.ModificarColorClavija($(this).children(), 2);
					var codeSpan = "<span>2</span>";
					$('<div class="dragColor circleColor colorBlue">'+codeSpan+'</div>').appendTo('#divContainerColorBlue');
					break;

					case 3:
					masterUI.ModificarColorClavija($(this).children(), 3);
					var codeSpan = "<span>3</span>";
					$('<div class="dragColor circleColor colorGreen">'+codeSpan+'</div>').appendTo('#divContainerColorGreen');					
					break;

					case 4:
					masterUI.ModificarColorClavija($(this).children(), 4);
					var codeSpan = "<span>4</span>";
					$('<div class="dragColor circleColor colorPurple">'+codeSpan+'</div>').appendTo('#divContainerColorPurple');					
					break;

					case 5:
					masterUI.ModificarColorClavija($(this).children(), 5);
					var codeSpan = "<span>5</span>";
					$('<div class="dragColor circleColor colorYellow">'+codeSpan+'</div>').appendTo('#divContainerColorYellow');					
					break;

					case 6:
					masterUI.ModificarColorClavija($(this).children(), 6);
					var codeSpan = "<span>6</span>";
					$('<div class="dragColor circleColor colorGrey">'+codeSpan+'</div>').appendTo('#divContainerColorGrey');					
					break;
				}

				master.setDraggable();
			},
			//Método que opera para cuando se está por encima de la "casilla" mientras se arrastra
			over: function(ev, ui)
			{
				$(this).css("border-color", "white");
				$(this).css("border-width", "7px");
			},
			//Método igual al anterior pero para cuando se sale de encima
			out: function(ev, ui)
			{
				$(this).css("border-color", "#163C24");
				$(this).css("border-width", "3px");
			}
	  });
	}
};