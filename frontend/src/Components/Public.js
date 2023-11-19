import {Link} from 'react-router-dom';
import wavyImage from '../images/wavyImage.jpg';

const Public = () => {

    return ( 
        <main>
            <h1>Davie's Tech Shop</h1>
           <address>
                Davie Davidson <br />
                490 Blakley Drive <br />
                Marquis MI 92041 <br />
            </address>
            <Link to='login'><button>Employee Login</button></Link>
        </main>
     );
}
 
export default Public;