$(document).ready(function() {
	//
	if ($.cookie('el_cookie') == undefined) {
		//a login
		//alert("No tienes token");
	}else{
		window.location.replace("http://cliente-diversius-nohtrim.c9users.io/private");
	}	
	//
	//yo guardo el token en una variable... tu lo guardarías en la session del cliente
	var token = "";

	//login de usuarios
	$('#login').submit(function(event) {
		console.log("intento de login");
		event.preventDefault();
		var data = $(this).serializeArray();

		$.ajax({
			url: 'https://retodiversius-nohtrim.c9users.io/auth/login',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function (data) {
				if(data.error){
					alert(data.error);
				} else {
					token = data.token;
					//alert("token "+token);//enseñamos el token que ha mandado la api y lo guardo en la variable
					$.cookie('el_cookie', token);
					window.location.replace("http://cliente-diversius-nohtrim.c9users.io/private");
				}
			}
		})
		.fail(function() {
			console.log("error en el login");
		});	
	});


	//para entrar en una página privada
	$('#privado').click(function(event) {
		//si localmente no tengo el token hay que hacer login
		console.log("lalal "+$.cookie('el_cookie'));
		if ($.cookie('el_cookie') == undefined) {
			//a login
			//alert("No tienes token");
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
			});	
		}
	});

});