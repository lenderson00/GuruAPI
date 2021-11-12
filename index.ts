const data = new Date
const UTC = data.toUTCString()
const back = new Date(UTC)
console.log("Formato compreensível, mas pesado: " + UTC)
console.log("Formato incompreensível, mas leve: " + Date.now())
console.log("Conversão da string em milisegundos: " + back.getTime())