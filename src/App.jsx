import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import moment from "moment";
import localization from 'moment/locale/ru';
import { createClient } from '@supabase/supabase-js'

// moment.locale('ru', localization);
moment.updateLocale('ru');

const supabaseUrl = 'https://fqkdaqmmxvpkbrieowuv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2RhcW1teHZwa2JyaWVvd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzNjc5MTEsImV4cCI6MTk4Njk0MzkxMX0.ZdLj4vCYQxTwNgqkCoOg3saSPYmSWKIT2B-h-R423Qw"
const supabase = createClient(supabaseUrl, supabaseKey)

let { data: notesData, error } = await supabase.from('notes').select('*');

const addNote = async( noteRow ) => {
  const { data, error } = await supabase
  .from('notes')
  .insert([
    { title: noteRow.title },
  ])
  .select()
  return data
}

const deleteNote = async( noteId ) => {
  const { data, error } = await supabase
  .from('notes')
  .delete()
  .eq('id', String(noteId) )
  return data
}

function App() {

  const [notes, setNotes] = useState(notesData)

  return (
    <div className="App">
      <h1><span style={{ color: "chartreuse"}}>Text</span><span style={{ color: "mediumvioletred"}}>Note</span>.Ru</h1>
      <div className="card">

        <button className='add-note' onClick={() => {
            addNote({}).then(response => {
              if (!error) {
                setNotes((prev) => [
                  ...prev, 
                  response[0]
                ]);
              } else {
                alert("Ошибка удаления!");
              }
            })
        }}>
          Добавить заметку
        </button>

        {notes.length === 0 && <div className="note">Заметок пока нет...</div>}

        {notes.length > 0 && notes.map(note => {
          return (
            <div key={note.id} className="note">
              <div><b>{moment(note.created_at).format(`DD.MM.YY hh:mm:ss`)} - [{note.id}]{note.title ? " - " + note.title : ""}</b></div>
              <div>{note.note}</div>
              &nbsp;&nbsp;&nbsp;
              <button 
                onClick={() => {
                  deleteNote( note.id ).then(
                    error => {
                      if (!error) {
                        setNotes((prev) => {
                          const newNotes = prev.filter((n => n.id !== note.id));
                          return newNotes
                        })
                      } else {
                        alert("Ошибка удаления!");
                      }
                    }
                  )
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
