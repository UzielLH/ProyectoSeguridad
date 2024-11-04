function codificar() {
    const mensaje = document.getElementById("mensaje").value;

    if (!/^[A-Z\s]+$/.test(mensaje)) {
        alert("Solo se permiten letras mayúsculas y espacios.");
        return;
    }   

    // Paso 1: Convertir a binario usando la tabla
    const tabla = {
        'A': '00110010', 'B': '00011110', 'C': '11100101', 'D': '01100111', 'E': '11110011',
        'F': '00110100', 'G': '11000001', 'H': '01000010', 'I': '10101001', 'J': '01110100',
        'K': '00011101', 'L': '11011000', 'M': '00110111', 'N': '01011000', 'O': '00011111',
        'P': '01000100', 'Q': '11100110', 'R': '00011010', 'S': '01110001', 'T': '01111000',
        'U': '01011111', 'V': '00110001', 'W': '10000011', 'X': '11000111', 'Y': '00110110',
        'Z': '11101001', ' ': '10110001'
    };

    const primos = [
        1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79,
        83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
        193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311,
        313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443,
        449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599
    ];

    // Paso 2: Convertir el mensaje a binario
    let cadenaBinaria = '';
    for (const letra of mensaje) {
        cadenaBinaria += tabla[letra];
    }

    // Paso 3: Asegurar que la longitud sea múltiplo de 3
    while (cadenaBinaria.length % 3 !== 0) {
        cadenaBinaria = '1' + cadenaBinaria;
    }

    // Paso 4: Agrupar en grupos de tres caracteres
    const grupos = [];
    for (let i = 0; i < cadenaBinaria.length; i += 3) {
        grupos.push(cadenaBinaria.slice(i, i + 3));
    }

    // Paso 5: Convertir cada grupo a decimal y usar BigInt para precisión
    const valoresDecimales = grupos.map(grupo => BigInt(parseInt(grupo, 2)));

    // Paso 6: Multiplicar por un número primo basado en la longitud del mensaje
    const longitudMensaje = grupos.length;
    const numeroPrimo = BigInt(primos[(longitudMensaje - 1) % primos.length]);
    const resultado = BigInt(valoresDecimales.join('')) * numeroPrimo;

    // Convertir el resultado en un string
    let resultadoString = resultado.toString();

    // Asegurar que la longitud de resultadoString sea múltiplo de 4
    while (resultadoString.length % 4 !== 0) {
        resultadoString = '1' + resultadoString;
    }

    alert(resultadoString);

    // Paso 7: Crear rectángulos basados en pares de `resultadoString`
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = ''; // Limpiar contenedor de salida

    for (let i = 0; i < resultadoString.length; i += 4) {
        // Tomar dos pares consecutivos para base y altura
        let base = parseInt(resultadoString.slice(i, i + 2), 10);
        let altura = parseInt(resultadoString.slice(i + 2, i + 4), 10);
    
        // Aplicar las reglas de conversion con if-else
        if (base >= 1 && base <= 9) {
            base = base * 10;
        } else if (base === 0) {
            base = 100;
        }
    
        if (altura >= 1 && altura <= 9) {
            altura = altura * 10;
        } else if (altura === 0) {
            altura = 100;
        }
    
        // Crear el elemento div para el rectángulo
        const rectangulo = document.createElement("div");
        rectangulo.className = "rectangle";
        rectangulo.style.width = `${base}px`;
        rectangulo.style.height = `${altura}px`;
    
        // Establecer el color de fondo a negro
        rectangulo.style.backgroundColor = 'black';
    
        outputContainer.appendChild(rectangulo);
    }
}

// Función limpiar
function limpiar() {
    document.getElementById("mensaje").value = '';
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = '';
}
