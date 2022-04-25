import './App.css';
import { useState } from 'react'
import { ones, tens, hundreds, thousands } from './romanNumerals'

function App() {
  const [number, setNumber] = useState();
  const [numeral, setNumeral] = useState();
  const [chart, setChart] = useState();

  const convertToRomanNumeral = (num) => {
    let digit = String(num).replace(/^0+/, '')

    return digit.length === 1 ? ones[num] :
      digit.length === 2 ? `${tens[digit[0]]}${ones[digit[1]]}` :
        digit.length === 3 ? `${hundreds[digit[0]]}${tens[digit[1]]}${ones[digit[2]]}` :
          digit.length === 4 ? `${thousands[digit[0]]}${hundreds[digit[1]]}${tens[digit[2]]}${ones[digit[3]]}` : ''

  }

  const romanNumeralChart = (num) => {
    let digit = String(num)

    if (digit.length === 1) return `${ones[num]} = ${num}`;
    else if (digit.length === 2) {
      return (digit[1] !== '0') ? `${tens[digit[0]]} = ${digit[0]}0 + ${ones[digit[1]]} = ${digit[1]}` :
        `${tens[digit[0]]} = ${digit[0]}0`;
    }
    else if (digit.length === 3) {
      return (digit[1] !== '0' && digit[2] !== '0') ?
       `${hundreds[digit[0]]} = ${digit[0]}00 + ${tens[digit[1]]} = ${digit[1]}0 + ${ones[digit[2]]} = ${digit[2]}` :
        (digit[1] === '0' && digit[2] !== '0') ? `${hundreds[digit[0]]} = ${digit[0]}00 + ${ones[digit[2]]} = ${digit[2]}` :
          (digit[1] !== '0' && digit[2] === '0') ? `${hundreds[digit[0]]} = ${digit[0]}00 + ${tens[digit[1]]} = ${digit[1]}0` :
            `${hundreds[digit[0]]} = ${digit[0]}00`;
    }
    else if (digit.length === 4) {
      return (digit[1] === '0' && digit[2] === '0' && digit[3] === '0') ? `${thousands[digit[0]]} = ${digit[0]}000` :
        (digit[1] === '0' && digit[2] === '0' && digit[3] !== '0') ?
          `${thousands[digit[0]]} = ${digit[0]}000 + ${ones[digit[3]]} = ${digit[3]}` :
          (digit[1] === '0' && digit[2] !== '0' && digit[3] === '0') ?
            `${thousands[digit[0]]} = ${digit[0]}000 + ${tens[digit[2]]} = ${digit[2]}0` :
            (digit[1] === '0' && digit[2] !== '0' && digit[3] !== '0') ?
              `${thousands[digit[0]]} = ${digit[0]}000 + ${tens[digit[2]]} = ${digit[2]}0 + ${ones[digit[3]]} = ${digit[3]}` :
              (digit[1] !== '0' && digit[2] === '0' && digit[3] === '0') ?
                `${thousands[digit[0]]} = ${digit[0]}000 + ${hundreds[digit[1]]} = ${digit[1]}00` :
                (digit[1] !== '0' && digit[2] === '0' && digit[3] !== '0') ?
                  `${thousands[digit[0]]} = ${digit[0]}000 + ${hundreds[digit[1]]} = ${digit[1]}00 + ${ones[digit[3]]} = ${digit[3]}` :
                  (digit[3] === '0') ?
                    `${thousands[digit[0]]} = ${digit[0]}000 + ${hundreds[digit[1]]} = ${digit[1]}00 + ${tens[digit[2]]} = ${digit[2]}0` :
                    `${thousands[digit[0]]} = ${digit[0]}000 + ${hundreds[digit[1]]} = ${digit[1]}00 + ${tens[digit[2]]} = ${digit[2]}0 + ${ones[digit[3]]} = ${digit[3]}`
    }
  }

  const onClick = () => {
    setNumeral(convertToRomanNumeral(number))
    setChart(romanNumeralChart(number))
  }

  return (
    <div className="App">
      <h1 className='title'>ROMAN NUMERAL CONVERTER</h1>
      <div className="container">
        <input placeholder={0} type="text" value={number ? number.replace(/^0+/, '') : ''} maxLength={4}
          onInput={e => setNumber(e.target.value.replace(/[^0-9]/g, ''))} onKeyDown={e => e.charCode >= 48 && e.charCode <= 57} />
        <br />
        <button onClick={() => onClick()}>CONVERT NUMBER</button>
        {chart ? <h2 className='chart'>{chart}</h2> : ''}
        <h1 className='numeral'>{numeral}</h1>
      </div>
    </div >
  );
}

export default App;