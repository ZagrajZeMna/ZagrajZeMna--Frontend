import { useLocation } from 'react-router-dom';
import './space.css';

//this thing is just to be below navbar because navbar sticks to the top (so this div prevents navbar from covering other stuff)

function Space()
 {
    const path = useLocation();

    if(path.pathname == '/registration' || path.pathname == '/login' || path.pathname == '/resetPassword')
    {
        return( 
            <div className="blank"></div>
        );
    }
    else
    {
        return( 
            <div className="space"></div>
        );
    }
   
}
 
export default Space;