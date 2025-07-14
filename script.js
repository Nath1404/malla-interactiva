function toggleMateria(elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar todas las materias previas para cursar esta.");
    return;
  }

  if (elem.classList.contains('aprobada')) {
    elem.classList.remove('aprobada');
  } else {
    elem.classList.add('aprobada');
  }

  actualizarDesbloqueos();
}

function actualizarDesbloqueos() {
  const todas = document.querySelectorAll('.materia');

  todas.forEach(materia => {
    if (!materia.classList.contains('bloqueada')) return;

    const idActual = materia.id;
    const prerequisitos = encontrarMateriasQueHabilitan(idActual);

    const todosAprobados = prerequisitos.every(id => {
      const previa = document.getElementById(id);
      return previa && previa.classList.contains('aprobada');
    });

    if (todosAprobados) {
      materia.classList.remove('bloqueada');
    }
  });
}

// Esta función devuelve una lista de materias que deben estar aprobadas para desbloquear la actual
function encontrarMateriasQueHabilitan(idMateria) {
  const todas = document.querySelectorAll('.materia');
  const requisitos = [];

  todas.forEach(materia => {
    const habilita = materia.dataset.habilita;
    if (!habilita) return;

    const ids = habilita.split(',').map(s => s.trim());
    if (ids.includes(idMateria)) {
      requisitos.push(materia.id);
    }
  });

  return requisitos;
}
