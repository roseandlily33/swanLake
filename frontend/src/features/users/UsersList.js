import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();
    let content;
    
    if(isLoading) {
        content = ( <p>Loading...</p>)
    }
    if(isError){
        content = (
            <>
            <p>There has been an error</p>
            {error?.data?.message}
            </>
        )
    }
    if(isSuccess){
        const {ids} = users;
        if(ids?.length ){
          content =  ids.map(userId => (
                <User key={userId} userId={userId} />
            ))
        } else {
            content = null;
        }
    }
    return ( 
        <>
        <h1>users List</h1> 
       
        {content}
        </>
    
    
    );
}
 
export default UsersList;