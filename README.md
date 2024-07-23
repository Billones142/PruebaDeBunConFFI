# Prueba de Bun con c

## [Instalacion de Bun](https://bun.sh/docs/installation)
Windows: 'winget install zig.zig'
Linux: 
Mac: 

## [Instalacion de Zig](https://ziglang.org/learn/getting-started/)


## Bun?
Este es un repositorio de prueba sobre el uso de librerias en un archivo dll usando Bun, que es un runtime que es capaz de usar Javascript / Typescript / Typescript JSX

[Docs de FFI de Bun](https://bun.sh/docs/api/ffi)

## Scripts?
En este repositorio hay dos scripts que compilan codigo c y c++ a un archivo dll, cada uno en sus respectivos directorios, una vez ejecutados generan 3 archivos
.dll (Windows), .os (Linux), .dylib (MacOs).

## Ejecucion de Bun
Una vez compiladas las librerias se puede ejecutar el comando en la raiz del proyecto 'bun run ./src/index.ts' lo cual va a ejecurtar cada una de las librerias