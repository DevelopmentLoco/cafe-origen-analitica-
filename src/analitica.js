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



// Versiones de los indicadores utilizando métodos de arreglos.

// Suma el valor de todas las ventas con map y reduce.
function totalVendidoM(ventas) {
    return ventas
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

// Suma las unidades de las ventas válidas con filter, map y reduce.
function unidadesVendidasM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => venta.cantidad)
        .reduce((total, cantidad) => total + cantidad, 0);
}

// Suma las ventas de una ciudad ignorando mayúsculas
// y espacios sobrantes al inicio o al final.
function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

// Agrupa el valor vendido por ciudad.
// La clave interna normalizada evita separar nombres con diferencias
// de mayúsculas, minúsculas o espacios sobrantes.
function totalPorCiudad(ventas) {
    const totalesNormalizados = ventas.reduce((acumulado, venta) => {
        const ciudadNormalizada = venta.ciudad.trim().toLowerCase();

        if (!acumulado[ciudadNormalizada]) {
            acumulado[ciudadNormalizada] = {
                ciudad: venta.ciudad.trim(),
                total: 0
            };
        }

        acumulado[ciudadNormalizada].total += valorVenta(venta);

        return acumulado;
    }, {});

    return Object.entries(totalesNormalizados).reduce((resultado, [clave, datos]) => {
        resultado[datos.ciudad] = datos.total;
        return resultado;
    }, {});
}

// Agrupa las unidades vendidas por nombre de producto.
function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulado, venta) => {
        if (!acumulado[venta.producto]) {
            acumulado[venta.producto] = 0;
        }

        acumulado[venta.producto] += venta.cantidad;

        return acumulado;
    }, {});
}

// Devuelve los k productos que más dinero generaron, de mayor a menor.
function topProductosPorValor(ventas, k) {
    const valoresPorProducto = ventas.reduce((acumulado, venta) => {
        if (!acumulado[venta.producto]) {
            acumulado[venta.producto] = 0;
        }

        acumulado[venta.producto] += valorVenta(venta);

        return acumulado;
    }, {});

    const productosOrdenados = [...Object.entries(valoresPorProducto)]
        .map(([producto, valor]) => ({ producto, valor }))
        .sort((a, b) => b.valor - a.valor);

    return productosOrdenados.slice(0, k);
}


// Devuelve las ventas correspondientes a una fecha exacta.
// Si no hay ventas para esa fecha, devuelve un arreglo vacío.
function ventasDelDia(ventas, fecha) {
    return ventas.filter(venta => venta.fecha === fecha);
}


module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
};
