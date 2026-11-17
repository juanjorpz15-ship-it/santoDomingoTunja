//El archivo principal.js hace tres cosas:

//Menú del celular
//El botón “☰ Menú” abre y cierra el menú, y su texto cambia a “✕ Cerrar”.
//El menú también se cierra al tocar un enlace, al presionar Esc o al agrandar la pantalla.
//Fichas de Patrimonio
//Al tocar una ficha, se muestra su cuadro de texto, y al tocarla otra vez se esconde.
//Cada botón sabe cuál cuadro controla gracias a aria-controls.

// ===== MENÚ DEL CELULAR =====

var boton = document.getElementById("boton-menu");
var menu = document.getElementById("menu");

// Cerrar el menú
function cerrarMenu() {
    menu.classList.remove("abierto");
    boton.textContent = "☰ Menú";
}

// Al tocar el botón: abrir o cerrar
boton.onclick = function () {
    if (menu.classList.contains("abierto")) {
        cerrarMenu();
    } else {
        menu.classList.add("abierto");
        boton.textContent = "✕ Cerrar";
    }
};

// Al tocar un enlace del menú: cerrar
var enlaces = menu.querySelectorAll("a");
for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].onclick = cerrarMenu;
}

// Al presionar la tecla Escape: cerrar
document.onkeydown = function (evento) {
    if (evento.key === "Escape") {
        cerrarMenu();
    }
};

// Si la pantalla se hace grande: cerrar
window.onresize = function () {
    if (window.innerWidth > 900) {
        cerrarMenu();
    }
};




var fichas = document.querySelectorAll("button.ficha");

for (var j = 0; j < fichas.length; j++) {
    fichas[j].onclick = function () {
        // Buscamos el cuadro de texto de esta ficha
        var cuadro = document.getElementById(this.getAttribute("aria-controls"));

        // Si está escondido lo mostramos, si no lo escondemos
        if (cuadro.hidden) {
            cuadro.hidden = false;
            this.setAttribute("aria-expanded", "true");
        } else {
            cuadro.hidden = true;
            this.setAttribute("aria-expanded", "false");
        }
    };
}