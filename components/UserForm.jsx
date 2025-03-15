import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    window.history.pushState({}, '', '/quiz');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent); 
  }

  return (
    <form onSubmit={handleSubmit}>
    <label id="name1">Name: </label>
    <input type="text" id="inputName" required value={inputName} onChange={(e)=>setInputName(e.target.value)}/>
    <button type="submit" id="sbtn" >Start Quiz</button>
  </form>
  );
}