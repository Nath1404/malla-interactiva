
function toggleMateria(elem) {
  if (elem.classList.contains('bloqueada')) {
    alert("Debes aprobar la materia previa.");
    return;
  }

  if (elem.classList.contains('aprobada')) {
    elem.classList.remove('aprobada');
    elem.classList.add('cursando');
  } else if (elem.classList.contains('cursando')) {
    elem.classList.remove('cursando');
  } else {
    elem.classList.add('aprobada');
    let dependientes = elem.dataset.habilita;
    if (dependientes) {
      dependientes.split(',').forEach(id => {
        let siguiente = document.getElementById(id.trim());
        if (siguiente) {
          siguiente.classList.remove('bloqueada');
        }
      });
    }
  }

  alert(elem.dataset.info);
}
