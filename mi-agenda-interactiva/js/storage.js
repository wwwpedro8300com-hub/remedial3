/**
 * Guarda una tarea en localStorage
 */
function guardarTareaEnStorage(tarea) {
    let tareas = obtenerTareasDelStorage();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

/**
 * Obtiene todas las tareas del usuario actual desde localStorage
 */
function obtenerTareasDelStorage() {
    const usuarioActual = sessionStorage.getItem('usuario');
    const tareasGuardadas = localStorage.getItem('tareas');
    
    if (!tareasGuardadas) {
        return [];
    }
    
    const todasTareas = JSON.parse(tareasGuardadas);
    return todasTareas.filter(tarea => tarea.usuario === usuarioActual);
}

/**
 * Elimina una tarea del localStorage por ID
 */
function eliminarTareaDelStorage(id) {
    const usuarioActual = sessionStorage.getItem('usuario');
    const tareasGuardadas = localStorage.getItem('tareas');
    
    if (!tareasGuardadas) return;
    
    let todasTareas = JSON.parse(tareasGuardadas);
    
    // Filtrar para eliminar la tarea específica del usuario actual
    todasTareas = todasTareas.filter(tarea => 
        !(tarea.id === id && tarea.usuario === usuarioActual)
    );
    
    localStorage.setItem('tareas', JSON.stringify(todasTareas));
}

/**
 * Actualiza todas las tareas en localStorage
 */
function actualizarTareasEnStorage(tareas) {
    const usuarioActual = sessionStorage.getItem('usuario');
    const tareasGuardadas = localStorage.getItem('tareas');
    
    let todasTareas = [];
    if (tareasGuardadas) {
        todasTareas = JSON.parse(tareasGuardadas);
        
        // Eliminar tareas antiguas del usuario actual
        todasTareas = todasTareas.filter(tarea => tarea.usuario !== usuarioActual);
    }
    
    // Agregar las nuevas tareas
    todasTareas = [...todasTareas, ...tareas];
    
    localStorage.setItem('tareas', JSON.stringify(todasTareas));
}