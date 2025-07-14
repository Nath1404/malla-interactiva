function toggleMateria(elem) {
  // Si la materia está bloqueada, no se puede activar
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar la(s) materia(s) previa(s) para cursar esta.");
    return;
  }

  // Cambiar el estado de la materia (aprobada → cursando → normal → aprobada)
  if (elem.classList.contains('aprobada')) {
    elem.classList.remove('aprobada');
    elem.classList.add('cursando');
  } else if (elem.classList.contains('cursando')) {
    elem.classList.remove('cursando');
  } else {
    elem.classList.add('aprobada');

    // Al aprobar esta, desbloquear las materias que ella habilita
    const dependientes = elem.dataset.habilita;
    if (dependientes) {
      dependientes.split(',').forEach(id => {
        const siguiente = document.getElementById(id.trim());
        if (siguiente && siguiente.classList.contains('bloqueada')) {
          siguiente.classList.remove('bloqueada');
        }
      });
    }
  }

  // Mostrar la info (créditos, tipo, etc.)
  alert(elem.dataset.info);
}
