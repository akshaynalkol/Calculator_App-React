import React, { useEffect, useState } from 'react';

import Header from './Component/Header/Header';
import KeyPad from './Component/KeyPad/KeyPad';

import './App.css';

import sun_icon from './Assets/sun.png';
import moon_icon from './Assets/moon.png'


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("historyDarkMode")) || false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("historyData")) || []);

  const usedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
    8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["-", "+", "*", "/"];

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;
    if (numbers.includes(key)) {
      if (key === '0') {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    }
    else if (operators.includes(key)) {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === '.') return;
      setExpression(expression + key);
    }
    else if (key === '.') {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExpression(expression + key);
    }
    else if (keyCode === 8) {
      if (!expression) return;
      if (expression.length === 1) {
        calculateResult('0');
      }
      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    }
    else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      const temp = [...history];
      if (temp.length > 20) temp = temp.splice(0, 1);
      temp.push(expression);
      setHistory(temp);
    }
  }

  const calculateResult = (exp) => {
    if (!exp) return;

    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const ans = eval(exp).toFixed(2) + "";
    setResult(ans);
  }

  useEffect(() => {
    localStorage.setItem("historyDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("historyData", JSON.stringify(history));
  }, [history]);

  return (
    <>
      <div className="calculator_app d-flex justify-content-center align-items-center"
        data-theme={isDarkMode ? "dark" : ""} tabIndex="0" onKeyDown={(e) => handleKeyPress(e.keyCode, e.key)}>
        <div className="calculator shadow">
          <div className="calculator_navbar d-flex">
            <div className='form-check form-switch'>
              <input type='checkbox' className='form-check-input'
                onClick={() => setIsDarkMode(!isDarkMode)} />
            </div>
            <img src={isDarkMode ? moon_icon : sun_icon} alt='mode' className='w-25 h-100 ms-2' />
          </div>
          <Header expression={expression} result={result} history={history} />
          <KeyPad handleKeyPress={handleKeyPress} />
        </div>
      </div >
    </>
  )
}