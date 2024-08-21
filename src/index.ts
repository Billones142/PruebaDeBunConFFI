import { suffix } from "bun:ffi";
import { resolve, join } from "path";
import { existsSync } from "fs";
import { readdir } from "node:fs/promises";
import { extractLibraryFunctions } from "./libraryReader";
import inquirer from "./inquirer";



function executeFromLibrary(directoryFilePath: string, fileName: string): { stringConcat: string | undefined, sum: number | undefined } {
  // Verifica si el archivo DLL existe
  const directoryAndFile = join(directoryFilePath, fileName).concat(`.${suffix}`);
  if (!existsSync(directoryAndFile)) {
    throw new Error("The file doesn't exist");
  }


  const { add, concatStrings } = extractLibraryFunctions(directoryAndFile)
  // crea una constante que se comporta como una funcion de Bun

  const sumResult = add ? add(5, 3) : undefined;

  const concatenatedStr = concatStrings ? concatStrings('Hello ', 'World!') : undefined;


  return { stringConcat: concatenatedStr, sum: sumResult };
}

async function searchForDirectoryIn(source: string): Promise<string[]> {
  return (await readdir(source, { recursive: false, withFileTypes: true }))
    .filter(fileOrDirectory => fileOrDirectory.isDirectory())
    .map(directory => directory.name);
}

async function executeAllLibraries(libraryFilename: string) {
  const source = join(__dirname, './Libraries')
  const directories = await searchForDirectoryIn(source);
  const maxNameLength = Math.max(...directories.map(str => str.length));

  console.log('Library Directories found:', directories);

  for (let index = 0; index < directories.length; index++) {
    const libraryDirectory = resolve('src', 'Libraries', directories[index]);

    let resultMessage: string;

    try {
      const { sum, stringConcat } = executeFromLibrary(libraryDirectory, libraryFilename)

      resultMessage = `Result: num: ${sum} string: ${stringConcat}`;
    } catch (error: any) {
      resultMessage = error.message;
    }
    let spaces: string = '';
    for (let i = directories[index].length; i < maxNameLength; i++) {
      spaces += ' ';
    }
    console.log(directories[index] + spaces, '| ' + resultMessage);

  }
}

/*async function askUser() {
  inquirer('que libreria quieres usar?')
}*/

await executeAllLibraries('mylib');