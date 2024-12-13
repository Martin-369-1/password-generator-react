import { useRef } from "react";
import { useEffect } from "react";
import { useState, useCallback } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordInputRef=useRef(null)
  
  const copyPasswordClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordInputRef.current?.select()
  }, [password]);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%&*()_+=";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-400 bg-gray-600 rounded-md shadow-md">
      <h1 className="my-3 text-xl text-center text-white">
        Password Generator
      </h1>
      <div className="flex mb-4 overflow-hidden rounded-lg shadow bg-slate-300">
        <input
          type="text"
          value={password}
          className="w-4/5 px-2 outline-none password"
          placeholder="password"
          readOnly
          ref={passwordInputRef}
        />
        <button
          className="px-3 py-0.5 shrink-0 text-white bg-blue-300 outline-none w-1/5"
          onClick={() => copyPasswordClipBoard()}
        >
          Copy
        </button>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          name=""
          id=""
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="length">Length : {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => setNumberAllowed((v) => !v)}
        />
        <label htmlFor="">numbers</label>

        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => setCharAllowed((v) => !v)}
        />
        <label htmlFor="">characters</label>
      </div>
    </div>
  );
};

export default App;
