//navbar page
//it should dynamically change for different user
//navbar states: logout user, candidate, examiner, admin - needs cookies from backend to develop this

import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from "react";

//function to check screen dimensions
import useScreenSize from '../hooks/dimensions';

//CSS file
import './navbar.css';

//for bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


//images
import dices from '../assets/dices.png'; 
import notifications from '../assets/notifications.png'; 
import account from '../assets/account.png'; 

//icons
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';




const MyNavbar = () => {


    //this is use for shadow animations in small screens
    const [expanded, setExpanded] = useState(false);
    const [notExpanded, setNotExpanded] = useState(false);
    const [firstTime, setFirstTime] = useState(true); 
    const [buttonAdditionalClass, setAddClass] = useState("none") 

    //this checks if user is log in
    const token = localStorage.getItem('token');
    let decoded = jwtDecode(token);
    let currentDate = new Date();
    let login = false;

    let myPage = '/login';
    let myNot  = '/login';
    let firstButton = '/login';
    let secondButton = 'registration';

    let firstButtonText = 'LOGOWANIE';
    let secondButtonText = 'DOŁĄCZ';

    let firstButtonTextSmall = 'Logowanie';
    let secondButtonTextSmall = 'Dołącz';


    if(decoded.exp * 1000 < currentDate.getTime() || token == null)
    {
        console.log("you are log out");
        login = false;

        myPage = '/login';
        myNot  = '/login';
        firstButton = '/login';
        secondButton = 'registration';
        firstButtonText = 'LOGOWANIE';
        secondButtonText = 'DOŁĄCZ';
        firstButtonTextSmall = 'Logowanie';
        secondButtonTextSmall = 'Dołącz';
    }
    else
    {
        console.log("you are log in");
        login = true;

        myPage = '/userPage';
        myNot  = '/editNotificationsPage';
        firstButton = '/userLobbys';
        secondButton = '/';
        firstButtonText = 'MOJE LOBBY';
        secondButtonText = 'HOME';
        firstButtonTextSmall = 'Moje lobby';
        secondButtonTextSmall = 'Home';
    }
    
    const path = useLocation();

    //screen parameters
    const { height, width } = useScreenSize();
    
    //use to prevent small bug
    const [Big, setBig] = useState(false);
    

    //when navbar is expande or collapse certain values are set (for shadow animation)
    const setToggle = () =>
    {   
        var element = document.getElementById("toggleButton");
        
        if(firstTime)
        {
            setFirstTime(false);
            setAddClass("none");
        }
            

        if(!expanded)
        {
            setExpanded(true)
            setNotExpanded(false);
            setAddClass("animOn");
        } 
        else
        {
            setExpanded(false);
            setNotExpanded(true);
            setAddClass("animOff");
        }
            
    }




    if(path.pathname != '/login' &&  path.pathname != '/registration' && path.pathname != '/ResetPassword')
    {
        //when screen is large navbar is not from bootstrap
        if(width>=1100)
        {
            //this is to prevent small bug (when website was small than expand sometimes shadow stops working)
            if(!Big)
            {
                setBig(true);
                setExpanded(false);
                setNotExpanded(false);
                setFirstTime(true);
                setAddClass("none");
                
            }
            
            //using Link insted of 'a' - we avoid sending request to server
            return (
                <nav className="mynavbarBig mynavbar">
                    <Link to="/">
                    <div className='bannerBig banner col-12 col-md-6'>
                        <img className='myimage img-fluid' src ={dices} alt = "dices" width={50}/>
                        <p>ZAGRAJ ZE MNĄ </p>
                        <img className='myimage img-fluid' src ={dices} alt = "dices" width={50}/>
                        
                    </div>
                    </Link>
        
                    <div className='mynavbarRight col-md-6 col-0'>
                        
                        <Link to={myNot}>
                            <div className='RightConteiner not_img'> 
                                <IoIosNotifications />
                            </div>
                        </Link>

                        <Link to={myPage}>
                            <div className='RightConteiner accountImage'>
                                <FaUser />
                            </div>
                        </Link>

                        <Link to={firstButton}>
                            <div className='RightConteiner login_div'>
                                {firstButtonText}
                            </div>
                        </Link>

                        <Link to={secondButton}>
                            <div className='RightConteiner register_div'>
                                {secondButtonText}
                            </div>
                        </Link>

                    </div>
                    
        
        
                    <div className='clear'></div>
                    
                </nav>
                
                
            );
        }
        //when screen is small navbar is from bootstrap
        else
        {
            if(Big)
                setBig(false);

            return (
                <div>
                    <Navbar expand="xl" className="bg-body-tertiary mynavbarSmall mynavbar" onToggle={setToggle} >
                        <Container>
                        <Navbar.Brand className='bannerSmall banner' href="/"> <p>ZAGRAJ ZE MNĄ</p></Navbar.Brand>
                        <Navbar.Toggle className={"buttonSmall " + buttonAdditionalClass } aria-controls="basic-navbar-nav" id="toggleButton"/>
                        
                        <Navbar.Collapse id="basic-navbar-nav" className ="smallBannerLinks">
                            <Nav className="me-auto">
                            <Nav.Link href={myPage}>Moje konto</Nav.Link>
                            <Nav.Link href={myNot}>Powiadomienia</Nav.Link>
                            <Nav.Link href={firstButton}>{firstButtonTextSmall}</Nav.Link>
                            <Nav.Link href={secondButton}>{secondButtonTextSmall}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        
                        </Container>

                    </Navbar>
                    
                    <div className='clear'></div>
                </div>
                
            );
        }
    }
    else
    {
        return
        (
            <div></div>
        );
    }
    
    
}
 
export default MyNavbar;