import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
const USER_REGEX = /^[A-z]{3-20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4-12}$/;

const EditUserForm = ({user}) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();
    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError,
    }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const[validUser, setValidUser] = useState(false);
    const[password, setPassword] = useState('');
    const [validPass, setValidPass] = useState(false);
    const[roles, setRoles] = useState(user.roles);
    const[active, setActive] = useState(user.active);

    useEffect(() => {
        setValidUser(USER_REGEX.test(username))
    }, [username]);

    useEffect(() => {
        setValidPass(PWD_REGEX.test(password))
    }, [password]);

    useEffect(() => {
        if(isSuccess || isDelSuccess){
            setUsername('');
            setPassword('');
            setRoles([]);
            navigate('/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onUserChange = e => setUsername(e.target.value);
    const onPassChange = e => setPassword(e.target.password);
    const onRolesChang = e => {
        const values = Array.from(
            e.target.selectedOption, 
            (option) => option.value
        );
        setRoles(values)
    };
    const onActiveChange = () => setActive(prev => !prev);

    const onSaveUser = async(e) => {
        //e.preventDefault();
        if(password){
            await updateUser({id: user.id, username, password, roles, active})
        } else {
            await updateUser({id: user.id, username, roles, active})
        }
    }
    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option>
        )
    });

    const onDeleteUser = async() => {
        await deleteUser({id: user.id})
    }
    let canSave;
    if(password){
     canSave = [roles.length, validUser, validPass].every(Boolean);
    } else {
     canSave = [roles.length, validUser, validPass].every(Boolean) && !isLoading;
    } 

    const errContent = (error?.data?.message || delError?.data?.message) ?? '';

    return ( 
        <>
        {errContent}

        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value="username" onChange={onUserChange} />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={onPassChange} />

            <label htmlFor="roles">Roles:</label>
            <select id="roles" name="roles" multiple={true} size="3" value={roles} onChange={onRolesChang}>{options}</select>

            <label htmlFor="active">Active:</label>
            <input id="user-active" name="user-active" type="checkbox" checked={active} onChange={onActiveChange} />

            <button title="save" onClick={onSaveUser}>Save</button>
            <button title="delete" onClick={onDeleteUser}>Delete</button>

        </form>
        </>
     );
}
 
export default EditUserForm;