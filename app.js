class Calculator {

constructor(lowerDisplay, upperDisplay){
    this.lowerDisplay = lowerDisplay; // this is the current/first diaply
    this.upperDisplay = upperDisplay; // subsequent display
    this.clearAll();
    this.dayTheme = false;
    this.computed = false;
    this.historyArray = [];
    this.historyAdded = false;
}

clearAll(){
    this.currentDisplay = "";
    this.previousDisplay = "";
    this.mathSymbol = undefined;
    this.historyArray = [];
    this.computed = false;
}

deleteLast(){
    this.currentDisplay = this.currentDisplay.toString().slice(0, -1)
}

//our numbers on pressed are passed into this function
toPassNum(num){
    if(num === "." && this.currentDisplay.includes(".")){
        return;
    }
    this.currentDisplay = this.currentDisplay.toString() + num.toString();
    
}

chooseOperation(symbol) {
    if(this.currentDisplay === "") {
        return;
    }
    
    this.mathSymbol = symbol;
    this.previousDisplay = this.currentDisplay;
    this.currentDisplay = ""
    console.log(this.mathSymbol, "line 28");
    
    if (symbol === "%"){
        this.percentage();
    }
}

percentage(){
    this.perComp = parseFloat(this.previousDisplay) / 100;
    this.currentDisplay = this.perComp  
}

compute(){
    let computation;
    const previousNumber = parseFloat(this.previousDisplay);
    const currentNumber = parseFloat(this.currentDisplay);
    
    if(isNaN(previousNumber) || isNaN(currentNumber)){
        return;
    }
    
    switch(this.mathSymbol){
        case "÷":
        computation = previousNumber / currentNumber;
        break;

        case "×":
        computation = previousNumber * currentNumber;
        break;

        case "-":
        computation = previousNumber - currentNumber;
        break;

        case "+":
        computation = previousNumber + currentNumber;
        break;

        default:
        return;
    }
    
    this.currentDisplay = computation;
    this.mathSymbol = undefined;
    this.previousDisplay = "";
    if(this.computed) {
        this.historyArray.push(`${this.upperDisplay.innerText} ${ this.lowerDisplay.innerText}`);
    }
    
}

getDisplayNum(num) {
    const numberString = num.toString();
    const integerDigits = parseFloat(numberString.split(".")[0]);
    const decimalDigits = numberString.split(".")[1];
    let integerDisplay;
    
    if(isNaN(integerDigits)){
        integerDisplay = "";
    }
    else{
        integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
    }
    
    if(decimalDigits !== undefined){
        return `${integerDisplay}.${decimalDigits}`;
    }
    else{
        return integerDisplay
    }
}

updateDisplay(){
    this.lowerDisplay.innerText = this.getDisplayNum(this.currentDisplay);

    if(this.mathSymbol !== undefined) {
        this.upperDisplay.innerText = `${this.getDisplayNum(this.previousDisplay)} ${this.mathSymbol}`
    }
    else{
        this.upperDisplay.innerText = ""
    }
    if(this.computed){
        this.historyArray.push( " = ", this.lowerDisplay.innerText);
    }
} 

hambugerPopUp() {
    let popup = document.querySelector(".popup-container");
    popup.classList.toggle("show");
}

toggleColors(){
    const root = document.documentElement;

    if(this.dayTheme) {// dark theme color
        root.style.setProperty('--clear-color', '#45436A');
        root.style.setProperty('--symbol-bg', '#364A5A');
        root.style.setProperty('--main-bg', '#1A1C1E');
        root.style.setProperty('--equal-bg', '#004D66');
        root.style.setProperty('--numbers-bg', '#1D2528');
        root.style.setProperty('--numbers-color', '#B8D4E5');
        root.style.setProperty('--body-color', '#232946');
        root.style.setProperty('--white', '#FFFFFF');
        newdiv.style.backgroundColor = "#364A5A";
        newdiv.style.color = "#B8D4E5";
        this.dayTheme = false;

    } 
    else {// light theme color
        root.style.setProperty('--clear-color', '#E4DFFF');
        root.style.setProperty('--symbol-bg', '#D0e6f2');
        root.style.setProperty('--main-bg', '#FBFCFE');
        root.style.setProperty('--equal-bg', '#C0E8FE');
        root.style.setProperty('--numbers-bg', '#EFF4F6');
        root.style.setProperty('--numbers-color', '#092028');
        root.style.setProperty('--body-color', '#e2daeb');
        root.style.setProperty('--white', '#092028');
        newdiv.style.backgroundColor = "#D0e6f2";
        newdiv.style.color = "#092028";
        this.dayTheme = true; 
    }
}  
}

const solutionArea = document.querySelector("#solution");
const hambuger = document.querySelector(".fa-ellipsis-vertical");
let lowerDisplay = document.querySelector("#display-top");
let upperDisplay = document.querySelector("#display-bottom");
const historyBtn = document.querySelector("#history");
const themeBtn = document.querySelector("#theme");
const collapseIcon = document.querySelector(".fa-minus")

const clearLast = document.querySelector("#clear");
const clearAll = document.querySelector("#clear-all");
const solution = document.querySelector("#equals");
const allNums = document.querySelectorAll(".number");
const allSymbols = document.querySelectorAll(".symbol");

const calculator = new Calculator(upperDisplay, lowerDisplay); 

allNums.forEach(btn => {
    btn.addEventListener("click", ()=> {
    calculator.toPassNum(btn.innerText);
    calculator.updateDisplay();
    })
})

allSymbols.forEach(symb => {
    symb.addEventListener("click", ()=> {
    calculator.chooseOperation(symb.innerText);
    calculator.updateDisplay();
    })
})

clearAll.addEventListener("click", ()=>{
    calculator.clearAll();
    calculator.updateDisplay();
})

clearLast.addEventListener("click", ()=>{
    calculator.deleteLast();
    calculator.updateDisplay();
});



solution.addEventListener("click", ()=>{
    calculator.computed = true
    calculator.compute();
    calculator.updateDisplay();
    creationFunc();
    calculator.historyAdded = true
})

hambuger.addEventListener("click", ()=> {
    calculator.hambugerPopUp();
});

let historyArray2 = [];
let arrayText;
let newdiv = document.createElement("div");
let newH2;

function creationFunc() {
    arrayText = calculator.historyArray.join("");
    newh2 = `<h2>${arrayText}</h2><br>`;
    
    newdiv.className = "history-div";
    newdiv.style.width = "100%";
    newdiv.style.height = "200px";
    newdiv.style.borderTop = "2px solid #B8D4E5";
    newdiv.style.position = "absolute";
    newdiv.style.top = "35%";
    newdiv.style.textAlign = "left";
    newdiv.insertAdjacentHTML("afterbegin", newh2);
    
    historyArray2.push(arrayText);
    if(historyArray2["length"] > 8) {
    newdiv.removeChild(newdiv.lastElementChild);
    newdiv.removeChild(newdiv.lastChild); 
    }
}

let historyShown = false;
historyBtn.addEventListener("click", ()=>{
    historyShown = true;
    collapseIcon.style.top = "90%";
    if(historyShown){
    solutionArea.style.height = "350px";
    newdiv.style.visibility = "visible";
    solutionArea.insertAdjacentElement("beforeend", newdiv);
    } 
});

collapseIcon.addEventListener("click", ()=> {
    if(historyShown){
    solutionArea.style.height = "150px";
    newdiv.style.visibility = "hidden";
    collapseIcon.style.top = "85%";
    }
});

themeBtn.addEventListener("click", ()=>{
    calculator.toggleColors();
})


