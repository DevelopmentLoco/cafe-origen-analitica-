// Calcula el valor total de una venta.
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

// Suma el valor de todas las ventas.
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += valorVenta(venta);
    }

    return total;
}

// Suma las unidades de las ventas con cantidad mayor que cero.
function unidadesVendidas(ventas) {
    let unidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            unidades += venta.cantidad;
        }
    }

    return unidades;
}

// Devuelve el registro completo con el mayor valor de venta.
// Si el arreglo está vacío, devuelve null.
function ventaMayor(ventas) {
    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];

    for (const venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    return mayor;
}

// Calcula el promedio de las ventas con cantidad mayor que cero.
// Si no hay ventas válidas, devuelve 0.
function ticketPromedio(ventas) {
    let total = 0;
    let cantidadVentasValidas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            cantidadVentasValidas++;
        }
    }

    if (cantidadVentasValidas === 0) {
        return 0;
    }

    return total / cantidadVentasValidas;
}

// Suma las ventas de una ciudad ignorando mayúsculas
// y espacios sobrantes al inicio o al final.
function ventasPorCiudad(ventas, ciudad) {
    let total = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};
