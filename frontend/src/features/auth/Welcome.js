import { Link } from "react-router-dom";

const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(date);
    return ( 
        <div>
            <h4>{today}</h4>
            <Link to='/dash/notes'>View Notes</Link>
            <Link to='/dash/users'>View User Settings</Link>

        </div>
     );
}
 
export default Welcome;