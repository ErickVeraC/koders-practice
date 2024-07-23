/* Para empezar este proyecto necesitaremos importar el modulo de fs y path de node.
Lo que buscamos es hacer un programa capaz de leer, editar, guardar y eliminar un archivo JSON.*/

const fs = require("node:fs");
const path = require("node:path");

// Definimos la ruta del archivo, con el metodo join de path
// Path.join es un metodo que toma cualquier numero de argumentos los une y los convierte en una ruta absoluta
const fullPath = path.join(__dirname, "koders.js"); // __dirname es una variable global que nos da la ruta del archivo actual

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

// Funcion para agregar un koder al archivo
