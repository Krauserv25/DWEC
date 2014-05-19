/*
	FUNCIÓN: Controla los métodos o funciones necesarios para validar con expresiones regulares
	AUTOR: IVAN VALERA
*/

var validationsRegExp =
{
	validateUserName: function(username)
	{
		/*
			V a)Empieza por user_
			V b)Permite case-sensitive
			V c)Alterna dígitos del 0 al 9 y letras de la A a la Z
		
			a) /^user_     ===> Indica que el texto debe empezar por "user_" 
			b) (?=)		   ===> Indica que el texto que irá tras la cadena que ha sido escrita antes 
					de esta expresión (user_) debe ser el que pongamos después del igual
			c) [0-9A-Za-z] ===> Indica que permite cualquier carácter alfanumérico y en case sensitive
		*/

		var patternUsername = /^user_(?=[0-9A-Za-z]{0,5})/g;
		return patternUsername.test(username);
	},
	validateTel: function(tel)
	{
		/*
			a)Solo permite tener dígitos del 0 al 9
			b)Debe empezar por 93
		*/

		var patternTel = /^93(?=[0-9]{7})/g;
		return patternTel.test(tel);		
	},
	validatePassword: function(pass)
	{
		/*
			a)Debe tener al menos 3 caracteres
			b)Alterna dígitos del 0 al 9 y letras de la A a la Z
			c)NO es case sensitive por lo que los caracteres no se diferencian entre mayúsculas y minúsculas
		*/

		var patternPass = /[0-9A-Za-z]{3}/gi;
		return patternPass.test(pass);		
	},
	validateDNI: function(dni)
	{
		//38876320-H
		/*
			a)Debe empezar por 8 dígitos
			b)Debe terminar en -Letra mayúscula
		*/

		var patternDNI = /^[0-9]{8}-[A-Z]$/g;
		return patternDNI.test(dni);		
	},
	validateEmail: function(email)
	{
		//hola@gmail.com
		/*
			a)Empieza con una serie de caracteres antes de un @
			b)Debe contener la palabra gmail o hotmail
			c)Debe terminar en .com
		*/

		var patternEmail = /^[0-9A-Za-z]+(?=@{1}(?=gmail.com|hotmail.com))/g;
		return patternEmail.test(email);		
	}
};