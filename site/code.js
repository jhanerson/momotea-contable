window.onload = function () {

    $('#onload').fadeOut();
    $('body').removeClass('no-scroll')
}

// Variables para llevar un registro de la suma total
let sumaTotal = 0;

// Agrega un evento de envío al formulario
ventaForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que se envíe el formulario

    // Obtiene los valores de los campos de entrada
    const producto = document.getElementById('producto').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value); // Convierte a número
    const precio = parseFloat(document.getElementById('precio').value); // Convierte a número

    // Calcula el total para esta fila
    const total = cantidad * precio;

    // Actualiza la suma total
    sumaTotal += total;

    // Crea una nueva fila en la tabla con los valores ingresados y el total
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${producto}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td>${total}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>${sumaTotal}</td>`; // Muestra la suma total



    // Agrega la nueva fila a la tabla
    ventasTableBody.appendChild(newRow);

    // Resetea los valores de los campos de entrada
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
});
