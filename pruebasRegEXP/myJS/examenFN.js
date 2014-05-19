/*
	FUNCIÓN: Controla los métodos o funciones básicas o principales de la web
	AUTOR: IVAN VALERA
*/

var examenFN =
{
	getFormInfo: function(username, tel, pass, dni, email, fnac)
	{
		var auxUserValid = validationsRegExp.validateUserName(username);
		examenFN_UI.changeInputColor($('#inputUsername'), auxUserValid);

		var auxTelValid = validationsRegExp.validateTel(tel);
		examenFN_UI.changeInputColor($('#inputTel'), auxTelValid);

		var auxPasswordValid = validationsRegExp.validatePassword(pass);
		examenFN_UI.changeInputColor($('#inputPassword'), auxPasswordValid);

		var auxDNIValid = validationsRegExp.validateDNI(dni);
		examenFN_UI.changeInputColor($('#inputDNI'), auxDNIValid);

		var auxEmailValid = validationsRegExp.validateEmail(email);
		examenFN_UI.changeInputColor($('#inputEmail'), auxEmailValid);	

		var auxFnacValid = validationsRegExp.validateF_Nac(fnac);
		examenFN_UI.changeInputColor($('#inputF_Nac'), auxFnacValid);
			

		if (auxUserValid && auxTelValid && auxPasswordValid && auxDNIValid && auxEmailValid && auxFnacValid) 
		{
			var auxPersona = new persona(username, tel, pass, dni, email, fnac);
			config.allPersonas.push(auxPersona);
			examenFN_UI.setInfoPersonas(auxPersona);
			cookies.setInfoCookies();
		}
	}
};