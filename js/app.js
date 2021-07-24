'use strict';
const tableHeader = ['Car Model', 'Model Year', 'Price', 'Manufacturer','Image','Delete']
const maxPrice = 100000;
const minPrice = 7000;
function Car(modelName, modelYear, manufacturer) {
    this.modelName = modelName;
    this.modelYear = modelYear;
    this.manufacturer = manufacturer;
    this.price = randomPrice();
}
function randomPrice() {
   let min = Math.ceil(minPrice);
   let max = Math.floor(maxPrice);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Cars(cars) {
    this.cars = cars;
}

Cars.prototype.addCar = function (modelName, modelYear, manufacturer) {
    this.cars.push(new Car(modelName, modelYear, manufacturer));
    this.saveToLocaleStorage();
}

Cars.prototype.removeCar = function (car) {
    this.cars.splice(car,1);
    this.saveToLocaleStorage();

}
Cars.prototype.saveToLocaleStorage = function () {
    localStorage.setItem('cars', JSON.stringify(this.cars));
}

Cars.prototype.getFromLocaleStorage = function () {
    return JSON.parse(localStorage.getItem('cars')) || [];
}

let table = document.getElementById('table');
let form = document.getElementById('form');
let totalEL = document.getElementById('total');
form.addEventListener('submit', addCar);

function addCar(event) {
    event.preventDefault();
    table.textContent = '';
    let modelName = event.target.modelName.value;
    let modelYear = event.target.modelYear.value;
    let manufacturer = event.target.manufacturer.value;

    cars.addCar(modelName,modelYear,manufacturer);
    createTableHeader();
    createTableBody();

}

function createTableHeader() {
    let tHeadEl = document.createElement('thead');
    let trEl = document.createElement('tr');
    for (let i = 0; i < tableHeader.length; i++) {
        let thEl = document.createElement('th');
        thEl.textContent = tableHeader[i];
        trEl.appendChild(thEl);
    }
    tHeadEl.appendChild(trEl);
    table.appendChild(tHeadEl);
}

let cars = new Cars();
cars.cars = cars.getFromLocaleStorage();
function createTableBody() {
    let total = 0;
    let tBodyEl = document.createElement('tbody');
    for (let i = 0; i < cars.cars.length; i++) {
        let trEl = document.createElement('tr');
        let tdEl1 = document.createElement('td');
        tdEl1.textContent = cars.cars[i].modelName;
        let tdEl2 = document.createElement('td');
        tdEl2.textContent = cars.cars[i].modelYear;
        let tdEl3 = document.createElement('td');
        tdEl3.textContent = cars.cars[i].price;
        let tdEl4 = document.createElement('td');
        tdEl4.textContent = cars.cars[i].manufacturer;
        let tdEl5 = document.createElement('td');
       
        let imgEl = document.createElement('img');
        imgEl.setAttribute('src',`images/${cars.cars[i].manufacturer}.jpg`);
        tdEl5.appendChild(imgEl);

        let tdEl6 = document.createElement('td');
        tdEl6.textContent = 'X';
        tdEl6.addEventListener('click',removeCarFromTable);

        trEl.appendChild(tdEl1);
        trEl.appendChild(tdEl2);
        trEl.appendChild(tdEl3);
        trEl.appendChild(tdEl4);
        trEl.appendChild(tdEl5);
        trEl.appendChild(tdEl6);
        tBodyEl.appendChild(trEl);
        total+=cars.cars[i].price;
    }
    table.appendChild(tBodyEl);
    totalEL.textContent = 'Total '+ total;

}


function removeCarFromTable(event){

 let row = event.target.parentNode;
 let index = row.rowIndex;

 cars.removeCar(index-1);
 table.textContent = '';
 createTableHeader();
 createTableBody();
}

createTableHeader();
createTableBody();

