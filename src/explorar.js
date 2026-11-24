const ventas = require("./datos");

// Cantidad de registros
console.log("Cantidad de registros:", ventas.length);

// Primer registro
console.log("Primer registro:");
console.log(ventas[0]);

// Último registro
console.log("Último registro:");
console.log(ventas[ventas.length - 1]);

// Producto del registro en la posición 4 (índice 4, quinto elemento)
console.log("Producto del registro en la posición 4:", ventas[4].producto);

// Tabla completa
console.log("Historial completo de ventas:");
console.table(ventas);
