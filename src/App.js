import './App.css';
import { useState } from 'react';
/**
 * @function Calculator Displays a calculator with addition, subtraction,
 * multiplication, and division operations. Also allows clearing of input
 * 
 * @param {String} onDisplay The value/equation displayed by calculator
 * @method setDisplay Sets the displayed value/equation on calculator
 */
function Calculator() {
  const [onDisplay, setDisplay] = useState("");
  /**
 * @function parse Parses equation string to numbers and operators,
 * returns mathematical solution
 * 
 * @param {String} str The equation string
 */
  function parse(str) {
    return Function(`'use strict'; return (${str})`)()
  }
  /**
 * @function checkDecimal Checks equation string against a regex expression,
 * checking whether adding a decimal is a legal operation
 * 
 * @param {String} str The equation string
 */
  function checkDecimal(str) {
    if ((/(\.\d*)$/g).test(str) == false) {
      return true;
    } return false;
  }
  /**
 * @function checkOperator Checks equation string against a regex expression,
 * checking whether adding an addition, multiplication, or division operator
 *  is a legal operation
 * 
 * @param {String} str The equation string
 */
  function checkOperator(str) {
    if ((/(\*+|\/+|\++)$/g).test(str) == false) {
      return true;
    } return false;
  }
  /**
 * @function checkDecimal Checks equation string against a regex expression,
 * checking whether adding a zero is a legal operation
 * 
 * @param {String} str The equation string
 */
  function checkLeadingZero(str) {
    if ((/([1-9\.]\d+|[1-9\.])$/g).test(str) == true) {
      return true;
    } return false;
  }
  /**
 * @function handleClick When a button is clicked, uses a switch statement on
 * target button name, and updates currently displayed equation if a legal operation
 * 
 * @param {Element} event The button clicked
 */
  function handleClick(event) {
    let val = event.target.name;
    switch (val) {
      case 'C':
        setDisplay('');
        break;
      case '=':
        setDisplay(parse(onDisplay));
        break;
      case '.':
        if (checkDecimal(onDisplay)) setDisplay(onDisplay + val);
        break;
      case '*':
      case '/':
      case '+':
        if (onDisplay != '' && checkOperator(onDisplay)) {
          if ((/\-$/).test(onDisplay)) {
            if ((/(\*+|\/+|\++)\-$/).test(onDisplay)) {
              setDisplay(onDisplay.substring(0,onDisplay.length-2) + val);
            } else {
              setDisplay(onDisplay.substring(0,onDisplay.length-1) + val);
            }
          }
          else setDisplay(onDisplay + val);
        } else if (onDisplay != '') {
          setDisplay(onDisplay.substring(0,onDisplay.length-1) + val);
        }
        break;
      case '0':
        if (checkLeadingZero(onDisplay)) setDisplay(onDisplay + val);
        break;
      case '-':
        if ((/\-$/).test(onDisplay) == false) {
          setDisplay(onDisplay + val);
        }
        break;
      case '9':
      case '8':
      case '7':
      case '6':
      case '5':
      case '4':
      case '3':
      case '2':
      case '1':
        setDisplay(onDisplay + val);
    }
  }
  return (
    <div id="calc-container">
      <div id="display">
        <span>{onDisplay == '' ? 0 : onDisplay}</span>
      </div>
      <div className="button-container">
        <button onClick={handleClick} id="clear" name="C" value="C">C</button>
        <button onClick={handleClick} id="divide" name="/">÷</button>
        <button onClick={handleClick} id="seven" name="7">7</button>
        <button onClick={handleClick} id="eight" name="8">8</button>
        <button onClick={handleClick} id="nine" name="9">9</button>
        <button onClick={handleClick} id="multiply" name="*">×</button>
        <button onClick={handleClick} id="four" name="4">4</button>
        <button onClick={handleClick} id="five" name="5">5</button>
        <button onClick={handleClick} id="six" name="6">6</button>
        <button onClick={handleClick} id="subtract" name="-">-</button>
        <button onClick={handleClick} id="one" name="1">1</button>
        <button onClick={handleClick} id="two" name="2">2</button>
        <button onClick={handleClick} id="three" name="3">3</button>
        <button onClick={handleClick} id="add" name="+">+</button>
        <button onClick={handleClick} id="zero" name="0">0</button>
        <button onClick={handleClick} id="decimal" name=".">.</button>
        <button onClick={handleClick} id="equals" name="=">=</button>
      </div>
    </div>
  );
}
/**
 * @function App Container for {@link Calculator}
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />

      </header>
    </div>
  );
}

export default App;
