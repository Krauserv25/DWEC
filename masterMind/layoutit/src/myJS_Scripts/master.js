/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LOS CÁLCULOS DEL JUEGO (BACK-END)
	AUTOR: IVAN VALERA
*/

var master = 
{
	aux_CombOculta: null, // Esta variable auxiliar contendrá la combinación oculta o parte de ella

	//Método que comprueba cuántas fichas de color han sido correctas y bien colocadas
	CuantasOK: function()
	{
		//Paso 1: Generar bucle que recorra cada ficha de color
		//Paso 2: Comprobar si la ficha de color recorrida coincide con la del array
		/*Paso 3: 
			En caso de ser afirmativo:
				- Cambiar clase de la primera pista que esté vacía a la que sea de color negro (correcta) 
				- Excluir del array auxiliar la ficha encontrada
			*/	
	},
	//Método que comprueba cuántas fichas de color han sido correctas pero mal colocadas
	CuantasKO: function()
	{
		//Paso 1: Generar bucle que recorra cada ficha de color
		//Paso 2: Generar bucle que recorra cada ficha del array auxiliar (aux_CombOculta)
		//Paso 3: Comprobar si la ficha de color recorrida coincide con la del array
		/*Paso 4: 
			En caso de ser afirmativo:
				- Cambiar clase de la primera pista que esté vacía a la que sea de color blanco (correcta mal ubicada) 
				- Excluir del array auxiliar la ficha encontrada
			*/		
	},
	//Método que genera una combinación aleatoria de colores para iniciar una partida
	GenerarCodigoOculto: function()
	{
		//Paso 1: Generar bucle que recorra cada clavija oculta
		//Paso 2: Generar dentro del bucle un valor aleatorio entre 1 y 6
		//Paso 3: Asignar el valor aleatorio a la clavija correspondiente
	},
	//Método que modifica el color de una clavija determinada
	ModificarColorClavija: function(id, color)
	{
		//Paso 1: Encontrar la clavija afectada mediante su id
		//Paso 2: Obtener la clase de dicha clavija según su color (checkClassByColor)
		//Paso 3: Asignar dicha clase a la clavija
	},
	//Función que devuelve el nombre de la clase que pertenece a un color en concreto
	CheckClassByColor: function(color)
	{
		//Paso 1: Realizar un selector por color (sitch case)
		//Paso 2: Devolver una clase en concreto según el color
	}
};