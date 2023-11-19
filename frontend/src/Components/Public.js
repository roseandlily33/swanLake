import {Link} from 'react-router-dom';

const Public = () => {

    return ( 
        <div>
            <header>Welcome</header>
            <h2>Contact Page</h2>
            <address>
                Name <br />
                490 Blakley Drive <br />
                Marquis MI 92041 <br />
            </address>
            <h4><Link to='login'>Employee Login</Link></h4>

        </div>
     );
}
 
export default Public;