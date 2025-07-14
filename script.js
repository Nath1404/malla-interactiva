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

function actualizarDesbloqueos() {
  const todas = document.querySelectorAll('.materia');

  todas.forEach(materia => {
    if (!materia.classList.contains('bloqueada')) return;

    const id = materia.id;
    const prerequisitos = obtenerRequisitos(id);

    const aprobadas = prerequisitos.filter(pid => {
      const previa = document.getElementById(pid);
      return previa && previa.classList.contains('aprobada');
    });

    if (aprobadas.length === prerequisitos.length && prerequisitos.length > 0) {
      materia.classList.remove('bloqueada');
    }
  });
}

// Encuentra qué materias habilitan a la materia con este id
function obtenerRequisitos(idMateria) {
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
