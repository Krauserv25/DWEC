/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LA INTERFAZ VISUAL DEL JUEGO (FRONT-END)
	AUTOR: IVAN VALERA
*/

var masterUI = 
{
	//Método que muestra las pistas en las clavijas adecuadas (blancas, negras o vacías)
	MostrarPistasEnLista: function()
	{
		//Paso 1: "Dibujar" o mostrar las filas de interacción para que el usuario pueda jugar
		$('.dropCircle').droppable('destroy'); //Destruye el drag&drop activo puesto que sinó sigue operando
		$('.containerListColor').removeClass('dropCircle');

		var auxCode = this.GetCodeToPrepend();

		$('#divPushList').prepend(auxCode);
	},
	//Método que "resetea" la partida borrando el contenido actual
	BorrarListaPistas: function()
	{
		//Paso 1: Esconder el modal
		//Paso 2: Generar nuevo código oculto
		//Paso 3: Restablecer valores tales como la caja rápida y el número de intentos actuales
		//Paso 4: Vaciar el contenido principal donde se encuentran las filas de juego
		//Paso 5: Hacer que los círculos nuevos de juego puedan ser droppables

		$('#finalModal').modal('hide');
		master.GenerarCodigoOculto();
		$('#inputCajaRapida').val("");
		config.currentFilaNum = 1;

		$('#divPushList').empty();

		this.MostrarPistasEnLista();
		master.setDroppable();
	},
	//Método que lee el contenido de la caja rápida y a ser posible, asigna los colores correspondientes
	CapturarCajaRapida: function()
	{
		//Paso 1: Comprobar que la caja de texto contenga unos valores correctos mediante regExp.
		//Paso 2: En caso afirmativo proceder con el paso 3. En caso fallido, mostrar el debido error
		//Paso 3: Leer y asignar el contenido del textbox correspondiente
		//Paso 4: Generar bucle que recorra la cadena carácter por carácter
		//Paso 5: Buscar el selector correspondiente a la clavija a operar
		/*Paso 6: Comprobar el valor siguiente del resultado de la caja rápida y cambiar el color de la clavija 
			según éste (modificarColorClavija())*/
		var pattCajaRapida = /[0-6]{5}/;

		var text = $('#inputCajaRapida').val();
		var result = text.match(pattCajaRapida);

		if (result === null)
		{
			alert("DEBES ESCRIBIR 5 DÍGITOS ENTRE 0 Y 6!");
		}
		else
		{
			utils.alert(result.toString());

			for (var i = 0; i < result.toString().length; i++)
			{
				var selector = $('#divSetColorsFila'+config.currentFilaNum).children().children().eq(i);
				masterUI.ModificarColorClavija(selector, parseInt(result.toString().charAt(i)));
			}

			$('#inputCajaRapida').val("");
		}
	},

	//Método que modifica el color de una clavija determinada
	ModificarColorClavija: function(element, num)
	{
		//Paso 1: Obtener el color según el valor pasado
		//Paso 2: Modificar clase y valor del círculo según el caso
		var color = this.GetColorByNum(num);
		
		element.removeClass().addClass('circleColor '+color);
		element.find('span')[0].innerText = num;
	},
	//Función que devuelve el nombre de la clase con el color adecuado
	GetColorByNum: function(n)
	{
		//Paso 1: Hacer un switch que determine el color según el valor
		//Paso 2: Devolver el resultado

		var auxColor = "";

		switch (n)
		{
			case 1:
			auxColor = "colorRed";
			break;

			case 2:
			auxColor = "colorBlue";
			break;

			case 3:
			auxColor = "colorGreen";
			break;

			case 4:
			auxColor = "colorPurple";
			break;

			case 5:
			auxColor = "colorYellow";
			break;

			case 6:
			auxColor = "colorGrey";
			break;			
		}

		return auxColor;
	},
	//Función que devuelve el código a insertar para una fila de juego
	GetCodeToPrepend: function()
	{
		var auxCurrentFila = "divSetColorsFila"+config.currentFilaNum;
		var auxCurrentPistas = "divPistasFila"+config.currentFilaNum;
		var code = '';
		code += '<div id='+auxCurrentFila+' class="classContainerSetColors">';
		code += '<div class="containerListColor dropCircle"><div class="circleColor"><span>0</span></div></div>';
		code += '<div class="containerListColor dropCircle"><div class="circleColor"><span>0</span></div></div>';
		code += '<div class="containerListColor dropCircle"><div class="circleColor"><span>0</span></div></div>';
		code += '<div class="containerListColor dropCircle"><div class="circleColor"><span>0</span></div></div>';
		code += '<div class="containerListColor dropCircle"><div class="circleColor"><span>0</span></div></div>';
		code += '</div><div class="classDivCurrentIntent"><label class="classLabelsInfo classCurrentIntent">';
		code += config.currentFilaNum+'</label></div>';
		code += '<div id='+auxCurrentPistas+' class="classContainerSetColors">';
		code += this.GetChangeDivPistas();
		code += '</div>';

		return code;
	},
	//Función que devuelve el código a insertar para la parte de pistas
	GetChangeDivPistas: function()
	{
		var code = '';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		
		return code;
	},
	//Método que muestra en un modal el resultado de la partida
	ShowFinalModal: function(text)
	{
		//Paso 1: Vaciar el contenido del modal por si hubiera algo anteriormente
		//Paso 2: Mostrar dicho modal
		//Paso 3: Almacenar en cadena la combinación oculta para mostrarla al usuario
		//Paso 4: Calcular los intentos restantes
		//Paso 5: Generar el código para mostrar y añadirlo
		$('#divInfoResultadoFinal').empty();
		$('#finalModal').modal('show');

		var auxComb = '';
		for (var i = 0; i < config.combOculta.length; i++)
		{
			auxComb += config.combOculta[i];
		}

		var restantes = parseInt($('#labelResultSlider').text() - config.currentFilaNum)

		var code = '';
		code += '<span class="classModalText">'+text+'</span><br /><br /><br />';
		code += '<span class="classModalText">La combinación secreta era: '+auxComb+'</span><br />';
		code += '<span class="classModalText">Número de intentos restantes: '+restantes+'</span><br /><br />';
		code += '<br /><br /><input class="classButtons classRestartGame" type="button" value="VOLVER A JUGAR" />';

		$(code).appendTo('#divInfoResultadoFinal');
	}
};