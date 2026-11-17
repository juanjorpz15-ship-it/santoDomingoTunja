//Es el programa de la galería. Cuando tocas una foto, la muestra grande en una ventana encima de la página, con su descripción. Desde ahí puedes:

///ir a la foto anterior o a la siguiente
//cerrarla con el botón, con la tecla Esc o tocando fuera de la foto
//cambiar de foto con las flechas del teclado (← →)
// ===== GALERÍA: VER FOTOS EN GRANDE =====

// 1. Buscamos las cosas de la página
var ventana = document.getElementById("visor");
var fotoGrande = document.getElementById("visor-img");
var texto = document.getElementById("visor-pie");
var fotos = document.querySelectorAll(".galeria figure");

// 2. Aquí guardamos qué foto estamos viendo
//    (0 = primera, 1 = segunda, 2 = tercera...)
var actual = 0;

// 3. Esta función muestra una foto en grande
function mostrarFoto(numero) {
    // Si pasamos de la última, volvemos a la primera
    if (numero >= fotos.length) {
        numero = 0;
    }
    // Si retrocedemos de la primera, vamos a la última
    if (numero < 0) {
        numero = fotos.length - 1;
    }
    actual = numero;

    // Copiamos la foto y el texto a la ventana grande
    var foto = fotos[actual].querySelector("img");
    fotoGrande.src = foto.src;
    fotoGrande.alt = foto.alt;
    texto.textContent = fotos[actual].querySelector("figcaption").innerText;

    // Abrimos la ventana
    ventana.showModal();
}

// 4. Cuando tocan una foto pequeña, la mostramos en grande
function activarFoto(numero) {
    fotos[numero].querySelector("button").onclick = function () {
        mostrarFoto(numero);
    };
}

for (var i = 0; i < fotos.length; i++) {
    activarFoto(i);
}

// 5. Botones de la ventana
document.getElementById("visor-cerrar").onclick = function () {
    ventana.close();
};

document.getElementById("visor-ant").onclick = function () {
    mostrarFoto(actual - 1);
};

document.getElementById("visor-sig").onclick = function () {
    mostrarFoto(actual + 1);
};

// 6. Si tocan el fondo oscuro, se cierra
ventana.onclick = function (evento) {
    if (evento.target === ventana) {
        ventana.close();
    }
};