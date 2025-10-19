
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionamos todos los elementos que funcionan como botones del acordeón.
  // Usamos una consulta que busca cualquier ID que comience con "accordion-button-".
  const accordionButtons = document.querySelectorAll('[id^="accordion-button-"]');

  // Recorremos cada uno de los botones que encontramos.
  accordionButtons.forEach(button => {
    
    // A cada botón le añadimos un "escuchador" para el evento 'click'.
    button.addEventListener('click', () => {
      
      // Obtenemos el número del ID del botón para encontrar su contenido correspondiente.
      // Ejemplo: de "accordion-button-3", extraemos el "3".
      const accordionNumber = button.id.split('-').pop();
      
      // Usamos ese número para encontrar el elemento de contenido por su ID.
      const content = document.getElementById(`accordion-content-${accordionNumber}`);
      
      // Encontramos el ícono (la flecha) que está dentro del botón.
      const icon = button.querySelector('div');

      // Mostramos u ocultamos el contenido.
      // .toggle('hidden') añade la clase si no la tiene, y la quita si ya la tiene.
      content.classList.toggle('hidden');
      
      // Rotamos el ícono 180 grados para indicar el estado (abierto/cerrado).
      icon.classList.toggle('rotate-180');
    });
  });

});