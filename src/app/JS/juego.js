var historial = Array();

var pulsado = Array();

var jugando = false;

$(document).ready(function () {

    $("input[type=button]").click(function () {

        historial = Array();

        nuevoMovimiento();
    });

    $("#simon div").click(function () {
        if (jugando) {

            pulsado.push($(this).index());

            verificacion = verificarPulsacion();

            if (verificacion == 1) {

                nuevoMovimiento();
            } else if (verificacion == 0) {

                mostrarError();
            }
        }
    });
});

function nuevoMovimiento() {
    jugando = false;
    $("#mensaje").html("Mostrando los colores...");
    pulsado = Array();
    var nuevoMovimiento = Math.floor(Math.random() * 4)
    historial.push(nuevoMovimiento);
    $("#movimientos").html(historial.length);
    mostrarColores(0);
}

function mostrarColores(indice) {
    $("#simon div").removeClass("showColor")
    if (historial[indice] >= 0) {
        $("#simon div:nth-child(" + (historial[indice] + 1) + ")").addClass("showColor");
        setTimeout(function () { ocultarColores(indice + 1) }, 800);
    } else {
        jugando = true;
        $("#mensaje").html("Ya puedes empezar...");
    }
}

function ocultarColores(indice) {
    $("#simon div").removeClass("showColor")
    setTimeout(function () { mostrarColores(indice) }, 500);
}

function verificarPulsacion() {
    for (var i = 0; i < historial.length; i++) {
        if (pulsado.length > i) {
            if (historial[i] != pulsado[i]) {
                return 0;
            }
        } else {
            return 2;
        }
    }

    if (pulsado.length == historial.length)
        return 1;
    return 2;
}

function mostrarError() {
    var colores = ["verde", "rojo", "amarillo", "azul"];
    var cadenaColores = " | ";
    var cadenaColoresPulsados = " | ";

    for (var i = 0; i < historial.length; i++) {
        cadenaColores += colores[historial[i]] + " | ";
    }
    for (var i = 0; i < pulsado.length; i++) {
        cadenaColoresPulsados += colores[pulsado[i]] + " | ";
    }
    alert("te has equivocado, los colores eran: " + cadenaColores)
    alert("usted ha pulsado: " + cadenaColoresPulsados)
}