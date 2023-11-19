import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom';

const DashFooter = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const onGoHomeClicked = () => navigate('/dash');
    let goHomeButton = null;
    if(pathname !== '/dash'){
        goHomeButton = (
            <button title="home" onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
            </button>
        )
    }
    
    return (
        <footer>
            {goHomeButton}
            <h5>Current User:</h5>
            <h5>Status:</h5>
        </footer>
     );
}
 
export default DashFooter;