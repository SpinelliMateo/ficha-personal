// ==================== TEMA OSCURO/CLARO ====================

// Función para aplicar el tema
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeButton('☀️');
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeButton('🌙');
    }
}

// Función para actualizar el icono del botón
function updateThemeButton(icon) {
    const themeButton = document.getElementById('theme-toggle');
    if (themeButton) {
        themeButton.textContent = icon;
    }
}

// Cargar tema guardado al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Inicializar el toggle del tema
    initThemeToggle();
    
    // Si estamos en la página de contacto, inicializar validación
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initContactForm();
    }
});

// Inicializar el botón de cambio de tema
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            const newTheme = isDarkMode ? 'light' : 'dark';
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
}

// ==================== VALIDACIÓN DEL FORMULARIO ====================

function initContactForm() {
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const comentariosInput = document.getElementById('comentarios');
    
    // Limpiar errores al escribir
    nombreInput.addEventListener('input', () => clearError('nombre'));
    emailInput.addEventListener('input', () => clearError('email'));
    comentariosInput.addEventListener('input', () => clearError('comentarios'));
    
    // Validar al enviar el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpiar todos los errores previos
        clearAllErrors();
        
        let isValid = true;
        
        // Validar nombre
        const nombre = nombreInput.value.trim();
        if (nombre === '') {
            showError('nombre', 'El nombre completo es obligatorio');
            isValid = false;
        } else if (nombre.length < 3) {
            showError('nombre', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        } else if (!/^[a-záéíóúñü\s]+$/i.test(nombre)) {
            showError('nombre', 'El nombre solo debe contener letras');
            isValid = false;
        }
        
        // Validar email
        const email = emailInput.value.trim();
        if (email === '') {
            showError('email', 'El email es obligatorio');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Por favor ingresa un email válido');
            isValid = false;
        }
        
        // Validar comentarios
        const comentarios = comentariosInput.value.trim();
        if (comentarios === '') {
            showError('comentarios', 'Los comentarios son obligatorios');
            isValid = false;
        } else if (comentarios.length < 10) {
            showError('comentarios', 'Los comentarios deben tener al menos 10 caracteres');
            isValid = false;
        }
        
        // Si todo es válido, mostrar mensaje de éxito
        if (isValid) {
            alert('✅ ¡Mensaje enviado exitosamente!');
            form.reset();
            clearAllErrors();
        }
    });
}

// Función para validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar error
function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '#ef4444';
    }
}

// Función para limpiar un error específico
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '';
    }
}

// Función para limpiar todos los errores
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}