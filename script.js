function toggleMateria(elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar la(s) materia(s) previa(s) para cursar esta.");
    return;
  }

  if (elem.classList.contains('aprobada')) {
    elem.classList.remove('aprobada');
  } else {
    elem.classList.add('aprobada');
    desbloquearCascada(elem);
  }

  if (elem.dataset.info) {
    alert(elem.dataset.info);
  }
}

function desbloquearCascada(materia) {
  const dependientes = materia.dataset.habilita;
  if (!dependientes) return;

  dependientes.split(',').forEach(id => {
    const siguiente = document.getElementById(id.trim());
    if (siguiente && siguiente.classList.contains('bloqueada')) {
      siguiente.classList.remove('bloqueada');
      desbloquearCascada(siguiente); // desbloqueo en cadena
    }
  });
}
