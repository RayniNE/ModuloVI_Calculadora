import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"]
})
export class CalculatorComponent implements OnInit {
  currentNumber = "0";
  primerOperand = null;
  operador = null;
  esperandoSegundoNum = false;
  calculosStorage: string[] = [];
  resultado = null;

  show = document.getElementById('show');

  constructor() {}

  ngOnInit(): void {}

  public getNumber(v: string) {
    console.log(v);
    if (this.esperandoSegundoNum) {
      this.currentNumber = v;
      this.esperandoSegundoNum = false;
    } else {
      this.currentNumber === "0"
        ? (this.currentNumber = v)
        : (this.currentNumber += v);
    }
  }

  public getDecimal() {
    if (!this.currentNumber.includes(".")) {
      this.currentNumber += ".";
    }
  }

  private doCalculation(operation, segundaOp) {
    switch (operation) {
      case "+":
        return (this.primerOperand += segundaOp);
      case "-":
        return (this.primerOperand -= segundaOp);
      case "*":
        return (this.primerOperand *= segundaOp);
      case "/":
        return (this.primerOperand /= segundaOp);
      case '=':
        return segundaOp;

    }

  }

  private showResult(resultado){
    switch(resultado){
    case '+':
      return resultado;
    }
  }

  public getOperation(op: string) {
    //console.log(op);

    if (this.primerOperand === null) {
      this.primerOperand = Number(this.currentNumber);
    } else if (this.operador) {
      const resultado = this.doCalculation(
        this.operador,
        Number(this.currentNumber)
      );

      //const result = this.showResult(resultado);
      //console.log(result);
      this.currentNumber = String(resultado);
      this.primerOperand = resultado;
    }
    this.operador = op;

    this.esperandoSegundoNum = true;
    this.resultado = this.primerOperand;
    console.log(this.resultado);
    this.calculosStorage.push(this.resultado);

    localStorage.setItem("calculos", JSON.stringify(this.calculosStorage));
  }

  public clear() {
    this.currentNumber = "0";
    this.primerOperand = null;
    this.operador = null;
    this.esperandoSegundoNum = false;
  }

  public getLocalStorage() {
    var numbers: number[] = JSON.parse(localStorage["calculos"]);
    let final = numbers.length - 1;
    const ss = document.getElementById('show');
      ss.innerHTML += `
      <ul>
        <li> ${numbers[final]} </li>
      </ul>
      `
  }
}
