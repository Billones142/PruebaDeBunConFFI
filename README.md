# Prueba de Bun con FFI

[Docs de FFI de Bun](https://bun.sh/docs/api/ffi)

## Bun?
Este es un repositorio de prueba sobre el uso de librerias en un archivo dll usando Bun, que es un runtime que es capaz de usar Javascript / Typescript / Typescript JSX, tambien es capaz de compilar a un archivo ejecutable.

## [Instalacion de Bun](https://bun.sh/docs/installation)
Windows: 'powershell -c "irm bun.sh/install.ps1|iex"'
Linux: 
Mac: 

## [Instalacion de Zig](https://ziglang.org/learn/getting-started/)
Windows: 'winget install zig.zig'
Linux: 
Mac: 
or with npm: 'npm install -g bun'

## Scripts?
Cada uno de los lenguajes en los que se encuentran las librerias tienen su propio directorio dentro de "src/Libraries" , una vez ejecutados generan 3 archivos
.dll (Windows), .os (Linux), .dylib (MacOs), y otros.

## Ejecucion de Bun
Una vez compiladas las librerias se puede ejecutar el comando en la raiz del proyecto 'bun run ./src/index.ts' lo cual va a ejecurtar cada una de las librerias