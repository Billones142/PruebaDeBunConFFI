import jwt from "jsonwebtoken";

let clave: jwt.Secret= '4165156161'

let permiso= jwt.sign({ hola: 'soy una cadena', tiempo: new Date()},clave)

console.log(jwt.decode(permiso, {json: true}).tiempo);
