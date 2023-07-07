import React,{useContext} from 'react'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash ,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import Context from '../context/notes/NoteContext';

export default function NoteItem(props) {
    const{note,updateNote}=props;
    const context=useContext(Context);
    const{deleteNote}=context;
    const handleDelete=(id)=>{
          deleteNote(id);
    }
  return (
    <div className='col-md-3'> 
       <Card className='my-3'>
     <Card.Body>
       <Card.Title>{note.title}</Card.Title>
       <Card.Text>
        {note.description} 
       </Card.Text>
       <FontAwesomeIcon icon={faTrash}  className='mx-2 trash-icon' onClick={()=>handleDelete(note._id)}/>
       <FontAwesomeIcon icon={faPenToSquare} className='mx-2 pen-icon' onClick={()=>updateNote(note)}/>

     </Card.Body>

   </Card>
    </div>
  )
}
