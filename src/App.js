import React, { useCallback, useId, useRef, useState } from 'react';
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
      <br />
      <h3 onClick={generateRandomNum}>Random number : {randomNum}. Click here to generate new one.</h3>
      <br />
      <br />
      <NamesList names={names} />
    </div>
  )
}

const NamesList = ({ names }) => {
  const uniqId = useId();
  return (
    <div>
      <h3>Names : {names.join(", ")}</h3>
      <br />
      <br />
      <h3>Uniq id : {uniqId}</h3>
    </div>
  )
}
