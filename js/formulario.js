//Este código revisa el formulario de contacto antes de aceptarlo.
// ===== REVISAR EL FORMULARIO =====

// 1. Buscamos las cosas de la página
var formulario = document.getElementById("formulario");
var mensajeVerde = document.getElementById("estado-form");
var campos = formulario.querySelectorAll("input, textarea");

// 2. Esta función revisa UN campo.
//    Devuelve true si está bien y false si está mal.
function revisarCampo(campo) {
    var texto = campo.value.trim();   // lo que escribió, sin espacios al inicio ni al final
    var error = "";                   // si sigue vacío, no hay error

    if (campo.name === "nombre" && texto.length < 2) {
        error = "Escribe tu nombre.";
    }

    if (campo.name === "apellido" && texto.length < 2) {
        error = "Escribe tu apellido.";
    }

    if (campo.name === "celular") {
        var numero = texto.replaceAll(" ", "");   // quitamos los espacios
        if (numero.length !== 10 || numero[0] !== "3" || isNaN(numero)) {
            error = "Escribe un celular de 10 números que empiece por 3.";
        }
    }

    if (campo.name === "correo") {
        if (texto.includes("@") === false || texto.includes(".") === false) {
            error = "Escribe un correo válido, por ejemplo nombre@correo.com.";
        }
    }

    if (campo.name === "mensaje" && texto.length < 10) {
        error = "El mensaje debe tener al menos 10 letras.";
    }

    // Mostramos el error debajo del campo (si no hay error, queda vacío)
    document.getElementById("error-" + campo.name).textContent = error;

    // Marcamos el campo en rojo si tiene error
    if (error === "") {
        campo.setAttribute("aria-invalid", "false");
        return true;
    } else {
        campo.setAttribute("aria-invalid", "true");
        return false;
    }
}

// 3. Cuando la persona sale de un campo, lo revisamos
for (var i = 0; i < campos.length; i++) {
    campos[i].onblur = function () {
        revisarCampo(this);
    };
}

// 4. Cuando la persona presiona "Enviar consulta"
formulario.onsubmit = function (evento) {
    evento.preventDefault();   // evita que la página se recargue

    var hayErrores = false;
    var primerError = null;

    // Revisamos los 5 campos uno por uno
    for (var j = 0; j < campos.length; j++) {
        var estaBien = revisarCampo(campos[j]);

        if (estaBien === false) {
            hayErrores = true;
            if (primerError === null) {
                primerError = campos[j];   // guardamos el primer campo malo
            }
        }
    }

    if (hayErrores) {
        primerError.focus();                       // ponemos el cursor en el primer error
        mensajeVerde.classList.remove("visible");  // escondemos el mensaje verde
    } else {
        mensajeVerde.classList.add("visible");     // mostramos el mensaje verde
        formulario.reset();                        // limpiamos el formulario
    }
}