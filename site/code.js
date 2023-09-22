window.onload = function () {

    $('#onload').fadeOut();
    $('body').removeClass('no-scroll')
}

// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtén referencias a los elementos del formulario
    const ventaForm = document.getElementById("ventaForm");
    const productoInput = document.getElementById("producto");
    const cantidadInput = document.getElementById("cantidad");
    const precioInput = document.getElementById("precio");
    const ivaCheckbox = document.getElementById("flexCheckDefault");
    const ventasTableBody = document.getElementById("ventasTableBody");

    // Array para almacenar las ventas
    const ventas = [];

    // Función para calcular el total de la venta
    function calcularTotal(precio, cantidad) {
        const subtotal = precio * cantidad;
        const ivaPorcentaje = ivaCheckbox.checked ? 0.19 : 0;
        const iva = subtotal * ivaPorcentaje;
        const total = subtotal + iva;
        return total.toFixed(2); // Redondear a 2 decimales
    }

    // Función para agregar una venta a la tabla
    function agregarVenta(producto, cantidad, precio, total) {
        const fecha = new Date().toLocaleDateString();
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${producto}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            <td>${total}</td>
            <td>${fecha}</td>
        `;
        ventasTableBody.appendChild(newRow);
    }

    // Manejador de evento para el envío del formulario
    ventaForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita la recarga de la página

        // Obtén los valores ingresados por el usuario
        const producto = productoInput.value;
        const cantidad = parseFloat(cantidadInput.value);
        const precio = parseFloat(precioInput.value);

        // Validación básica
        if (isNaN(cantidad) || isNaN(precio) || producto.trim() === "") {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        // Calcula el total de la venta
        const totalVenta = calcularTotal(precio, cantidad);

        // Agrega la venta al array
        ventas.push({
            producto,
            cantidad,
            precio,
            total: totalVenta,
        });

        // Agrega la venta a la tabla
        agregarVenta(producto, cantidad, precio, totalVenta);

        // Limpia los campos del formulario
        productoInput.value = "";
        cantidadInput.value = "";
        precioInput.value = "";

        // Muestra un mensaje de confirmación
        alert("Venta registrada con éxito.");
    });
});




