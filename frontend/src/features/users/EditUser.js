import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import EditUserForm from "./EditUserForm";
import { selectUserById } from "./usersApiSlice";
const EditUser = () => {
    const {id} = useParams();
    const user = useSelector(state => selectUserById(state, id));
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>
    return ( 
        <>
        {content}
        </>
     );
}
 
export default EditUser;