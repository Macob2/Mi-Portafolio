document.addEventListener('DOMContentLoaded', () => {

    const sidebar = document.getElementById('barra-lateral');
    const toggleButton = document.getElementById('interruptor-barra-lateral');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('colapsado');
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-barra-lateral .enlace-nav');

    const activarEnlaceNav = () => {
        let index = sections.length;
        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} 
        navLinks.forEach((link) => link.classList.remove('activo'));
        if (navLinks[index]) {
             navLinks[index].classList.add('activo');
        }
    };
    activarEnlaceNav();
    window.addEventListener('scroll', activarEnlaceNav);

    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        delay: 500 
    });
    
    heroTimeline
    .add({
        targets: '.saludo-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    })
    .add({
        targets: '.titulo-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600') 
    .add({
        targets: '.subtitulo-hero', 
        opacity: [0, 1],
        duration: 500
    }, '-=600')
    .add({
        targets: '.descripcion-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.botones-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.contenedor-logos-tech', 
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.contenedor-estatico-tech', 
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000
    }, '-=600');

    heroTimeline.finished.then(iniciarEscritura);

    anime({
        targets: '#inicio .btn-principal',
        scale: [1, 1.03], 
        boxShadow: [
            '0 0 0 0 rgba(95, 125, 155, 0.4)',
            '0 0 0 12px rgba(95, 125, 155, 0)'
        ],
        duration: 2500,
        easing: 'easeOutExpo',
        loop: true,
        delay: 2000 
    });

    function iniciarEscritura() {
        const typingElement = document.getElementById('subtitulo-escribiendo');
        if (typingElement) {
            const textToType = typingElement.getAttribute('data-text');
            let index = 0;
            typingElement.innerHTML = ''; 
            
            function type() {
                if (index < textToType.length) {
                    typingElement.innerHTML += textToType.charAt(index);
                    index++;
                    setTimeout(type, 80); 
                } else {
                    typingElement.innerHTML += '<span class="cursor-escribiendo">|</span>';
                }
            }
            type(); 
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [30, 0],
                    scale: [0.98, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: entry.target.dataset.delay || 0
                });
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 
    });

    document.querySelectorAll('.animar').forEach(element => {
        observer.observe(element);
    });

});

function manejarClick(element) {
    const link = element.dataset.link; 
    if (link) {
        window.open(link, '_blank');
    }
}

function manejarMouseSobre(element) {
    element.style.borderColor = 'var(--color-medium-blue)';
    element.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'; 
}

function manejarMouseFuera(element) {
    element.style.borderColor = 'transparent'; 
    element.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)'; 
}

function validarEmail(input) {
    const email = input.value;
    const validationMessage = document.getElementById('mensaje-validacion');
    
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

function manejarEnvioFormulario(event) {
    event.preventDefault(); 
    
    const contactForm = document.getElementById('formulario-contacto');
    const submitButton = document.getElementById('boton-enviar');
    const validationMessage = document.getElementById('mensaje-validacion');

    submitButton.innerHTML = '<i class="fa-solid fa-check me-2"></i> ¡Enviado!';
    submitButton.disabled = true;

    setTimeout(() => {
         submitButton.innerHTML = 'Enviar Mensaje';
         submitButton.disabled = false;
         contactForm.reset(); 
         if(validationMessage) {
            validationMessage.textContent = ''; 
         }
    }, 3000);
}