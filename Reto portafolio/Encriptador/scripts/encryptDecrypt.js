const d = document;
const textArea = d.querySelector(".form__input");
const imgMuneco = d.querySelector(".result__img");
const loaderCargando = d.querySelector(".loader");
const resultTitle = d.querySelector(".result__title");
const resultText = d.querySelector(".result__text");
const encryptButton = d.querySelector(".form__btn__encriptar");
const decryptButton = d.querySelector(".form__btn__desencriptar");
const copyButton = d.querySelector(".result_btn");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];


//Con esta función encriptamos el mensaje
function encriptarMensaje(mensaje){
        let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++){
            if(letra === llaves[j][0]){
                encriptada = llaves[j][1]; //Remplaza la letra por su equivalente encriptada
            break; //Finaliza el bucle cuando encuentra la correspondencia

            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

//Con esta función desencriptamos el mensaje
function desencriptarMensaje(mensaje){
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

//Con esta función ocultamos elementos de forma dinámica 
textArea.addEventListener("input", (e) => {
    const numberDetector = /\d/.test(textArea.value);
    if (textArea.value === "") {
        imgMuneco.style.display = "none"; 
        loaderCargando.classList.add("hidden");
        resultTitle.textContent = "Escribe nuevamente 👀";
        resultText.textContent = "";
        copyButton.classList.add("hidden");
    } else if(numberDetector){
        resultTitle.textContent = "No se permiten números ❌";
        imgMuneco.style.display = "none";
        loaderCargando.classList.remove("hidden");
        resultText.textContent = "";
    }
    else {
        imgMuneco.style.display = "none"; 
        loaderCargando.classList.remove("hidden");
        resultTitle.textContent = "Capturando el mensaje";
        resultText.textContent = "";
    }
});

//El botón para encriptar
encryptButton.addEventListener("click", (e) =>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultText.textContent = mensajeEncriptado;
    copyButton.classList.remove("hidden")
    resultTitle.textContent = "El resultado es:";
});


// El botón para desencriptar
decryptButton.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultText.textContent = mensajeDesencriptado;
    copyButton.classList.remove("hidden")
    resultTitle.textContent = "El resultado es:"; // Actualiza el título
});

copyButton.addEventListener('click', ()=>{
    let copiedText = resultText.textContent;
    navigator.clipboard.writeText(copiedText).then(()=>{
        imgMuneco.style.display = "none";
        loaderCargando.classList.add("hidden")
        resultTitle.textContent = "Texto copiado"
        copyButton.classList.add("hidden");
        resultText.textContent = ""
    })
});

