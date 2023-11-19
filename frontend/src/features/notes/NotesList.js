import {useGetNotesQuery} from './notesApiSlice';
import Note from './Note';

const NotesList = () => {
  const {data: notes,
  isLoading,
isSuccess,
isError,
error} = useGetNotesQuery();
let content;
if(isLoading){
  content = (<h4>Loading...</h4>)
}
if(isError){
  content = (<h4>There has been an error, {error?.message}</h4>)
}
if(isSuccess){
  const {id} = notes;
  if(id?.length){
    <Note key={id} noteId={id} />
  }
}




    return (
        <div>
          <h1>Notes List</h1>
        {content}
        </div>
      );
}
 
export default NotesList;