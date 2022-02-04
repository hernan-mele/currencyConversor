import FetchWrapper from "./fetch-wrapper.js";

const API = new FetchWrapper("https://v6.exchangerate-api.com/v6/b9ae8ab19124a202b5b00fb8/");

const list = document.querySelector("#base-currency");
const convertedList = document.querySelector("#target-currency");
const quantity = document.querySelector("#quantity");
const resultado = document.querySelector('#resultado')

let value = parseInt(quantity.value, 10);

API.get(`latest/ARS`)
    .then(data => {
        const listOfCurrencies = Object.keys(data.conversion_rates);
        renderList(listOfCurrencies);
    })

const renderList = currencies => {
    currencies.forEach(currency => {
        list.insertAdjacentHTML("beforeend", `<option value="${currency}">${currency}</option>`);
        convertedList.insertAdjacentHTML("beforeend", `<option value="${currency}">${currency}</option>`)
    })
}

const getConversionRates = () =>{
    API.get(`latest/${list.value}`)
    .then(data => {
        console.log(data.conversion_rates)
        resultado.textContent = data.conversion_rates[convertedList.value] * value
    })
}
list.addEventListener("change", getConversionRates)

convertedList.addEventListener("change", getConversionRates)
