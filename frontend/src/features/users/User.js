import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserById } from "./usersApiSlice";


const User = ({key, userId}) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();
    let content;
    const handleEdit = () => navigate('/dash/users/', userId);
    if(user){
        const userRolesString = user.roles.toString().replaceAll(',',', ');
        //const cellStatus = user.active ? '': 'N/A';
        content = (
            <div>
            <h4 key={userId}>{user.username}</h4>
            <button onClick={handleEdit}>Edit</button>
            </div>
        )
    } else {
        return null;
    }

    return (
        <>
         {content}
        </>
      );
}
 
export default User;