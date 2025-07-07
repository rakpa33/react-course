import { useState } from 'react'
import './App.css'

function App() {
  const [showPassword, stateShowPassword] = useState(false);

  function toggleShowPassword() {
    showPassword ? stateShowPassword(false) : stateShowPassword(true);
  }
  return (
    <div>
      <h1>Hello, welcome to my website</h1>
      <div>
        <input placeholder='Email'></input>
      </div>
      <div>
        <input
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
        ></input>
        <button className='button-show' onClick={toggleShowPassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button className='button-action'>Login</button>
      <button className='button-action'>Sign up</button>
    </div>
  );
}

export default App
