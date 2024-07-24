import { dlopen, FFIType, suffix } from "bun:ffi";
import { resolve , join} from "path";
import { existsSync , statSync } from "fs";
import { readdir } from "node:fs/promises";





function executeFromLibrary(directoryFilePath : string, fileName : string) : number {
  // Verifica si el archivo DLL existe
  const directoryAndFile= join(directoryFilePath,fileName).concat(`.${suffix}`);
  if (!existsSync(directoryAndFile)) {
    throw new Error("The file doesn't exist");
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

  return add(5, 3);
}

async function searchForDirectoryIn(source:string) : Promise<string[]> {
  return (await readdir(source, { recursive: false , withFileTypes: true}))
    .filter((fileOrDirectory) : boolean => {
      return fileOrDirectory.isDirectory()
    }
  )
  .map(directory => {
    return directory.name;
  });
}

async function executeAllLibraries() {
  const source= join(__dirname,'./Libraries')
  const directories= await searchForDirectoryIn(source);
  const maxNameLength= (() : number => Math.max(...directories.map(str => str.length)))();

  console.log('Libraries Directories found:',directories);

  const filename = 'mylib';

  for (let index = 0; index < directories.length ; index++) {
    const libraryDirectory = resolve('src','Libraries',directories[index]);
    
    let resultMessage : string;
    try {
      const result= executeFromLibrary(libraryDirectory,filename)
      resultMessage= `Result: ${result}`;
    } catch (error) {
      resultMessage= error.message;
    }
    let spaces : string= '';
    for (let i = directories[index].length; i < maxNameLength ; i++) {
      spaces= spaces.concat(' ');
    }
    console.log(directories[index].concat(spaces), '| '.concat(resultMessage));
    
  }
}

await executeAllLibraries();