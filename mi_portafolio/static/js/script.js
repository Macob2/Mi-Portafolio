// 10. Función para evento onclick (modularidad básica, Ítem 15)
function cambiarTexto(elemento) {
    // Usamos 'this' (pasado como 'elemento') para afectar el propio elemento.
    if (elemento.innerText === "Conocer Servicios") {
        elemento.innerText = "¡Contratar Ahora!";
        elemento.classList.remove('btn-primary');
        elemento.classList.add('btn-success');
    } else {
        elemento.innerText = "Conocer Servicios";
        elemento.classList.remove('btn-success');
        elemento.classList.add('btn-primary');
    }
}

// 8, 9. Funciones para onmouseover / onmouseout (hover con JS, Ítem 13)
function cambiarFondo(elemento, esOver) {
    // Usamos 'this' (pasado como 'elemento') para cambiar el fondo de la tarjeta.
    if (esOver) {
        elemento.style.backgroundColor = '#f0f0f0'; // Gris claro al pasar el mouse
    } else {
        elemento.style.backgroundColor = 'white'; // Blanco al salir
    }
}

// 11. Función para evento onchange
function mostrarSeleccion(selectElemento) {
    // Usamos 'this' (pasado como 'selectElemento') para capturar el valor
    const valor = selectElemento.value;
    const outputBtn = document.getElementById('output-btn');
    
    if (valor === 'default') {
        outputBtn.innerText = 'Nada seleccionado.';
        outputBtn.disabled = true;
    } else {
        outputBtn.innerText = `Has seleccionado: ${valor}`;
        outputBtn.disabled = false;
    }
}

// 14. Función para remover dinámicamente elementos del DOM
function removerTarjeta(boton) {
    // Usamos 'this' (pasado como 'boton') para encontrar el elemento padre (la tarjeta)
    const tarjeta = boton.closest('.col');
    if (tarjeta) {
        // Remover la tarjeta del DOM
        tarjeta.remove();
        console.log("Tarjeta de proyecto removida dinámicamente.");
    }
}