import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)//copying the pass with refence 

  //password generation for any changes made
  const generatePass = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numAllowed) str += "1234567890"
    if(charAllowed) str += "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

    for(let i=1; i<length; i++){
      const  char = Math.floor(Math.random()* str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed])

  //generate password while refreshing/ reloading page
  useEffect(()=>{
    generatePass()
  }, [length, numAllowed, charAllowed])

  //copy to clipboard
  const copyPass = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  return (
  <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-400 to-cyan-200 text-yellow-100">
      <div className="bg-[#ede1c8] shadow-2xl rounded-2xl p-8 w-[400px] border border-yellow-300/20">

        <h1 className="text-3xl font-bold italic text-center text-blue-900 mb-6 font-sans">
          🔐 Password Generator
        </h1>

        <div className="flex items-center mb-6">
          <input
            type="text"
            value={password}
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
            className="flex-grow px-3 py-2 rounded-l-lg text-black text-lg  border-2 border-[#370617]"
          />
          <button
            onClick={copyPass}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-r-lg font-semibold"
          >
            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="mb-5">
          <label htmlFor="length" className="block mb-2 text-lg text-amber-950">
            Length: <span className="font-bold text-amber-950">{length}</span>
          </label>
          <input
            type="range"
            min={5}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              className="accent-yellow-400"
            />
            <span className="text-lg text-amber-950">Include Numbers</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-yellow-400"
            />
            <span className="text-lg text-amber-950">Include Special Characters</span>
          </label>
        </div>
      </div>
    </div>
  </>
)

}

export default App
