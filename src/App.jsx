import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import moment from "moment";

function App() {
  const [notes, setNotes] = useState([])

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1><span style={{ color: "chartreuse"}}>Text</span><span style={{ color: "mediumvioletred"}}>Note</span>.Ru</h1>
      <div className="card">

        <button className='add-note' onClick={() => setNotes((prev) => [
            ...prev, 
            moment().valueOf()
          ])}>
          Добавить заметку
        </button>

        {notes.length === 0 && <div className="note">Заметок пока нет...</div>}

        {notes.length > 0 && notes.map(note => {
          return (
            <div key={note} className="note">
              {note} 
              &nbsp;&nbsp;&nbsp;
              <button 
                onClick={() => {
                  setNotes((prev) => {
                    const newNotes = prev.filter((n => n !== note));
                    return newNotes
                  })
                }}>
                Х
              </button>
            </div>
          )
        })}

      </div>
      <p className="read-the-docs">
        TextNote.Ru @ 2022
      </p>
    </div>
  )
}

export default App
