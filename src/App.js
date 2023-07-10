import React, { useCallback, useRef, useState } from 'react';
import "./styles.css";

export default function App() {
  const [randomNum, setRandomNum] = useState(0);
  
  return (
    <div className="App">
      <NamesForm key={randomNum} randomNum={randomNum} generateRandomNum={() => setRandomNum(Math.random())} />
    </div>
  );
}

export const NamesForm = ({ randomNum, generateRandomNum }) => {

  const [names, setNames] = useState(['raj']);
  const nameRef = useRef();

  const addNames = useCallback(() => {
    const newNames = [...names, nameRef.current.value];
    setNames(newNames);
    nameRef.current.value = '';
    nameRef.current.focus();
  }, [names]);
  
  return (
    <div>
      <input id="name1" ref={nameRef} />
      <button onClick={addNames}>Add Btn 1</button>

      <br />
      <h3>{names.join(", ")}</h3>
      <h3 onClick={generateRandomNum}>Random number : {randomNum}. Click here to generate new one.</h3>
    </div>
  )
}
