import { store } from "@reduxjs/toolkit";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

//Allows u to fetch the data and keep it there until your done with it. 
//Creates a manual subscription
const Prefetch = () => {
    useEffect(() => {
        console.log('Subscribing');
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
        return() => {
            console.log('unsubscribing');
            notes.unsubscribe();
            users.unsubscribe()
        }
    }, [])
    return ( 
        <>
        <Outlet />
        </>
     );
}
 
export default Prefetch;