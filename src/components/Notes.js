import React,{useContext,useEffect,useState} from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Context from '../context/notes/NoteContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Notes() {
  const context=useContext(Context);
  const{notes,getNotes}=context;
  useEffect(() => {
   getNotes();
   // eslint-disable-next-line 
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
const updateNote=(note)=>{

}
  return (
    <>
     <AddNote/>
     <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
        })}
      </div>
     </>
  )
}
