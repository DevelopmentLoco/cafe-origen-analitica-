const ventas = require("./datos");

const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica");

const ventaUnica = [ventas[0]];
const ventasVacias = [];

function verificarPar(nombre, resultadoCiclo, resultadoMetodo) {
    if (resultadoCiclo === resultadoMetodo) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
    }
}

// Compara cada versión con ciclo y con métodos usando los mismos datos.
const pruebas = [
    { nombre: "Arreglo completo", datos: ventas },
    { nombre: "Un solo registro", datos: ventaUnica },
    { nombre: "Arreglo vacío", datos: ventasVacias }
];

for (const prueba of pruebas) {
    console.log("\n" + prueba.nombre);

    verificarPar(
        "totalVendido / totalVendidoM",
        totalVendido(prueba.datos),
        totalVendidoM(prueba.datos)
    );

    verificarPar(
        "unidadesVendidas / unidadesVendidasM",
        unidadesVendidas(prueba.datos),
        unidadesVendidasM(prueba.datos)
    );

    verificarPar(
        "ventasPorCiudad / ventasPorCiudadM",
        ventasPorCiudad(prueba.datos, "Medellín"),
        ventasPorCiudadM(prueba.datos, "Medellín")
    );
}

// Comprueba también la normalización de espacios y mayúsculas.
verificarPar(
    "Ciudades con espacios y mayúsculas",
    ventasPorCiudad(ventas, "  MEDELLÍN  "),
    ventasPorCiudadM(ventas, "  MEDELLÍN  ")
);

// Guarda una copia para comprobar que las funciones no cambian el orden.
const ventasOriginales = [...ventas];

const ciudades = totalPorCiudad(ventas);
const unidadesProductos = unidadesPorProducto(ventas);
const topTres = topProductosPorValor(ventas, 3);

const ciudadesCorrectas =
    Object.keys(ciudades).length === 4 &&
    ciudades["Medellín"] === 356000 &&
    ciudades["Bogotá"] === 276000 &&
    ciudades["Cali"] === 185000 &&
    ciudades["Pereira"] === 168000;

console.log(
    "totalPorCiudad (cuatro ciudades): " +
    (ciudadesCorrectas ? "OK" : "DIFERENTE")
);

const unidadesCorrectas =
    unidadesProductos["Origen Huila 500 g"] === 7 &&
    unidadesProductos["Origen Nariño 250 g"] === 6 &&
    unidadesProductos["Prensa francesa"] === 2 &&
    unidadesProductos["Origen Sierra 500 g"] === 5 &&
    unidadesProductos["Molino manual"] === 1;

console.log(
    "unidadesPorProducto: " +
    (unidadesCorrectas ? "OK" : "DIFERENTE")
);

const topTresEsperado = [
    { producto: "Origen Huila 500 g", valor: 294000 },
    { producto: "Origen Sierra 500 g", valor: 225000 },
    { producto: "Prensa francesa", valor: 190000 }
];

const topCorrecto =
    JSON.stringify(topTres) === JSON.stringify(topTresEsperado);

console.log(
    "topProductosPorValor (tres primeros): " +
    (topCorrecto ? "OK" : "DIFERENTE")
);

const conservaOrden = ventas.every((venta, indice) => {
    return venta === ventasOriginales[indice];
});

console.log(
    "Orden original de ventas: " +
    (conservaOrden ? "OK" : "DIFERENTE")
);

console.log("\nResultados de las agrupaciones:");
console.log("Total por ciudad:");
console.log(ciudades);

console.log("Unidades por producto:");
console.log(unidadesProductos);

console.log("Top 3 productos por valor:");
console.table(topTres);
