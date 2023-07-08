import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Context from "../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(Context);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully","success")
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (  <div className="container my-3">
   
      <h1>Add a Note</h1>
      <Form className="my-3">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a title"
            name="title"
            onChange={onchange}
            minLength={5}
            required
            value={note.title}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a description"
            name="description"
            onChange={onchange}
            minLength={5}
            required
            value={note.description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the tag eg personal ,proffessional etc."
            name="tag"
            onChange={onchange}
            minLength={5}
            required
            value={note.tag}
          />
        </Form.Group>
        <Button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5} variant="danger" type="submit" onClick={handleclick}>
          Add Note
        </Button>
      </Form>
    </div>
  );
}
