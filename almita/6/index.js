/*alert('hola');

localStorage.setItem('Darkmode', true)

//Obtener el valor de las variables
const valor = localStorage.getItem('Darkmode')
console.log('El valor es' + valor)

//localStorage.removeItem('Darkmode');

const NameKey = 'name'
sessionStorage.setItem(NameKey, 'Isaquito')

const valor1 = sessionStorage.getItem(NameKey)
console.log('El valor es' + valor1)

//Eliminar la sessionStorage
sessionStorage.removeItem(NameKey);*/

const person = {
    name: 'Isaac',
    age: 22,
}
const ssPersonKey = "person"
sessionStorage.setItem(ssPersonKey, JSON.stringify(person))
const ssPerson = JSON.parse(sessionStorage.getItem(ssPersonKey))

console.log(ssPerson.name)
console.log(ssPerson.age)

