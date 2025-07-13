function toggleEstado(element) {
  if (element.classList.contains("aprobada")) {
    element.classList.remove("aprobada");
    element.classList.add("cursando");
  } else if (element.classList.contains("cursando")) {
    element.classList.remove("cursando");
  } else {
    element.classList.add("aprobada");
  }

  alert(element.dataset.info);
}
