// Array global para almacenar tareas en memoria
let tareas = [];

/**
 * Guarda una nueva tarea
 */
function guardarTarea() {
    // Obtener valores del formulario
    const titulo = document.getElementById('taskTitle').value.trim();
    const fecha = document.getElementById('taskDate').value;
    const descripcion = document.getElementById('taskDescription').value.trim();
    
    // Validar
    if (!titulo || !fecha) {
        alert('Completa título y fecha');
        return;
    }
    
    // Crear objeto tarea
    const nuevaTarea = {
        id: Date.now(),
        titulo: escapeHTML(titulo),
        fecha: fecha,
        descripcion: escapeHTML(descripcion),
        usuario: sessionStorage.getItem('usuario')
    };
    
    // Guardar en localStorage
    guardarTareaEnStorage(nuevaTarea);
    
    // Recargar y mostrar tareas
    cargarTareas();
    
    // Limpiar formulario
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskTitle').focus();
}

/**
 * Carga y muestra las tareas
 */
function cargarTareas() {
    // Obtener tareas del storage
    tareas = obtenerTareasDelStorage();
    
    // Mostrar tareas
    mostrarTareas();
}

/**
 * Muestra las tareas en la página
 */
function mostrarTareas() {
    const container = document.getElementById('tasksContainer');
    const emptyState = document.getElementById('emptyState');
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Verificar si hay tareas
    if (tareas.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    // Ocultar mensaje vacío
    emptyState.style.display = 'none';
    
    // Ordenar por fecha (más reciente primero)
    tareas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Crear y agregar cada tarea
    tareas.forEach(tarea => {
        const tareaElement = crearElementoTarea(tarea);
        container.appendChild(tareaElement);
    });
}

/**
 * Crea el elemento HTML para una tarea
 */
function crearElementoTarea(tarea) {
    const div = document.createElement('div');
    div.className = 'card mb-2';
    
    // Formatear fecha
    const fechaFormateada = new Date(tarea.fecha).toLocaleDateString('es-ES');
    
    div.innerHTML = `
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="card-title mb-1">${tarea.titulo}</h6>
                    <small class="text-muted">${fechaFormateada}</small>
                    <p class="card-text mt-2 mb-0">${tarea.descripcion || ''}</p>
                </div>
                <button class="btn btn-sm btn-danger" onclick="eliminarTarea(${tarea.id})">
                    X
                </button>
            </div>
        </div>
    `;
    
    return div;
}

/**
 * Elimina una tarea
 */
function eliminarTarea(id) {
    if (!confirm('¿Eliminar esta tarea?')) {
        return;
    }
    
    // Eliminar del array en memoria
    tareas = tareas.filter(tarea => tarea.id !== id);
    
    // Actualizar localStorage
    actualizarTareasEnStorage(tareas);
    
    // Volver a mostrar tareas
    mostrarTareas();
}