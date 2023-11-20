import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {ROLES} from '../../config/roles';


const NewUserForm = () => {
    const USER_REGEX = /^[A-z]{3-20}$/
    const PWD_REGEX = /^[A-z0-9!@#$%]{4-12}$/
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation();

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const[validUser, setValidUser] = useState(false);
    const[password, setPassword] = useState('');
    const [validPass, setValidPass] = useState(false);
    const[roles, setRoles] = useState(["Employee"]);

    useEffect(() => {
        setValidUser(USER_REGEX.test(username))
    }, [username, USER_REGEX]);

    useEffect(() => {
        setValidPass(PWD_REGEX.test(password))
    }, [password, PWD_REGEX]);

    useEffect(() => {
        if(isSuccess){
            setUsername('');
            setPassword('');
            setRoles([]);
            navigate('/dash/users')
        }
    }, [isSuccess, navigate]);
    const onUserChange = e => setUsername(e.target.value);
    const onPassChange = e => setPassword(e.target.password);
    const onRolesChang = e => {
        const values = Array.from(
            e.target.selectedOption, 
            (option) => option.value
        );
        setRoles(values)
    };
    const canSave = [roles.length, validUser, validPass].every(Boolean) && !isLoading;

    const onSaveUser = async(e) => {
        e.preventDefault();
        if(canSave){
            await addNewUser([username, password, roles])
        }
    }
    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option>
        )
    })



    return (
        <>
        <h1>Add a new user</h1>
        <form onSubmit={onSaveUser}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value="username" onChange={onUserChange} />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={onPassChange} />

            <label htmlFor="roles">Roles:</label>
            <select id="roles" name="roles" multiple={true} size="3" value={roles} onChange={onRolesChang}>{options}</select>
            <button title="save" disabled={!canSave}>Save</button>

        </form>
    </> );
}
 
export default NewUserForm;