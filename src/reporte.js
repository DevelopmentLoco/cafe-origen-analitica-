const ventas = require("./datos");

const {
    totalVendido,
    unidadesVendidas,
    ticketPromedio,
    ventaMayor,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");

// Presenta los valores numéricos en pesos colombianos.
function pesos(valor) {
    return "$ " + Math.round(valor).toLocaleString("es-CO");
}

// Imprime el resumen de un día, incluso cuando no hay ventas.
function mostrarResumenDia(ventas, fecha) {
    const ventasDia = ventasDelDia(ventas, fecha);

    console.log("\nFecha: " + fecha);
    console.log("Cantidad de ventas: " + ventasDia.length);
    console.log("Total vendido: " + pesos(totalVendido(ventasDia)));
    console.log("Unidades vendidas: " + unidadesVendidas(ventasDia));
    console.log("Ticket promedio: " + pesos(ticketPromedio(ventasDia)));

    if (ventasDia.length === 0) {
        console.log("No se registraron ventas para esta fecha.");
    }
}

console.log("==================================================");
console.log("             CAFÉ ORIGEN | REPORTE v0.1");
console.log("==================================================");

// 1. Resumen general
console.log("\n1. RESUMEN GENERAL");
console.log("-----------------------------------------------");
console.log("Registros analizados: " + ventas.length);
console.log("Total vendido:        " + pesos(totalVendido(ventas)));
console.log("Unidades vendidas:    " + unidadesVendidas(ventas));
console.log("Ticket promedio:      " + pesos(ticketPromedio(ventas)));

const mayorVenta = ventaMayor(ventas);
if (mayorVenta !== null) {
    console.log("Venta de mayor valor: " + pesos(mayorVenta.cantidad * mayorVenta.precio));
    console.log("Producto:             " + mayorVenta.producto);
}

// 2. Ventas por ciudad
console.log("\n2. VENTAS POR CIUDAD");
console.log("-----------------------------------------------");
const ciudades = Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
    ciudad,
    total: pesos(total)
}));
console.table(ciudades);

// 3. Unidades por producto
console.log("\n3. UNIDADES POR PRODUCTO");
console.log("-----------------------------------------------");
const productos = Object.entries(unidadesPorProducto(ventas)).map(([producto, unidades]) => ({
    producto,
    unidades
}));
console.table(productos);

// 4. Top 3 productos por valor
console.log("\n4. TOP 3 PRODUCTOS POR VALOR");
console.log("-----------------------------------------------");
const topTres = topProductosPorValor(ventas, 3).map((producto, indice) => ({
    puesto: indice + 1,
    producto: producto.producto,
    valor: pesos(producto.valor)
}));
console.table(topTres);

// Resumen diario: una fecha con ventas y otra sin ventas.
console.log("\nRESUMEN POR DÍA");
console.log("-----------------------------------------------");
mostrarResumenDia(ventas, "2026-09-01");
mostrarResumenDia(ventas, "2026-09-07");

console.log("\n==================================================");
console.log("                 FIN DEL REPORTE");
console.log("==================================================");
