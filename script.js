function toggleMateria(elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar todas las materias previas para cursar esta.");
    return;
  }

  // Alternar estado de aprobación
  const yaEstabaAprobada = elem.classList.contains('aprobada');

  if (yaEstabaAprobada) {
    elem.classList.remove('aprobada');
  } else {
    elem.classList.add('aprobada');
  }

  // Recalcular desbloqueos y bloqueos en cascada
  recalcularMalla();
}

function recalcularMalla() {
  const todas = document.querySelectorAll('.materia');

  // Primero, bloquear todo lo que no cumple con sus prerequisitos
  todas.forEach(materia => {
    const prerequisitos = encontrarMateriasQueHabilitan(materia.id);
    if (prerequisitos.length === 0) return;

    const todosAprobados = prerequisitos.every(id => {
      const previa = document.getElementById(id);
      return previa && previa.classList.contains('aprobada');
    });

    if (!todosAprobados) {
      materia.classList.add('bloqueada');
      materia.classList.remove('aprobada'); // Desaprobar si fue desbloqueada antes por error
    }
  });

  // Luego, desbloquear las materias que sí cumplen
  todas.forEach(materia => {
    const prerequisitos = encontrarMateriasQueHabilitan(materia.id);
    if (prerequisitos.length === 0) return;

    const todosAprobados = prerequisitos.every(id => {
      const previa = document.getElementById(id);
      return previa && previa.classList.contains('aprobada');
    });

    if (todosAprobados) {
      materia.classList.remove('bloqueada');
    }
  });
}

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
