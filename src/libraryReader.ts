import { dlopen, FFIType, CString, ptr } from "bun:ffi";

export function extractLibraryFunctions(directoryAndFile: string): {
  add: ((a: number, b: number) => number) | undefined,
  concatStrings: ((a: string, b: string) => string) | undefined
} {
  let addTs: ((a: number, b: number) => number) | undefined;
  let concatStringsTs: ((str1: string, str2: string) => string) | undefined;

  try {
    const {
      symbols: {
        add, // Asegúrarse de que este nombre coincida con la función del DLL
      },
    } = dlopen(directoryAndFile, {
      add: { // Asegúrarse de que este nombre coincida con la función del DLL
        args: [FFIType.i32, FFIType.i32], // Tipos de argumentos
        returns: FFIType.i32, // Tipo de retorno
      }
    });

    addTs = function (a: number, b: number): number {
      return add(a, b);
    }
  } catch (error) {
    //TODO
  }

  try {
    const {
      symbols: {
        concatStrings,
        free_memory
      },
    } = dlopen(directoryAndFile, {
      concatStrings: {
        args: [FFIType.cstring, FFIType.cstring],
        returns: FFIType.cstring,
      },
      free_memory: {
        args: [FFIType.ptr],
        returns: FFIType.void,
      }
    });

    concatStringsTs = function (str1: string, str2: string): string {
      const cStr1 = Buffer.from(str1 + '\0', 'utf8');
      const cStr2 = Buffer.from(str2 + '\0', 'utf8');

      const concatedStringPointer: CString = concatStrings(ptr(cStr1), ptr(cStr2));
      if (!(concatedStringPointer.ptr === null)) {
        free_memory(concatedStringPointer.ptr);
        return concatedStringPointer.toString();

      } else {
        throw new Error("library string error");
      }

    }
  } catch (error) {
    //TODO
  }

  return { add: addTs, concatStrings: concatStringsTs }
}