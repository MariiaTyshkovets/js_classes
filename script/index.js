// 1. Реалізуй клас, що описує коло. У класі повинні бути такі компоненти:
// - поле, що зберігає радіус кола;
// - get-властивість, яка повертає радіус кола;
// - set-властивість, що встановлює радіус кола;
// - get-властивість, яка повертає діаметр кола;
// - метод, що обчислює площу кола;
// - метод, що обчислює довжину кола.
// Продемонструй роботу властивостей і методів.

let isPositiveNumber = (num) => {
    if (+num == num && num >= 0) {
        return true;
    } else {
        return false;
    }
}

class Circle {
    constructor (radius) {
        if (isPositiveNumber(radius)){
            this.radius = radius;
        } else {
            console.log("The radius of circle should be positive number.") ;
        } 
    }

    getRadius () {
        return this.radius;
    }

    setRadius (number) {
        isPositiveNumber(number) ? this.radius = number : console.log("The radius of circle should be positive number.") ;
    }

    getDiameter () {
        return this.radius*2;
    }

    calcAreaOfCircle () {
        return ( Math.PI * Math.pow(this.radius, 2) ).toFixed(1);
    }

    calcLengthOfCircle () {
        return ( Math.PI * this.getDiameter() ).toFixed(1);
    }
}

let circle_1 = new Circle(-15);
console.log(`The radius of circle is ${circle_1.getRadius()}`);
circle_1.setRadius(10);
console.log(`The radius of circle is ${circle_1.getRadius()}`);
circle_1.setRadius("sf");
console.log(`The radius of circle is ${circle_1.getRadius()}`);
console.log(`The diameter of circle is ${circle_1.getDiameter()}`);
console.log(`The area of the circle is ${circle_1.calcAreaOfCircle()}`);
console.log(`The length of the circle is ${circle_1.calcLengthOfCircle()}`);

// 2. Реалізуй клас, що описує канцелярський маркер. У класі повинні бути такі компоненти:
// - поле, яке зберігає колір маркера; - поле, яке зберігає кількість чорнил у маркері (у %),
// - метод для вводу (приймає рядок і виводить текст відповідним кольором; текст виводиться до тих пір, 
// поки в маркері є чорнило; один не пробільний символ - це 0,5% чорнил у маркері)
// Реалізуй клас, що описує маркер, який можна перезаправляти. Успадкуй цей клас від простого маркера і додай метод для заправки.
// Продемонструй роботу написаних методів.

class Marker {
    constructor (color) {
        this.color = color;
        this.inkVolume = 100;
    }

    inputTextAndPrint() {
        let text = prompt(`Enter the text.`);
        let par = document.createElement('p');
        document.body.appendChild(par);
        par.style.color = this.color;
        let str = text.replace(/\s+/g, '');

        if (this.inkVolume > str.length/2) {    
            par.textContent = text;
            this.inkVolume -= str.length/2;
            console.log(`Your ink volume is ${this.inkVolume}.`)
        } else {
            console.log(`The amount of ink in the marker is not enough to write the whole text.`); 
            let substr = text.substring(0, this.inkVolume*2);
            str = substr.replace(/\s+/g, '');
            let numberOfSpace = substr.length - str.length;
            if (numberOfSpace == 0) {
                par.textContent = substr;
            } else {
                substr = text.substring(0, this.inkVolume*2 + numberOfSpace);
                par.textContent = substr + `...`;
            }
            alert("The marker ink is out.")
            this.inkVolume = 0;
        }
    }
}

let redMarker = new Marker("red");
redMarker.inputTextAndPrint();

class RefillMarker extends Marker {
    constructor (color) {
        super(color);
        this.inkVolume = 100;
    }

    inputTextAndPrint () {
        super.inputTextAndPrint();
    }

    refill () {
        this.inkVolume = 100;
        console.log(`Your ink volume is already full.`)
    }
}

let blueMarker = new RefillMarker("blue");
blueMarker.inputTextAndPrint();
blueMarker.inputTextAndPrint();
blueMarker.refill();
blueMarker.inputTextAndPrint();

// 3. Реалізуй клас Employee, що описує працівника, і створи масив працівників банку.
// Реалізуй клас EmpTable для генерації HTML-коду таблиці зі списком працівників банку.
// Масив працівників необхідно передавати через конструктор, а отримувати HTML-код за допомогою методу getHtml().
// Створи об'єкт класу EmpTable і виведи на екран результат роботи методу getHtml().

class Employee {
    constructor (firstname, lastname, age, position) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.position = position;
    }
}

let employee_1 = new Employee("Mariia", "Tyshkovets", 26, "engineer");
let employee_2 = new Employee("Alla", "Mytrophanova", 27, "accountant");
let employee_3 = new Employee("Andrew", "Tyshkovets", 27, "programmer");
let employee_4 = new Employee("Semen", "Malyy", 15, "cleaner");
let employee_5 = new Employee("Petro", "Gorbatyy", 70, "secretary");


let employees = [employee_1, employee_2, employee_3, employee_4, employee_5];

class EmpTable {
    constructor (array) {
        let newArray = [];
        newArray = array.map(a => {
            let employee = {};
            Object.keys(a).forEach(propertyKey => {
                employee[propertyKey] = a[propertyKey];
            });
            return employee;
        });
    }

    getHTML () {
        let tbody = document.getElementsByClassName("tbody")[0];
        for (let i = 0; i < employees.length; i++) {
            let tr = document.createElement("TR");
            tbody.appendChild(tr);
            for (const property in employees[i]) {
                let td = document.createElement('TD');
                td.innerHTML = employees[i][property];
                tr.appendChild(td);
              }
        }
    }
}

let empTable = new EmpTable(employees);
empTable.getHTML();