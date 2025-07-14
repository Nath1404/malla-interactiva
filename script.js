function toggleMateria(elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar la(s) materia(s) previa(s) para cursar esta.");
    return;
  }

  if (elem.classList.contains('aprobada')) {
    elem.classList.remove('aprobada');
    elem.classList.add('cursando');
  } else if (elem.classList.contains('cursando')) {
    elem.classList.remove('cursando');
  } else {
    elem.classList.add('aprobada');

    // Desbloquear todas las materias conectadas en cascada
    desbloquearCascada(elem);
  }

  alert(elem.dataset.info);
}

function desbloquearCascada(materia) {
  const dependientes = materia.dataset.habilita;
  if (!dependientes) return;

  dependientes.split(',').forEach(id => {
    const siguiente = document.getElementById(id.trim());
    if (siguiente && siguiente.classList.contains('bloqueada')) {
      siguiente.classList.remove('bloqueada');
      // Recursivamente desbloquear la siguiente si ya no tiene prerequisitos activos
      desbloquearCascada(siguiente);
    }
  });
}
