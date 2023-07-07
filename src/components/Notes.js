import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Context from "../context/notes/NoteContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Notes() {
  const context = useContext(Context);
  const { notes, getNotes,editNote } = context;

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  // Modal Bale function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateNote = (currentNote) => {
    handleShow();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  // Form vale function

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };
  return (
    <>
      <AddNote />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="my-3">
            <Form.Group className="mb-3" controlId="etitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a title"
                name="etitle"
                onChange={onchange}
                value={note.etitle}
                minLength={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a description"
                name="edescription"
                onChange={onchange}
                value={note.edescription}
                minLength={5}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="etag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the tag eg personal ,proffessional etc."
                name="etag"
                onChange={onchange}
                value={note.etag}
                minLength={5}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleclick();
            }}
            disabled={
              note.etitle.length < 5 ||
              note.edescription.length < 5 ||
              note.etag.length < 5
            }
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}
