
// 1. Declaración de variables, constantes y arrays
const historial = [];
let seguir = true;

// Las variables para los números y el resultado se declaran dentro de las funciones para mejor práctica

// 2. Funciones para operaciones y mostrar historial
function sumar() {
    const num1 = parseFloat(prompt("Ingrese el primer número:"));
    const num2 = parseFloat(prompt("Ingrese el segundo número:"));
    const resultado = num1 + num2;
    alert(`El resultado de la suma es: ${resultado}`);
    historial.push(`Suma: ${num1} + ${num2} = ${resultado}`);
}

function restar() {
    const num1 = parseFloat(prompt("Ingrese el primer número:"));
    const num2 = parseFloat(prompt("Ingrese el segundo número:"));
    const resultado = num1 - num2;
    alert(`El resultado de la resta es: ${resultado}`);
    historial.push(`Resta: ${num1} - ${num2} = ${resultado}`);
}

function multiplicar() {
    const num1 = parseFloat(prompt("Ingrese el primer número:"));
    const num2 = parseFloat(prompt("Ingrese el segundo número:"));
    const resultado = num1 * num2;
    alert(`El resultado de la multiplicación es: ${resultado}`);
    historial.push(`Multiplicación: ${num1} * ${num2} = ${resultado}`);
}

function dividir() {
    const num1 = parseFloat(prompt("Ingrese el primer número:"));
    const num2 = parseFloat(prompt("Ingrese el segundo número:"));
    if (num2 !== 0) {
        const resultado = num1 / num2;
        alert(`El resultado de la división es: ${resultado}`);
        historial.push(`División: ${num1} / ${num2} = ${resultado}`);
    } else {
        alert("Error: División por cero no permitida.");
        historial.push(`División: ${num1} / ${num2} = Error (división por cero)`);
    }
}

function mostrarHistorial() {
    if (historial.length === 0) {
        alert("No hay operaciones en el historial.");
    } else {
        console.log("Historial de operaciones:");
        historial.forEach(op => console.log(op));
        alert("Historial mostrado en la consola.");
    }
}

// 3. Menú principal y ciclo de la calculadora
while (seguir) {
    const opc = parseInt(prompt(
      "Ingrese una opción:\n1- Suma\n2- Resta\n3- Multiplicación\n4- División\n5- Ver historial\n6- Salir"
    ));
    switch (opc) {
        case 1:
            sumar();
            break;
        case 2:
            restar();
            break;
        case 3:
            multiplicar();
            break;
        case 4:
            dividir();
            break;
        case 5:
            mostrarHistorial();
            break;
        case 6:
            if (confirm("¿Seguro que quieres salir?")) {
                seguir = false;
                alert("¡Hasta luego!");
            }
            break;
        default:
            alert("Opción no válida.");
            break;
    }
}