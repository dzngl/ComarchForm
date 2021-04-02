// string.toUpperCase()
// string.substring(0, 5) - wyswietla string tylko od 1 do 6 znaku
// string.split('') - rozdziela string na czesci po kazdym ''

//const form =  document.getElementById('first-form')
const form1 =  document.querySelector('#first-form') //po # pobierana jest wartosc z id
const nameInput = document.querySelector('#name')
const surnameInput = document.querySelector('#surname')
const phoneInput = document.querySelector('#phone')
const emailInput = document.querySelector('#email')
const msg1 = document.querySelector('#msg1')
const btn1 = document.querySelector('#btn1')

const listItem1 = document.querySelector('#listItem1')
const listItem2 = document.querySelector('#listItem2')
const listItem3 = document.querySelector('#listItem3')
const listItem4 = document.querySelector('#listItem4')
const listItem5 = document.querySelector('#listItem5')
const listItem6 = document.querySelector('#listItem6')
const listItem7 = document.querySelector('#listItem7')
const listItem8 = document.querySelector('#listItem8')
const listItem9 = document.querySelector('#listItem9')

btn1.addEventListener('click', (e) => {
    
    e.preventDefault()
    let message = ''
    
    if(nameInput.value === '' && surnameInput.value === ''){
        message = 'Imię i nazwisko nie może być puste'
    }

    else if(nameInput.value === '') {
		message = 'Imię nie może być puste'
    }

    else if(surnameInput.value === ''){
        message = 'Nazwisko nie może być puste'
    }

    else if(phoneValidation(phoneInput)!==true){
        message = "Niepoprawny numer"
    }
    else if (emailValidation(emailInput)!==true){
        message = "Niepoprawny mail"
    }

    if(message.length > 0){
        msg1.classList.add('error')
        msg1.innerHTML = message
    }

    else{
        
        listItem1.innerHTML = nameInput.value
        listItem2.innerHTML = surnameInput.value
        listItem3.innerHTML = phoneInput.value
        listItem4.innerHTML = emailInput.value
        form1.style.display="none"
        form2.style.display="block"
    }
})

function phoneValidation(input)
    {
        const phoneformat = /^\(?([0-9]{3})\)?[ ]?([0-9]{3})[ ]?([0-9]{3})$/ // format cyfrowy XXX XXX XXX
        if(input.value.match(phoneformat) || input.value === ''){
            return true;      
        }
        else{
            return false
        }
    }

function emailValidation(input)
    {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        if (input.value.match(pattern) || input.value === ''){
            return true
        }
        else{
            return false
        }

    }


const form2 = document.querySelector('#second-form')
const peselInput = document.querySelector('#pesel')
const dateInput = document.querySelector('#dateofbirth')
const typeofdocSelector = document.querySelector('#typeofdoc')
const nrofdocInput = document.querySelector('#nrofdoc')
const msg2 = document.querySelector('#msg2')
const btn2 = document.querySelector('#btn2')

const list1 = document.querySelector('#list1')



btn2.addEventListener('click', (e) => {
    
    e.preventDefault()
    let message = ''

    if(!dateFromPesel(peselInput.value) || peselInput.value.length !== 11 ){
        message = 'Niepoprawny PESEL'
    }
    else if(typeofdocSelector.value==="choose"){
        message = 'Wybierz typ dokumentu'
    }
    else if(nrofdocInput.value===""){
        message = 'Podaj numer dokumentu tożsamości'
    }

    if(message.length > 0){
        msg2.classList.add('error')
        msg2.innerHTML = message
    }
    else{
        form2.style.display="none"
        clearInterval(myVar)
        listItem5.innerHTML = peselInput.value
        listItem6.innerHTML = dateFromPesel(peselInput.value)
        listItem7.innerHTML = typeofdocSelector.value
        listItem8.innerHTML = nrofdocInput.value
        listItem9.innerHTML = "Czas wypełnienia wniosku:  " + currentTime.toString()
        list1.style.display="block"

    }
})

// WERYFIKACJA NUMERU PESEL I WYPISYWANIE DATY
function dateFromPesel(input){
    const yearfrompesel = input.toString().substring(0,2)
    const currentyear = new Date().getFullYear().toString().substring(2,4)
    let dateYear = ''
    let dateFromPesel = ''

    if(yearfrompesel > currentyear){
        dateYear = "19" + yearfrompesel
    }
    else if(yearfrompesel <= currentyear){
        dateYear = "20" + yearfrompesel
    }
    else{
        return false
    }

    const monthFromPesel = input.toString().substring(2,4)
    let dateMonth = ''
    
    if(monthFromPesel < 13){
        dateMonth = monthFromPesel
    }
    else{
        return false
    }

    const dayFromPesel = input.toString().substring(4,6)
    let dateDay = ''

    if(dayFromPesel < 32){
        dateDay = dayFromPesel
    }
    else{
        return false
    }
    if(dateYear === '' || dateMonth === '' || dateDay === ''){
        return false
    }else{
        dateFromPesel = dateDay + '-' + dateMonth + '-' + dateYear
        return dateFromPesel
    }
    
}

// DODAWANIE DATY DO POLA Z DATĄ
function addDate(){
    if(peselInput.value.length === 11 && !dateFromPesel(peselInput)){
        dateInput.innerHTML = dateFromPesel(peselInput.value)
    }
}

// ZMIANA LABELKI DOTYCZĄCEJ NUMERU DOWODU  
function changeDocLabel(){
    let label = document.querySelector('#nrofdoclabel')
    if(typeofdocSelector.value === 'Dowód osobisty'){
        label.innerHTML = "Numer dowodu osobistego:"
    }
    else if(typeofdocSelector.value === 'Paszport'){
        label.innerHTML = 'Numer paszportu:'
    }
    else{
        label.innerHTML = "Numer dokumentu tożsamości:"
    }
}

// TIMER
const startingMinutes = 5
let time = startingMinutes * 60
const timer = document.querySelector('#timer1','#timer2')
myVar = setInterval(updateTimer, 1000)

function updateTimer(){
    const minutes = Math.floor(time/60)
    let seconds = time % 60
    if(minutes == '0' && seconds == '00'){
        alert('Przerwanie wypełniania formularza z powodu przekroczenia czasu oczekiwania')
        location.reload()
    }
    if  (seconds < 10){
        seconds = '0' + seconds
    }
    else{
        seconds
    }
    currentTime = minutes +':' +seconds
    timer.innerHTML = currentTime
    time--
}



