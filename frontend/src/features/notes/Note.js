import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectNoteById } from "./notesApiSlice";
const Note = ({key, noteId}) => {
    const note = useSelector(state => selectNoteById(state, noteId));
    const navigate = useNavigate();
    let content;
    if(note){
        const created = new Date(note.createdAt).toLocaleString('en-us', {day: 'numeric', month: 'long'});
        const updated = new Date(note.createdAt).toLocaleString('en-us', {day: 'numeric', month: 'long'});
        const handleEdit = () => {
            navigate('/dash/notes/', noteId);
        }
        content = (
            <>
            <p>{note}</p>
            <button onClick={handleEdit}>Edit</button>
            </>
        )
    } else {
        return null;
    }
    return (
        <>
        {content}</>
      );
}
 
export default Note;