/**
 * Inicia sesión con el nombre de usuario
 */
function iniciarSesion() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Ingresa tu nombre');
        return;
    }
    
    // Guardar en sessionStorage
    sessionStorage.setItem('usuario', username);
    
    // Redirigir a la agenda
    window.location.href = 'agenda.html';
}

/**
 * Verifica si hay una sesión activa
 */
function verificarSesion() {
    const usuario = sessionStorage.getItem('usuario');
    
    if (!usuario) {
        window.location.href = 'index.html';
        return;
    }
    
    // Mostrar nombre de usuario
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = usuario;
    }
}

/**
 * Cierra la sesión del usuario
 */
function cerrarSesion() {
    if (confirm('¿Cerrar sesión?')) {
        sessionStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
}