import { Link } from "react-router-dom";
const DashHeader = () => {
    return ( 
        <header>
            <Link to="/dash/notes">
               <button>Notes</button>
            </Link>
            <nav>
                <button>More Buttons Later</button>
            </nav>
        </header>
     );
}
 
export default DashHeader;