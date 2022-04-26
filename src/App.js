import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';
import Values from 'values.js';
import ChromeColor from '@uiw/react-color-chrome';
import { useEffect, useState } from "react";
import { shape } from 'prop-types';


function App() {
  const [color, setColor] = useState('#fff')
  const [shades, setShades] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (color) => {
    console.log(color.hex);
    setColor(color.hex)
    const colorValues = new Values(color.hex);
    const newColors = colorValues.all(10);
    newColors.pop();        //saca el ultimo color de los 20 q me trae
    console.log(newColors);
    setShades(newColors);

  };
  useEffect(() => {
    onChange({hex: '#FFA500'})
  }, []);
  


  return (
    <div className="wrapper">
      <h1 className="heading">SHADES GENERATOR <span onClick={() => setShowPicker(!showPicker)}>({color})</span></h1>
      <div className="color-picker">
        {
        showPicker && <ChromeColor color={color} onChange={onChange}/>
        }
      </div>
      <div className="shades">
        <ul className="shades-list">
          {
            shades.map(shade => {
              return (<CopyToClipboard className="color-code" text={ '#' + shade.hex}>  
              <li style={{backgroundColor: '#' + shade.hex, color: shade.type === 'shade' ? 'white' : 'black' }}>
                #{shade.hex}
              </li>
              </ CopyToClipboard>)
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
