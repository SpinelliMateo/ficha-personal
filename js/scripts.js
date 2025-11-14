const btn = document.getElementById('theme-toggle');
const theme = localStorage.getItem('theme');

if (theme === 'dark') {
    document.documentElement.className = 'dark-mode';
    btn.textContent = '◐';
}

btn.onclick = () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    btn.textContent = isDark ? '◐' : '◑';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const form = document.getElementById('contact-form');
if (form) {
    form.onsubmit = (e) => {
        e.preventDefault();
        
        const fields = {
            nombre: { min: 3, msg: 'nombre' },
            apellido: { min: 3, msg: 'apellido' },
            email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'email válido' },
            telefono: { regex: /^[0-9]{8,15}$/, msg: 'teléfono válido (8-15 dígitos)' },
            mensaje: { min: 10, msg: 'mensaje (mín. 10 caracteres)' }
        };
        
        let valid = true;
        
        for (let [id, rule] of Object.entries(fields)) {
            const input = document.getElementById(id);
            const error = document.getElementById(`error-${id}`);
            const val = input.value.trim();
            
            error.textContent = '';
            
            if (!val) {
                error.textContent = `El ${rule.msg} es obligatorio`;
                valid = false;
            } else if (rule.min && val.length < rule.min) {
                error.textContent = `Mínimo ${rule.min} caracteres`;
                valid = false;
            } else if (rule.regex && !rule.regex.test(val)) {
                error.textContent = `Ingresa un ${rule.msg}`;
                valid = false;
            }
        }
        
        if (valid) {
            alert('¡Mensaje enviado exitosamente!');
            form.reset();
        }
    };
    
    form.oninput = (e) => {
        if (e.target.id) {
            document.getElementById(`error-${e.target.id}`).textContent = '';
        }
    };
}