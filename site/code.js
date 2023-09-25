window.onload = function () {

    $('#onload').fadeOut();
    $('body').removeClass('no-scroll')
}

// Función para registrar una venta
function registrarVenta(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener los valores de los campos del formulario
    const producto = document.getElementById('producto').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const ivaCheckbox = document.getElementById('flexCheckDefault');
    const iva = ivaCheckbox.checked ? 0.19 : 0; // Si el checkbox está marcado, aplicar IVA

    // Calcular el total
    const total = cantidad * precio * (1 + iva);

    // Obtener la fecha actual
    const fecha = new Date().toLocaleDateString();

    // Crear una nueva fila para la tabla de ventas
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total.toFixed(2)}</td>
        <td>${fecha}</td>
    `;

    // Agregar la nueva fila a la tabla de ventas
    const ventasTableBody = document.getElementById('ventasTableBody');
    ventasTableBody.appendChild(newRow);

    // Actualizar el gran total
    actualizarGranTotal(total);

    // Limpiar los campos del formulario
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
    ivaCheckbox.checked = false;
}

// Función para eliminar un producto de la tabla de ventas
function eliminarProducto() {
    // Implementa la lógica para eliminar un producto de la tabla aquí
}

// Función para actualizar el gran total
function actualizarGranTotal(nuevaVentaTotal) {
    const granTotalInput = document.getElementById('Gran');
    const granTotalAnterior = parseFloat(granTotalInput.value);
    const nuevoGranTotal = granTotalAnterior + nuevaVentaTotal;
    granTotalInput.value = nuevoGranTotal.toFixed(2);
}

// Función para exportar a Excel
function exportarExcel() {
    // Implementa la lógica para exportar a Excel aquí
}

// Agregar un evento 'submit' al formulario para registrar ventas
const ventaForm = document.getElementById('ventaForm');
ventaForm.addEventListener('submit', registrarVenta);


    // Función para calcular y mostrar el gran total
    function calcularGranTotal() {
        var filas = document.querySelectorAll("#ventasTableBody tr");
        var granTotal = 0;

        filas.forEach(function (fila) {
            var cantidad = parseFloat(fila.querySelector("td:nth-child(2)").textContent);
            var precio = parseFloat(fila.querySelector("td:nth-child(3)").textContent);
            var total = cantidad * precio;

            granTotal += total;
        });

        // Verifica si se debe agregar el IVA (19%)
        var ivaCheckbox = document.getElementById("flexCheckDefault");
        if (ivaCheckbox.checked) {
            granTotal *= 1.19; // Aplicar el 19% de IVA
        }

        // Actualiza el campo de entrada con el gran total
        var granTotalInput = document.getElementById("Gran");
        granTotalInput.value = granTotal.toFixed(2); // Redondea a 2 decimales
    }

    // Llama a la función cuando la página se carga y cada vez que se agrega una nueva venta
    document.addEventListener("DOMContentLoaded", calcularGranTotal);

