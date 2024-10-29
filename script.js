function codificar() {
    
    const mensaje = document.getElementById("mensaje").value;

    if (!/^[A-Z\s]+$/.test(mensaje)) {
        alert("Solo se permiten letras mayúsculas y espacios.");
        return;
    }

    
    // Paso 1: Convertir a binario usando la tabla del archivo
    const tabla = {
        'A': '00110010', 'B': '00011110', 'C': '11100101', 'D': '01100111', 'E': '11110011',
        'F': '00110100', 'G': '11000001', 'H': '01000010', 'I': '10101001', 'J': '01110100',
        'K': '00011101', 'L': '11011000', 'M': '00110111', 'N': '01011000', 'O': '00011111',
        'P': '01000100', 'Q': '11100110', 'R': '00011010', 'S': '01110001', 'T': '01111000',
        'U': '01011111', 'V': '00110001', 'W': '10000011', 'X': '11000111', 'Y': '00110110',
        'Z': '11101001', ' ': '10110001'
    };

    let cadenaBinaria = '';
    for (const letra of mensaje) {
        cadenaBinaria += tabla[letra];
    }

    // Paso 2: Agrupar en grupos de tres caracteres
    if (cadenaBinaria.length % 3 === 0) {
        cadenaBinaria = '111' + cadenaBinaria; // Si es múltiplo de 3, agregar "111" al inicio
    } else {
        while (cadenaBinaria.length % 3 !== 0) {
            cadenaBinaria = '1' + cadenaBinaria; // Si no es múltiplo de 3, agregar "1" al inicio hasta que lo sea
        }
    }

    const grupos = [];
    for (let i = 0; i < cadenaBinaria.length; i += 3) {
        grupos.push(cadenaBinaria.slice(i, i + 3));
    }

    // Paso 3: Convertir cada grupo a decimal
    const valoresDecimales = grupos.map(grupo => parseInt(grupo, 2));

    // Paso 4: Multiplicar por un número primo basado en la longitud del mensaje
    const primos = [
        1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79,
        83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
        193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311,
        313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443,
        449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599
    ];
    const longitudMensaje = mensaje.length;
    const numeroPrimo = primos[longitudMensaje % primos.length];
    const resultado = valoresDecimales.map(valor => valor * numeroPrimo);

    // Paso 5: Agrupar en pares y crear rectángulos
    let resultadoString = resultado.join('');
    while (resultadoString.length % 4 !== 0) {
        resultadoString = '1' + resultadoString; // Si no es múltiplo de 4, agregar "1" al inicio hasta que lo sea
    }

    const pares = resultadoString.match(/.{1,2}/g);

    // Limpiar contenedor de salida
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = '';

    // Crear rectángulos
    pares.forEach(par => {
        const base = parseInt(par[0]) * 10 || 100;
        const altura = parseInt(par[1]) * 10 || 100;

        const rectangulo = document.createElement("div");
        rectangulo.className = "rectangle";
        rectangulo.style.width = `${base}px`;
        rectangulo.style.height = `${altura}px`;
        outputContainer.appendChild(rectangulo);
    });
}




