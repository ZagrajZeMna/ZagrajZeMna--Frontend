import { useLocation } from 'react-router-dom';
import './space.css';
import useScreenSize from '../hooks/dimensions';


//this thing is just to be below navbar because navbar sticks to the top (so this div prevents navbar from covering other stuff)

function Space()
 {
    const path = useLocation();

    //screen size
    const { height, width } = useScreenSize();

    if(path.pathname == '/registration' || path.pathname == '/login' || path.pathname == '/ResetPassword')
    {
        return( 
            <div className="blank"></div>
        );
    }
    else
    {
        if( width >= 1100 )
        {
             return(   
                <div className="space"></div>
            );
        }
        else
        {
            return(   
                <div className="space2"></div>
            );
        }
       
    }
   
}
 
export default Space;