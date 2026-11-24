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


## MiniReto 2 — Los números del día

### Plan en pseudocódigo

**1. `valorVenta(venta)`**
- Recibir un registro de venta.
- Multiplicar `cantidad` por `precio`.
- Devolver el resultado.

**2. `totalVendido(ventas)`**
- Iniciar el acumulador `total` en `0`.
- Recorrer cada venta con `for...of`.
- Calcular el valor de la venta con `valorVenta(venta)` y sumarlo a `total`.
- Devolver `total`.
- Si el arreglo está vacío, devolver `0`.

**3. `unidadesVendidas(ventas)`**
- Iniciar el acumulador `unidades` en `0`.
- Recorrer cada venta con `for...of`.
- Si la cantidad es mayor que `0`, sumar esa cantidad a `unidades`.
- Devolver `unidades`.
- Si el arreglo está vacío, devolver `0`.

**4. `ventaMayor(ventas)`**
- Si el arreglo está vacío, devolver `null`, porque no existe un registro para retornar.
- Iniciar `mayor` con el primer registro.
- Recorrer las ventas con `for...of`.
- Si el valor de la venta actual supera el valor de `mayor`, actualizar `mayor`.
- Devolver el registro completo almacenado en `mayor`.

**5. `ticketPromedio(ventas)`**
- Iniciar el acumulador `total` en `0` y el contador `cantidadVentasValidas` en `0`.
- Recorrer las ventas con `for...of`.
- Si `cantidad` es mayor que `0`, sumar `valorVenta(venta)` a `total` y aumentar el contador en `1`.
- Si el contador queda en `0`, devolver `0` para evitar una división entre cero.
- En caso contrario, devolver `total` dividido entre `cantidadVentasValidas`.

**6. `ventasPorCiudad(ventas, ciudad)`**
- Iniciar el acumulador `total` en `0`.
- Normalizar la ciudad recibida con `trim()` y `toLowerCase()`.
- Recorrer las ventas con `for...of`.
- Normalizar la ciudad de cada venta de la misma manera.
- Si ambas ciudades coinciden, sumar `valorVenta(venta)` a `total`.
- Devolver `total`.
- Si el arreglo está vacío o no hay coincidencias, devolver `0`.

### Decisiones para arreglos vacíos y casos borde

| Función | Resultado con `[]` | Decisión |
|---|---:|---|
| `valorVenta(venta)` | No aplica | Recibe una venta individual, no un arreglo. |
| `totalVendido([])` | `0` | No hay valores que acumular. |
| `unidadesVendidas([])` | `0` | No hay unidades que sumar. |
| `ventaMayor([])` | `null` | No existe un registro que pueda ser el mayor. |
| `ticketPromedio([])` | `0` | No hay ventas válidas; se evita dividir entre cero. |
| `ventasPorCiudad([], "Medellín")` | `0` | No hay ventas de ninguna ciudad. |

Las ventas con `cantidad` igual a `0` no se cuentan como ventas válidas para el ticket promedio ni aportan unidades. Se conserva el registro original. `totalVendido` suma `cantidad × precio` de todos los registros; en este conjunto, el registro con cantidad cero aporta exactamente cero.

La comparación de ciudades elimina espacios al inicio y al final y convierte el texto a minúsculas. Por eso `Medellín`, `medellín` y ` Medellín ` se comparan como la misma ciudad.

### Trazas manuales

**Traza 1: acumulación de `totalVendido`**

En cada fila se multiplica cantidad por precio y se suma el resultado al acumulador.

| ID | Operación | Valor de venta | Total acumulado |
|---:|---|---:|---:|
| 1 | 2 × 42.000 | 84.000 | 84.000 |
| 2 | 1 × 26.000 | 26.000 | 110.000 |
| 3 | 1 × 95.000 | 95.000 | 205.000 |
| 4 | 1 × 42.000 | 42.000 | 247.000 |
| 5 | 3 × 45.000 | 135.000 | 382.000 |
| 6 | 2 × 26.000 | 52.000 | 434.000 |
| 7 | 1 × 120.000 | 120.000 | 554.000 |
| 8 | 0 × 42.000 | 0 | 554.000 |
| 9 | 2 × 45.000 | 90.000 | 644.000 |
| 10 | 4 × 42.000 | 168.000 | 812.000 |
| 11 | 1 × 95.000 | 95.000 | 907.000 |
| 12 | 3 × 26.000 | 78.000 | 985.000 |

**Resultado manual:** `985.000`.  
**Resultado del programa:** `985000`. Coinciden.

**Traza 2: `ventasPorCiudad(ventas, "Medellín")`**

La comparación se realiza después de aplicar `trim()` y `toLowerCase()` a ambas ciudades.

| ID | Ciudad original | ¿Coincide? | Valor sumado | Total acumulado |
|---:|---|---|---:|---:|
| 1 | Medellín | Sí | 84.000 | 84.000 |
| 2 | Bogotá | No | 0 | 84.000 |
| 3 | Cali | No | 0 | 84.000 |
| 4 | Medellín | Sí | 42.000 | 126.000 |
| 5 | medellín | Sí | 135.000 | 261.000 |
| 6 | Bogotá | No | 0 | 261.000 |
| 7 | Bogotá | No | 0 | 261.000 |
| 8 | Cali | No | 0 | 261.000 |
| 9 | Cali | No | 0 | 261.000 |
| 10 | Pereira | No | 0 | 261.000 |
| 11 | Medellín | Sí | 95.000 | 356.000 |
| 12 | Bogotá | No | 0 | 356.000 |

**Resultado manual:** `356.000`.  
**Resultado del programa:** `356000`. Coinciden; la venta del registro 5 se incluye a pesar de que la ciudad está escrita en minúsculas.

### Resultados de las pruebas

Se probaron las funciones con el arreglo completo, un arreglo de un solo elemento (la venta con `id: 1`) y un arreglo vacío.

| Función | Arreglo completo | Un elemento (`id: 1`) | Arreglo vacío |
|---|---:|---:|---:|
| `valorVenta` | Se usa sobre cada venta | `84.000` | No aplica |
| `totalVendido` | `985.000` | `84.000` | `0` |
| `unidadesVendidas` | `21` | `2` | `0` |
| `ventaMayor` | Registro `id: 10` (valor `168.000`) | Registro `id: 1` | `null` |
| `ticketPromedio` | `89.545,45` aprox. | `84.000` | `0` |
| `ventasPorCiudad` (ciudad Medellín) | `356.000` | `84.000` | `0` |

**Comprobación adicional:** hay 11 ventas válidas (cantidad mayor que cero). El ticket promedio es `985.000 ÷ 11 = 89.545,45` aproximadamente.

En este reto se utilizaron ciclos `for...of`, condicionales, acumuladores, un contador y comparación de máximo. No se utilizaron `map`, `filter` ni `reduce`.
