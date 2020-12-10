import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newValue,replace=false) {
    if(!replace){
    setHistory([...history, newValue])
    setMode(newValue)
    }else{
      setHistory(prev => {
        const newHistory = [...prev.slice(0, prev.length - 1),newValue]
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      })
  }
}

  function back() {
    if(history.length >1){
    setHistory(prev => {
      const newHistory = [...prev.slice(0, prev.length - 1)]
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
   }

  // setHistory([...history.slice(0,history.length-1)])
  // setMode(history[history.length-1])
  }

  return { transition, back, mode };
}

