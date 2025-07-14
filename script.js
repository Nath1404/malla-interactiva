function toggleMateria(elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar la(s) materia(s) previa(s) para cursar esta.");
    return;
  }

  if (elem.classList.contains('aprobada')) {
    elem.classList.remove('aprobada');
  } else {
    elem.classList.add('aprobada');
  }

  actualizarDesbloqueos();
}

// Desbloquea solo materias cuyas prerequisitos están 100% aprobadas
function actualizarDesbloqueos() {
  const materias = document.querySelectorAll('.materia');

  materias.forEach(materia => {
    const prerequisitos = obtenerPrerequisitos(materia);

    if (prerequisitos.length === 0) return; // No tiene prerequisitos

    const todosAprobados = prerequisitos.every(id => {
      const previa = document.getElementById(id);
      return previa && previa.classList.contains('aprobada');
    });

    if (todosAprobados) {
      materia.classList.remove('bloqueada');
    }
  });
}

// Revisa en qué materias figura como habilitada esta
function obtenerPrerequisitos(materia) {
  const todas = document.querySelectorAll('.materia');
  const idActual = materia.id;
  const prerequisitos = [];

  todas.forEach(otra => {
    const habilita = otra.dataset.habilita;
    if (habilita) {
      const ids = habilita.split(',').map(s => s.trim());
      if (ids.includes(idActual)) {
        prerequisitos.push(otra.id);
      }
    }
  });

  return prerequisitos;
}
