import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //GETTING NOTES
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //  ADD NOTE
  const addNote = async (title, description, tag) => {
    //  API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();

    setNotes((prevnote) => {
      return prevnote.concat(note);
    });
  };

  //Delete  a Note
  const deleteNote = async (id) => {
    //  API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
    });
    // eslint-disable-next-line
    const json = await response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = await response.json();
   
    // LOGIC to delete a note
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    // logic to edit in client
    setNotes(newNotes);
  };
  
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
