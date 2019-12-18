var app, io;

$(document).ready(function(){
    var app = new Vue({
        el: "#app",
        data: {
          display: "0",
          operator: null,
          firstOperand: null,
          waitingForSecondOperand: false,
          sockets: 0,
        },
        methods: {
          reset: function(){
            this.display = '0';
            this.firstOperand = null;
            this.waitingForSecondOperand = false;
            this.operator = null;
          },
          inputDigit: function(digit){
            if (this.waitingForSecondOperand === true) {
              this.display = digit.toString();
              this.waitingForSecondOperand = false;
            } else {
              if(this.display.toString().length < 8){
                this.display = this.display === '0' ? digit : this.display + digit.toString();  
              }
            }
          },
          inputOperator: function (nextOperator) {

            if (this.operator && this.waitingForSecondOperand) {
              this.operator = nextOperator;
              return;
            }
    
            const inputValue = parseFloat(this.display);

            if (this.firstOperand == null) {
              this.firstOperand = inputValue;
            } else if (this.operator) {
              var currentValue = this.firstOperand || 0;
              
              this.sendRequest(this.operator, currentValue, parseFloat(this.display));
            }
    
            this.waitingForSecondOperand = true;
            if(nextOperator == "equal"){
              this.operator = null;
            }else{
              this.operator = nextOperator;
            }
            
          },
          inputDecimal: function () {
            // If the `displayValue` does not contain a decimal point
            if (!this.display.includes('.')) {
              // Append the decimal point
              this.display += '.';
            }
          },
          sendRequest: function(operator, op1, op2){
            io.emit("request", operator + "|" + op1 + "|" + op2);
          },
          receiveRequest: function(result){
            this.display = String(result);
            this.firstOperand = result;
          },
          receiveSocketList: function(list){
            this.sockets = list.filter(function(i){
              return i.writable === true
            }).length;
          }
        }
    });
    io = io();
    io.on('response', function(result){
      app.receiveRequest(result);
    });
    io.on('status', function(list){
      app.receiveSocketList(list);
    });
});


  