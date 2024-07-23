import { dlopen, FFIType, suffix } from "bun:ffi";
import { resolve , join} from "path";
import { existsSync , statSync } from "fs";
import { readdir } from "node:fs/promises";





function executeFromLibrary(directoryFilePath : string, fileName : string) {
  try {
    // Verifica si el archivo DLL existe
    const directoryAndFile= join(directoryFilePath,fileName).concat(`.${suffix}`);
    if (!existsSync(directoryAndFile)) {
      console.error(`The DLL file does not exist at path: ${directoryAndFile}`);
      throw new Error("No exite el archivo");
      ;
    }
    // crea una constante que se comporta como una funcion de Bun
    const {
      symbols: {
        add, // Asegúrarse de que este nombre coincida con la función del DLL
      },
    } = dlopen(directoryAndFile, {
      add: { // Asegúrarse de que este nombre coincida con la función del DLL
        args: [FFIType.i32, FFIType.i32], // Tipos de argumentos
        returns: FFIType.i32, // Tipo de retorno
      },
    });
  
    const result = add(5, 3);
    console.log(directoryFilePath,`Result: ${result}`);
  } catch (error) {
    if (error.message !== 'No exite el archivo') {
      console.log('error desconocido: "' + directoryFilePath +  '"');
    }
  }
}

async function buscarDirectorioEn(source:string) : Promise<string[]> {
  return (await readdir(source, { recursive: false , withFileTypes: true}))
    .filter((fileOrDirectory) : boolean => {
      return fileOrDirectory.isDirectory()
    }
  )
  .map(directory => {
    return directory.name;
  });
}

let source= join(__dirname,'./Libraries')
let directories= await buscarDirectorioEn(source);

console.log('Directorios de librerias encontrados:',directories);

const filename = 'mylib';

for (let index = 0; index < directories.length ; index++) {
  const libraryDirectory = resolve('src','Libraries',directories[index]);

  executeFromLibrary(libraryDirectory,filename)
}