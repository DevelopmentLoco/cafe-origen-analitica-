# Bitácora — Café Origen: analítica de ventas

## Diccionario de datos

| Propiedad | Tipo de dato | Significado |
|---|---|---|
| `id` | Number (número) | Identificador único de cada registro de venta. |
| `fecha` | String (cadena de texto) | Fecha en la que se realizó la venta, con formato `AAAA-MM-DD`. |
| `cliente` | String (cadena de texto) | Código que identifica al cliente, por ejemplo `C01`. |
| `producto` | String (cadena de texto) | Nombre del producto vendido. |
| `ciudad` | String (cadena de texto) | Ciudad asociada a la venta. |
| `cantidad` | Number (número) | Número de unidades registradas en la venta. |
| `precio` | Number (número) | Precio unitario del producto, expresado en pesos colombianos según la muestra. |

## Casos borde detectados

1. **Nombre de ciudad con diferencias de mayúsculas y minúsculas.** En el registro con `id: 5`, la ciudad aparece como `medellín`, mientras que en otros registros aparece como `Medellín`.  
   **Decisión:** conservar el dato original en esta etapa para no alterar la muestra. Al realizar agrupaciones por ciudad, normalizaré el texto de manera controlada para que ambas formas se reconozcan como la misma ciudad.

2. **Venta con cantidad igual a cero.** El registro con `id: 8` tiene `cantidad: 0`. No representa una cantidad positiva de unidades vendidas y podría ser un dato incompleto o una operación que debe revisarse.  
   **Decisión:** conservar el registro original y no modificarlo automáticamente. Antes de calcular unidades o ingresos, revisaré cómo debe tratarse esta venta; no asumiré que equivale a una unidad.

3. **Clientes que aparecen en más de un registro.** Los códigos `C01`, `C02` y `C03` se repiten en diferentes ventas. Esto puede representar compras realizadas por un mismo cliente en fechas distintas; no demuestra por sí solo que haya duplicados.  
   **Decisión:** conservar todas las ventas. Cuando se necesite contar clientes, contaré códigos de cliente distintos y no asumiré que cada fila corresponde a un cliente nuevo.

## Observación inicial

La muestra contiene 12 registros. Los valores se conservaron tal como fueron entregados; no se aplicó limpieza ni transformación a `datos.js`.
