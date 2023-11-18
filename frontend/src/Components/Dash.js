import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const Dash = () => {

    return ( 
       <>
       <DashHeader />
        <div className="dashboard">
            <h1>Dash layout</h1>
            <Outlet />
        </div>
        <DashFooter />
       </>
     );
}
 
export default Dash;