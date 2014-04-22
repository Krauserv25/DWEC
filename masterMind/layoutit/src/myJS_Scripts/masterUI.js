/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LA INTERFAZ VISUAL DEL JUEGO (FRONT-END)
	AUTOR: IVAN VALERA
*/

var masterUI = 
{
	//Método que muestra las pistas en las clavijas adecuadas (blancas, negras o vacías)
	MostrarPistasEnLista: function()
	{
		//Paso 1: "Dibujar" o mostrar la parte correspondiente a las pistas
		//var auxCodePistas = this.GetChangeDivPistas();

		//$('.classChangePistas').empty();
		//$('.classChangePistas').append(auxCodePistas);
		//$('.classChangePistas').removeClass('classChangePistas');

		var auxCode = this.GetCodeToPrepend();

		$('#divPushList').prepend(auxCode);

		//Paso 2: Llamar a las funciones master.CuantasOK() y master.CuantasKO() para modificar la clase
				//las pistas en las clavijas según el tipo de aciertos
	},
	//Método que "resetea" la partida borrando el contenido actual
	BorrarListaPistas: function()
	{
		//Paso 1: Generar bucle que recorra cada uno de los divs existentes
		//Paso 2: Borrar todos ellos
	},
	//Método que lee el contenido de la caja rápida y a ser posible, asigna los colores correspondientes
	CapturarCajaRapida: function()
	{
		//Paso 1: Comprobar que la caja de texto contenga unos valores correctos.
		//Paso 2: En caso afirmativo proceder con el paso 3. En caso fallido, mostrar el debido error

		//Paso 3: Leer y asignar el contenido del textbox correspondiente
		//Paso 4: Generar bucle que recorra la cadena carácter por carácter
		//Paso 5: Convertir carácter en entero y añadir a un array auxiliar
		//Paso 6: Generar bucle que recorra cada clavija de usuario (interacción)
		/*Paso 7: Comprobar el valor asignado al array auxiliar anterior y cambiar el color de la clavija 
			según éste (modificarColorClavija())*/
	},
	//Función que verifica si la caja rápida contiene los datos correctos para realizar una operación
	ComprobarErroresCajaRapida: function()
	{
		//Paso 1: Leer y asignar el contenido del textbox correspondiente
		//Paso 2: Generar bucle que recorra la cadena carácter por carácter
		//Paso 3: Comprobar que éste sea mayor o igual a 1 y menor o igual a 6
		//Paso 4: Devolver true si es correcto o false en caso incorrecto
	},
	GetCodeToPrepend: function()
	{
		var code = '';
		code += '<div class="row clearfix"><div id="divSetColors1" class="col-md-5 column classContainerSetColors">';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '</div><div class="col-md-2 column"><label class="classLabelsInfo">2</label></div>';
		code += '<div class="col-md-5 column classContainerSetColors">';
		code += this.GetChangeDivPistas();
		code += '</div></div>';

		return code;
	},
	GetChangeDivPistas: function()
	{
		var code = '';
		code += '<div class="containerListColor"><div class="circleColor colorWhite"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor colorWhite"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor colorBlack"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		code += '<div class="containerListColor"><div class="circleColor"></div></div>';
		
		return code;
	}
};