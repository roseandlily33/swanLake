import { Link } from "react-router-dom";

const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(date);
    return ( 
        <section>
        <h4>{today}</h4>
          <div className="welcomeButtonDiv">
          <Link to='/dash/notes'>
            <button>View Notes</button>
            </Link>
            <Link to='/dash/users'>
               <button> View User Settings</button>
                </Link>
          </div>
        </section>
     );
}
 
export default Welcome;