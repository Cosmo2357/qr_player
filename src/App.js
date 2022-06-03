import "./App.css";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";


function App() {
  const [value, setValue] = useState("10000000");
  const [perSec, setPerSec] = useState(1000);
  const [timerSec, setTimerSec] = useState(0);
  const[timeString, setTimeString] = useState("00:00:00");
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSec(timerSec +1 );
      const numValue = Number(value)
      const newValue = numValue +1;
      const newStringValue  = newValue.toString();
      const newStringValuePadded = newStringValue.padStart(8, "0");
      setValue(newStringValuePadded);
    }, perSec);
    return () => clearInterval(interval);
  }, [value]);

  const timerSecToString = () => {
    const sec = timerSec % 60;
    const min = Math.floor(timerSec / 60);
    const hour = Math.floor(min / 60);
    const minStr = min.toString().padStart(2, "0");
    const secStr = sec.toString().padStart(2, "0");
    const hourStr = hour.toString().padStart(2, "0");
    return `${hourStr}:${minStr}:${secStr}`;
  }
  useEffect(() => {
    setTimeString(timerSecToString());
  }
  , [timerSec]);

  return (
    <div className="App">
      <div className="App-header">
      <div className="flex">{"経過時間: " +timeString}</div>
        <div className="flex">
        <button className="secButton" onClick={()=>{
          if(perSec > 1000){
          setPerSec(perSec-1000)
          }
          }}>&#x2212;</button>
        <button className="secButton" onClick={()=>{setPerSec(perSec+1000)}}>&#x2b;</button>
        </div>
     
        <div style={{marginBottom: "24px"}}>{perSec / 1000 + "秒間隔"}</div>
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
          <h3> {value}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
