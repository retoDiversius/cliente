$(document).ready(function() {
	if ($.cookie('el_cookie') == undefined) {
		alert("No tienes token");
		//redireccion a login
		window.location.replace("http://cliente-diversius-nohtrim.c9users.io");
	}else{
		$.ajax({
			url: 'https://retodiversius-nohtrim.c9users.io/private',
			type: 'get',
			dataType: 'html',
			//esto es lo IMPORTANTE añadir el atributo headers que es un objeto con el atributo 'x-access-token' (lo mismo que en el servidor) + el valor del token guardado
			headers:{
				'x-access-token':$.cookie('el_cookie')
			},
			success: function (data) {
				//alert(data);//la api me devuelve el _id de usuario que ha decodificado desde el token enviado 
			}
		})
		.fail(function() {
			console.log("error");
		})
	}
	
	//Cerrar session
	$('#cerrar_sesion').click(function(event) {
		$.removeCookie('el_cookie');
		window.location.replace("http://cliente-diversius-nohtrim.c9users.io");
	});
});