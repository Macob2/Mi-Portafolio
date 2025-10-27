// --- 0. Ejecutar cuando el DOM esté listo ---
// Usamos DOMContentLoaded para asegurar que el HTML está cargado
// antes de intentar seleccionar elementos.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lógica de la Barra Lateral (Sidebar) ---
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');

    if (toggleButton) {
        // Evento click en el botón de colapsar
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // --- 2. Lógica de Navegación Activa (Scrollspy) ---
    // Resalta el enlace de la sección visible
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

    const activateNavLink = () => {
        let index = sections.length;

        // Recorre las secciones desde abajo hacia arriba
        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100px de offset

        // Quita la clase 'active' de todos los enlaces
        navLinks.forEach((link) => link.classList.remove('active'));
        
        // Añade 'active' solo al enlace correspondiente
        if (navLinks[index]) {
             navLinks[index].classList.add('active');
        }
    };

    // Activar al cargar la página y al hacer scroll
    activateNavLink();
    window.addEventListener('scroll', activateNavLink);

    // --- 3. Lógica de Animaciones al Hacer Scroll ---
    // Usa IntersectionObserver para animar elementos cuando entran en la vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento está intersectando (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        threshold: 0.1 // Activar cuando el 10% del elemento es visible
    });

    // Observar todos los elementos con la clase '.animar'
    document.querySelectorAll('.animar').forEach(element => {
        observer.observe(element);
    });

});


// --- 4. Eventos de la Lista de Cotejo (usando 'this') ---
// Estas funciones se llaman directamente desde el HTML (onclick, onmouseover, etc.)

/**
 * Item 10: Evento onclick en las tarjetas de proyecto.
 * Abre el enlace del repositorio en una nueva pestaña.
 * @param {HTMLElement} element - El elemento (this) que recibió el clic.
 */
function handleClick(element) {
    const link = element.dataset.link; // Obtiene 'data-link' del HTML
    if (link) {
        window.open(link, '_blank');
    }
}

/**
 * Item 8 y 13: Evento onmouseover en las tarjetas de proyecto.
 * Cambia el estilo del borde y la sombra.
 * @param {HTMLElement} element - El elemento (this) sobre el que está el cursor.
 */
function handleMouseOver(element) {
    // 'this' (pasado como 'element') se refiere a la .card-proyecto
    element.style.borderColor = 'var(--color-medium-blue)';
    element.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'; // Aumentar sombra
}

/**
 * Item 9: Evento onmouseout en las tarjetas de proyecto.
 * Restaura el estilo original del borde y la sombra.
 * @param {HTMLElement} element - El elemento (this) del que salió el cursor.
 */
function handleMouseOut(element) {
    // 'this' (pasado como 'element') se refiere a la .card-proyecto
    element.style.borderColor = 'transparent'; // Restaurar borde
    element.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)'; // Sombra original
}

/**
 * Item 11: Evento onchange en el input de email.
 * Valida el formato del correo.
 * @param {HTMLInputElement} input - El input (this) que cambió.
 */
function validateEmail(input) {
    // 'this' (pasado como 'input') se refiere al input#email
    const email = input.value;
    const validationMessage = document.getElementById('validation-message');
    
    if (email && !email.includes('@')) {
        validationMessage.textContent = 'Por favor, introduce un correo válido.';
        validationMessage.style.color = 'red';
    } else if (email) {
        validationMessage.textContent = 'Formato de correo correcto.';
        validationMessage.style.color = 'green';
    } else {
        validationMessage.textContent = '';
    }
}

/**
 * Maneja el envío del formulario de contacto.
 * @param {Event} event - El evento de envío del formulario.
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const validationMessage = document.getElementById('validation-message');

    // Simular envío
    submitButton.innerHTML = '<i class="fa-solid fa-check me-2"></i> ¡Enviado!';
    submitButton.disabled = true;

    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
         submitButton.innerHTML = 'Enviar Mensaje';
         submitButton.disabled = false;
         contactForm.reset(); // Limpiar formulario
         validationMessage.textContent = ''; // Limpiar validación
    }, 3000);
}