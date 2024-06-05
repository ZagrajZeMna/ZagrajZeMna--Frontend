//navbar page
//it should dynamically change for different user
//navbar states: logout user, candidate, examiner, admin - needs cookies from backend to develop this

import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAuth } from '../AuthContext/AuthContext';
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
import { IoSettings } from "react-icons/io5";






const MyNavbar = () => {

    const { logout } = useAuth();
    //this is use for shadow animations in small screens
    const [expanded, setExpanded] = useState(false);
    const [notExpanded, setNotExpanded] = useState(false);
    const [firstTime, setFirstTime] = useState(true); 
    const [buttonAdditionalClass, setAddClass] = useState("none") 

    //jwt token
    const token = localStorage.getItem('token');

    //for side bar maneu
    const [additaionlMenu, setAdditionalMenu] = useState(false);
    const [addMenuClass, setMenuClass] = useState('My_none');
    const [settingClass, setSetClass] = useState('set_none');

    //setting how much screen side menu occupies
    const [widerMenuAdditional, setWMA] = useState(' cos');
    
    //decoded token
    let decoded = [];
    if(token != null)
        decoded = jwtDecode(token);

    //date
    let currentDate = new Date();
    
    //links and text in navbar
    let login = false;
    let myPage = '/login';
    let myNot  = '/notification';
    let firstButton = '/login';
    let secondButton = 'registration';
    let firstButtonText = 'LOGOWANIE';
    let secondButtonText = 'DOŁĄCZ';
    let firstButtonTextSmall = 'Logowanie';
    let secondButtonTextSmall = 'Dołącz';

    //checking if token is decoded properly
    //console.log(decoded);


    //checikng if token is done properly
    if(decoded.exp * 1000 < currentDate.getTime() || token == null)
    {

        console.log("you are logged out");
        console.log(decoded.exp);

        login = false;

        myPage = '/login';
        myNot  = '/notification';
        firstButton = '/login';
        secondButton = 'registration';
        firstButtonText = 'LOGOWANIE';
        secondButtonText = 'DOŁĄCZ';
        firstButtonTextSmall = 'Logowanie';
        secondButtonTextSmall = 'Dołącz';
    }
    else if(token != null && decoded.exp * 1000 >= currentDate.getTime() )
    {
        console.log("you are logged in");
        console.log(decoded.exp);
        login = true;

        myPage = '/userPage';
        myNot  = '/notification';
        firstButton = '/myLobby';
        secondButton = '/';
        firstButtonText = 'MOJE LOBBY';
        secondButtonText = 'HOME';
        firstButtonTextSmall = 'Moje lobby';
        secondButtonTextSmall = 'Home';
    }

    const handleLogout = () => {
        logout();
    };

    const handleFunction = () => {
        handleLogout();
        settingHidder();
        
    }
    //curent path
    const path = useLocation();

    //screen parameters
    const { height, width } = useScreenSize();
    
    //use to prevent small bug
    const [Big, setBig] = useState(false);
    

    const settingHidder = () =>
    {
        //hidding setting menu
        setAdditionalMenu(false);
        setMenuClass('side_menu_hidden');
        setSetClass('set_hiden');
        setWMA(' cos');
    }

    //when navbar is expanded or collapsed certain values are set (for shadow animation)
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

            //hidding setting menu
            settingHidder();

        } 
        else
        {
            setExpanded(false);
            setNotExpanded(true);
            setAddClass("animOff");
        }
            
    }

    //this makes the side menu appear
    const settingsToggle = () =>
    {
        if(expanded)
        {
            document.getElementById("toggleButton").click();
        }

        //additional menu ifs
        if(additaionlMenu)
        {
            //hidding additional menu
            setAdditionalMenu(false);
            setMenuClass('side_menu_hidden');
            setSetClass('set_hiden');
            setWMA(' cos');
        } 
        else
        {
            //showing additional menu
            setAdditionalMenu(true);
            setMenuClass('side_menu_shown');
            setSetClass('set_shown');

            //deciding how much space should it take
            if(width >=900)
            {
                setWMA(' Myless');
            }
            else
            {
                setWMA(' Mymore')
            }
            
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
                <div>

                <nav className="mynavbarBig mynavbar">
                    <Link to="/">
                    <div className='bannerBig banner col-12 col-md-6'>
                        <img className='myimage img-fluid' src ={dices} alt = "dices" width={50}/>
                        <p>ZAGRAJ ZE MNĄ </p>
                        <img className='myimage img-fluid' src ={dices} alt = "dices" width={50}/>
                        
                    </div>
                    </Link>
        
                    <div className='mynavbarRight col-md-6 col-0'>
                        
                        {login && (<div className={'my_settings RightConteiner ' + settingClass}  onClick={settingsToggle}>
                            <IoSettings />
                        </div>)}

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

               

                {login && (<div className={addMenuClass + widerMenuAdditional + ' setting_margin_big'}>
                    <p className='settingsHeader'>USTAWIENIA</p>
                    <Link to="/ResetPassword" onClick={settingHidder}> <p>Zmień hasło</p></Link>
                    <Link to="/editUserPage" onClick={settingHidder}><p>Ustawienia profilu</p></Link>
                    <Link to="/notification" onClick={settingHidder}><p>Powiadomienia</p></Link>
                    <Link to="/editNotificationsPage" onClick={settingHidder}><p>Dodane gry</p></Link>
                    <Link to="/" onClick={handleFunction}> <p>Wyloguj</p></Link>
                </div>)}

                </div>
                
                
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
                        
                        <div className='tableContainerOrSth'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                           {login && ( <div className={'my_settings my_settings_small ' + settingClass}  onClick={settingsToggle}>
                                                <IoSettings />
                                            </div> )}
                                            {!login && ( <div className={'my_settings2'}>
                                                <IoSettings />
                                            </div> )}
                                        </td>
                                        <td>
                                            <Navbar.Toggle className={"buttonSmall " + buttonAdditionalClass } aria-controls="basic-navbar-nav" id="toggleButton"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        
                        

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
                    
                    {login && (<div className={addMenuClass + widerMenuAdditional + ' setting_margin_small'}>
                        <p className='settingsHeader'>USTAWIENIA</p>
                        <Link to="/ResetPassword" onClick={settingHidder}> <p>Zmień hasło</p></Link>
                        <Link to="/editUserPage" onClick={settingHidder}><p>Ustawienia profilu</p></Link>
                        <Link to="/editNotificationsPage" onClick={settingHidder}><p>Powiadomienia</p></Link>
                        <Link to="/editNotificationsPage" onClick={settingHidder}><p>Dodane gry</p></Link>
                        <Link to="/" onClick={handleFunction}> <p>Wyloguj</p></Link>
                    </div>)}

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