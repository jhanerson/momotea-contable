window.onload = function () {

    $('#onload').fadeOut();
    $('body').removeClass('no-scroll')
}
// Función para calcular el Gran Total
function calcularGranTotal() {
    const rows = document.querySelectorAll('#ventasTableBody tr');
    let granTotal = 0;

    rows.forEach((row) => {
        const totalCell = row.querySelector('td:nth-child(4)');
        const total = parseFloat(totalCell.textContent);
        granTotal += total;
    });

    document.getElementById('Gran').value = granTotal.toFixed(2);
}

// Función para agregar una venta a la tabla
function agregarVenta(producto, cantidad, precio, total, fecha) {
    const ventasTableBody = document.getElementById('ventasTableBody');
    const row = ventasTableBody.insertRow();
    row.innerHTML = `
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td>${fecha}</td>
    `;

    // Llama a la función para recalcular el Gran Total
    calcularGranTotal();
}

// Función para eliminar un producto de la tabla
function eliminarProducto() {
    // Implementa la lógica para eliminar un producto de la tabla aquí
}

// Función para exportar la tabla como imagen PNG
function exportarImagen() {
    const ventasTable = document.querySelector('.table');
    html2canvas(ventasTable).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'tabla_ventas.png';
        a.click();
    });
}

// Función para exportar la tabla como archivo Excel
function exportarExcel() {
    const wb = XLSX.utils.table_to_book(document.querySelector('.table'));
    XLSX.writeFile(wb, 'ventas.xlsx');
}

// Event listener para el formulario de ventas
document.getElementById('ventaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const iva = document.getElementById('flexCheckDefault').checked ? 0.19 : 0;
    const total = (precio * cantidad * (1 + iva)).toFixed(2);
    const fecha = new Date().toLocaleDateString();

    agregarVenta(producto, cantidad, precio, total, fecha);

    // Limpia el formulario
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('flexCheckDefault').checked = false;
});

// Event listener para el botón de exportar imagen
document.getElementById('exportButton').addEventListener('click', function () {
    exportarImagen();
});

// Event listener para el botón de exportar Excel
document.querySelector('button.btn-success').addEventListener('click', function () {
    exportarExcel();
});

// Llama a la función para calcular el Gran Total cuando la página se carga
document.addEventListener("DOMContentLoaded", calcularGranTotal);
