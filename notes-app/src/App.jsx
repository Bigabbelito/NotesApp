import React, { useState, useEffect } from "react";
import "./index.css";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([...notes, { id: Date.now(), text: newNote }]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">Notes App</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input search"
      />
      <div className="note-input">
        <input
          type="text"
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="input"
        />
        <button onClick={addNote} className="button add">Add Note</button>
      </div>
      <ul className="notes-list">
        {notes
          .filter((note) => note.text.toLowerCase().includes(search.toLowerCase()))
          .map((note) => (
            <li key={note.id} className="note-item">
              <span>{note.text}</span>
              <button onClick={() => deleteNote(note.id)} className="button delete">Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
