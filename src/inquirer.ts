import inquirer from 'inquirer';

//export default async function preguntar(pregunta: string, opciones?: {elecciones?: Array<string> , type?: 'list' | 'input' | 'confirm' | 'checkbox' | 'number' | 'password', limpiarConsola?: boolean});
export default async function preguntar(pregunta: string, opciones: { type: 'confirm', limpiarConsola?: boolean })                             : Promise< boolean >;
export default async function preguntar(pregunta: string, opciones: { type: 'number', limpiarConsola?: boolean })                              : Promise< number >;
export default async function preguntar(pregunta: string, opciones: { type: 'input' | 'password', limpiarConsola?: boolean })                  : Promise< string >;
export default async function preguntar(pregunta: string, opciones: { type: 'list', elecciones: Array<string> , limpiarConsola?: boolean })    : Promise< string >;
export default async function preguntar(pregunta: string, opciones: {type: 'checkbox', elecciones: Array<string> , limpiarConsola?: boolean }) : Promise< Array<string> >;

export default async function preguntar(pregunta: string, opciones: {elecciones?: Array<string> , type: 'list' | 'input' | 'confirm' | 'checkbox' | 'number' | 'password', limpiarConsola?: boolean}) : Promise<number | string | boolean | any> {
  if (opciones?.limpiarConsola && opciones.limpiarConsola ) console.clear();
  
  try {
    let preguntaInq = {
      'question': {
        message: pregunta,
        type: opciones.type,
      },
    };

    if (opciones.elecciones) {
      (preguntaInq.question as any).choices= opciones.elecciones;
    }
    
    return (await inquirer.prompt(preguntaInq as any))['question'];
  } catch (error) {
    console.error('inquirer error:', error)
  }
}