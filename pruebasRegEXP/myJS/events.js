/*
	FUNCIÓN: Controla los métodos o funciones necesarias derivadas de eventos que van a producirse en la web
	AUTOR: IVAN VALERA
*/

$(document).ready(function()
{
	cookies.getInfoCookies()

	$('#buttonAceptar').click(function()
	{
		var username = $('#inputUsername').val();
		var tel = $('#inputTel').val();
		var pass = $('#inputPassword').val();
		var dni = $('#inputDNI').val();
		var email = $('#inputEmail').val();
		var fnac = $('#inputF_Nac').val();

		examenFN.getFormInfo(username, tel, pass, dni, email, fnac);
	});	
});