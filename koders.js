/* Para empezar este proyecto necesitaremos importar el modulo de fs y path de node.
Lo que buscamos es hacer un programa capaz de leer, editar, guardar y eliminar un archivo JSON.*/

const fs = require("node:fs");
const path = require("node:path");

// Definimos la ruta del archivo, con el metodo join de path
// Path.join es un metodo que toma cualquier numero de argumentos los une y los convierte en una ruta absoluta
const fullPath = path.join(__dirname, "koders.json"); // __dirname es una variable global que nos da la ruta del archivo actual

// Funcion para verificar la existencia del archivo y leerlo
function readKoders() {
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  const data = fs.readFileSync(fullPath, "utf8"); // Lee el contenido del archivo y lo guarda en la variable data
  return JSON.parse(data); // Parseo el contenido del archivo a un objeto de JavaScript
}

// Funcion para guardar los koders en el archivo y convertirlo a una cadena JSON
function writeKoders(koders) {
  fs.writeFileSync(fullPath, JSON.stringify(koders, null, 2), "utf8");
}

// Funcion para listar todos los koders que hemos guardado
function getKoders() {
  return readKoders().forEach((koder) => console.log(koder));
}

// Funcion para agregar un koder a la lista
function addKoder(name) {
  const koders = readKoders();
  koders.push(name);
  writeKoders(koders);
  console.log(`Koder ${name} agregado`);
}

// Funcion para eliminar un koder de la lista
function deleteKoder(name) {
  let koders = readKoders(); // Cambiado a let para permitir reasignación
  koders = koders.filter((koder) => koder !== name); // Filtra para mantener solo los koders que no coinciden con el nombre
  writeKoders(koders); // Guarda el nuevo array en el archivo
  console.log(`Koder ${name} eliminado`);
}

// Funcion para eliminar todos los koders de la lista. Esta opcion mas que eliminar recomienza el archivo
function deleteAllKoders() {
  writeKoders([]); // Guardamos un array vacio en el archivo
  console.log("Todos los koders eliminados");
}

// Funcion que me ayudara a ejecutar las funciones anteriores en node
const args = process.argv.slice(2); // Guardamos los argumentos que se pasen en la terminal
const cli = args[0]; // Guardamos el primer argumento en una variable

switch (cli) {
  case "ls": // Listar todos los koders
    getKoders();
    break;
  case "add": // Agregar un koder
    addKoder(args[1]);
    if (args[1] === undefined) {
      console.log("Debes agregar un nombre");
    }
    break;
  case "rm": // Eliminar un koder
    deleteKoder(args[1]);
    if (args[1] === undefined) {
      console.log("Debes agregar un nombre para eliminarlo");
    }
    break;
  case "reset": // Eliminar todos los koders
    deleteAllKoders();
    break;
  default:
    console.log(
      "No reconozco el comando, por favor usa ls, add, delete o delete-all"
    );
}
