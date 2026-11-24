# Café Origen — Motor de analítica de ventas v0.1

## ¿Qué es este proyecto?

Café Origen es un proyecto de JavaScript que analiza un conjunto de registros de ventas de una cafetería. El motor calcula indicadores, agrupa resultados por ciudad y producto, identifica los productos con mayor valor generado y presenta un reporte legible en la consola.

Los datos originales se mantienen en `src/datos.js` sin limpieza ni modificaciones.

## Requisitos

- Node.js (versión LTS)
- Git

## Estructura

```text
cafe-origen-analitica/
├── src/
│   ├── datos.js
│   ├── analitica.js
│   ├── explorar.js
│   ├── verificar.js
│   └── reporte.js
├── bitacora.md
└── README.md
```

## Cómo ejecutar el proyecto

Abre una terminal en la carpeta raíz del proyecto.

**Explorar los datos originales:**

```bash
node src/explorar.js
```

**Verificar que los indicadores con ciclos y con métodos producen los mismos resultados:**

```bash
node src/verificar.js
```

**Generar el reporte de negocio v0.1:**

```bash
node src/reporte.js
```

El reporte presenta el resumen general, las ventas por ciudad, las unidades por producto y el top 3 de productos por valor. También muestra el resumen de un día con ventas y de un día sin ventas.

## ¿Qué preguntas responde?

- ¿Cuánto dinero se vendió en total?
- ¿Cuántas unidades se vendieron y cuál fue el ticket promedio?
- ¿Cuál fue la venta individual de mayor valor?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Cuáles son los tres productos que más dinero generaron?
- ¿Cuánto se vendió en una fecha determinada?
- ¿Qué resultado se obtiene cuando una fecha no tiene ventas?

Los valores monetarios se presentan en pesos colombianos. Las ciudades se agrupan normalizando mayúsculas, minúsculas y espacios sobrantes. Cuando una fecha no tiene ventas, los indicadores numéricos devuelven cero y el reporte informa que no hubo registros.
