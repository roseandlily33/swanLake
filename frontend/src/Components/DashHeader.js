import { Link } from "react-router-dom";
const DashHeader = () => {
    return ( 
        <div className="dashheader">
            <Link to="/dash/notes">
                <h2>Notes</h2>
            </Link>
            <nav>
                <buttons>Later</buttons>
            </nav>
        </div>
     );
}
 
export default DashHeader;