import "./App.css";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";

//import Qr from './components/qr';
function App() {
  //make value of qr code and increment it every second and rerender the qr code
  const [value, setValue] = useState("10000000");
  const [perSec, setPerSec] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const numValue = Number(value)
      const newValue = numValue +1;
      const newStringValue  = newValue.toString();
      const newStringValuePadded = newStringValue.padStart(8, "0");
      setValue(newStringValuePadded);
    }, perSec);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="App">
      <div className="App-header">
        <div className="flex">
        <button className="secButton" onClick={()=>{
          if(perSec > 1000){
          setPerSec(perSec-1000)
          }
          }}>&#x2212;</button>
        <button className="secButton" onClick={()=>{setPerSec(perSec+1000)}}>&#x2b;</button>
        </div>
        <div style={{marginBottom: "24px"}}>{perSec / 1000 + "sec"}</div>
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 180,
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
          <h3>ID: {value}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
