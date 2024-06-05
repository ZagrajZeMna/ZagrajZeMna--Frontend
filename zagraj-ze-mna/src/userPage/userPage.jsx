//variables
const connectionLink = 'https://zagrajzemna-backend.onrender.com';

//react
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//screen dimensions
import useScreenSize from '../hooks/dimensions';

//css
import './userPage.css';


//images
import Ghost from '../assets/ghost.png';  
import Ludek from '../assets/testowy_ludek.png';
import BackImage from '../assets/back-image-smaller.png';
import Points from '../assets/pac_manPoint.png';


//icons

import { FaRegEdit, FaVenusMars } from "react-icons/fa";

//page parts
import UserPageGames from './usePageGames';
import UserPageLobbys from './userPageLobbys';
import Footer from '../footer/footer';




const UserPage = () =>
 {

    
    //to check screen dimensions
    const { height, width } = useScreenSize();

    //use for setting interval
    const [firstTime, setFT] = useState(true);

    //error with fetching
    const [error, setError] = useState(null);

    //data
    const [dataFromGet, setDataFromGet] = useState(null);


    //Variables
    var mediocre = 4.5; //this is temporary in future will be replaced by data fetch
    var ColouringClass = 'greenBox'; //this tells what is colour of evaluation of profile, eg. 4.5 is green
    var profileDivHeight = 100; //this sets initial value of second div about character (about and domicile)


    //this change variable value
    function setPDHeight(h)
    {
        profileDivHeight = h;
    }


    //this sets interval
    function firstTimeSettingInterval()
    {
        if(firstTime)
        {
            setInterval(changeHeightInterval, 200);
            setFT(false)
        }
            
    }


    //function taht runs in intervals and if two dives dont have the same height it runs function check height
    function changeHeightInterval()
    {
        if( document.getElementById('personalDataId') !== "undefined" && document.getElementById('personalDataId') !== null 
            && document.getElementById('heightTarget') !== "undefined" && document.getElementById('heightTarget') !== null )
        {
            if(document.getElementById('personalDataId').offsetHeight != document.getElementById('heightTarget').offsetHeight)
            {
                checkHeight();
            }
        }
    }

    //setting proper colours for profile evaluation
    if(mediocre>=4.5)
    {
        ColouringClass = 'greenBox';
    }
    else if(mediocre > 3)
    {
        ColouringClass = 'yellowBox';
    }
    else
    {
        ColouringClass = 'redBox';
    }

    
    //this checks height of Profile General div and next set it to bio div
    function checkHeight()
    {
        var h;
        if( document.getElementById('personalDataId') !== "undefined" && document.getElementById('personalDataId') !== null)
        {
            h = document.getElementById('personalDataId').offsetHeight;
            setPDHeight(h)
            

            var helper = profileDivHeight + 'px';
            document.getElementById('heightTarget').style.height = helper ;
        }
    }

    //fetching data from backend
    useEffect(()=>{
        const getData = async () => {
            try{

                const token = localStorage.getItem('token');
                
                //if token not exist = we are log out
                if(!token){
                    setError('Please log in');
                    return;
                }
                const tokenWithoutQuotes = token.replace(/"/g, '');

                //fetching user data
                const response = await fetch('https://zagrajzemna-backend.onrender.com/api/profile/getUserDetails',{
                    method:'GET',
                    headers: {
                        'Authorization' : `Bearer ${tokenWithoutQuotes}`
                    }
                    });

                    //if response is bad
                    if(!response.ok){
                        throw new Error('can not reach Your data');
                    }

                    //parsing to json
                    const dataFromGet = await response.json();
                    
                    //setting data
                    setDataFromGet(dataFromGet);
                    setError(null);
                    console.log("Dane: ", dataFromGet);
                    
                }catch (error){
                //setting error if occurs
                setError(error.message);
            }
        };
        
        getData();
    }, []);
    

    //------------------------------------------------
    //this below makes packman move 
    //------------------------------------------------
    //this listener fires always when scroll events happens
    window.addEventListener(
        "scroll",
        () => 
        { 
            var height_computed = 0;
            var navbar_height = 0;

            //this stops working when width of screen is smaller than 992
            if(width >= 992)
            {
                if(window.scrollY != 'Infinity' && document.body.offsetHeight != 'undefined')
                {
                    //back image
                    if(document.getElementById('backImageId') != 'null')
                        height_computed = document.getElementById('backImageId').offsetHeight;


                    //navbar
                    if(width >= 1100)
                    {
                        height_computed+=80;
                        navbar_height = 80;
                    }
                    else
                    {
                        height_computed+=70;
                        navbar_height = 70;
                    }

                    //another elements that are above packman (they are used for setting pacman start position)
                    if(document.getElementById('BannerID') != 'null')
                        height_computed+=document.getElementById('BannerID').offsetHeight;

                    if(document.getElementById('backTraingleID') != 'null')
                        height_computed+=document.getElementById('backTraingleID').offsetHeight;

                    if(document.getElementById('spaceHeight1') != 'null')
                        height_computed+=document.getElementById('spaceHeight1').offsetHeight;

                    //substratction of height because starting point is when pacman is on bottom of page 
                    height_computed-=height;
                    
                    
                    var fullHeight = 0;

                    //this checks how height is whole page (not screen whole page)
                    if(document.body != 'null')
                        fullHeight = document.body.scrollHeight - document.body.clientHeight;

                    //this calculates position of pacman
                    //default function is (scroll position) / (full page height) = how much page was scrolled
                    //we need to move this default function to works only on part on page:
                    //firsly we do substraction -> this sets starting point of pacman animation
                    //then it is divided by full page height -> this gives percent of pacman movement
                    //next the percentage is multiply by full height divided by height of screen and two navbars heigths
                    //the multiplication sets the end of pacman movement based on scroll
                    var calulated = ((window.scrollY-height_computed) / (fullHeight))*(fullHeight/(height + 2*navbar_height))
                    
                    //setting CSS variable -> it should be always between 0 and 1
                    if(calulated<=1 && calulated >=0)
                    {
                        document.body.style.setProperty(
                        "--scroll",
                        calulated
                        );
                    }
                    else if(calulated >1)
                    {
                        document.body.style.setProperty(
                            "--scroll",
                            1
                            );
                    }
                    else
                    {
                        document.body.style.setProperty(
                            "--scroll",
                            0
                            );
                    }
                    
                }
            }   
        },
        false
      );
      //end of packman movement


    //RETURN
    //---------------------------------------------------------------------------------------------------------------
    return(
        <div className="userPageContainer" onLoad={firstTimeSettingInterval}>
            {/* PAGE BACK IMAGE -> game pad*/}
            <div className='backImage col-12' id="backImageId">  
                <img src={BackImage} alt='pad do gry jako tło strony' className='img-fluid tlo'/>
            </div>

            {/* more space add additional space after backimage*/}
            <div className='moreSpace' id='spaceHeight1'></div>
            
            
            {/* Banner = header of character sheet */}
            <div className='Banner' id='BannerID'>
                <div className='BannerTitle'>
                    <h1>KARTA POSTACI:</h1>
                </div>
                
            </div>

            {/* backTriangle = set triangular gradient in the back */}
            <div className='backTriangle' id='backTraingleID'>
            

            
            {/* two dives with personal infromation */}
            <div id ='profileContainerId' className='allInfoProfileContainer'>
                <div className="generalInfo col-10 offset-1 offset-md-0 col-md-4 offset-xl-1 col-xl-3">
                    <div className="personalData" id="personalDataId">
                        
                        <div className='myEditIcon'>
                            <FaRegEdit />
                        </div>

                        <div className='userImage'>
                            <img src={Ludek} className='img-fuild userImage2' alt="your profile"/>
                        </div>

                        <div className='myData'>
                            <p className='nickname'> {dataFromGet && (!error) && dataFromGet.username}</p>
                            <p> <span className='topSecret'>Top secret: </span> {dataFromGet && (!error) && dataFromGet.contact}</p>
                            <p className='Mymediocre'><span>Ocena profilu: </span> <span className={ColouringClass + ' Mymark'}>{mediocre}</span></p> 
                        </div>
                            

                    </div>
                </div>


                <div  className='bioContainer offset-1 col-10 offset-md-0 col-md-8 col-xl-7'  id=" screenPercent" >

                    <div className="bio" id="heightTarget" style={{height: + profileDivHeight + 'px'}}>

                        <div className='myEditIcon'>
                            <FaRegEdit />
                        </div>
                        
                        <div className='bio_details' onLoad={checkHeight}>

                            <h2> Dane: </h2>                      
                            <p className='bioListElement'>
                                <span className='aboutMeLiTitle'>Pochodzenie: </span> {dataFromGet && (!error) && dataFromGet.country}- {dataFromGet && (!error) && dataFromGet.city}
                            </p>
                            
                            <p className='bioListElement'>
                                <span className='aboutMeLiTitle'>Język: </span> {dataFromGet && (!error) && dataFromGet.language}
                            </p>
                            

                            <h2> Opis postaci: </h2>
                            <p className='bioAboutMe small-font-size'>
                                {dataFromGet && (!error) && dataFromGet.about}   
                            </p>

                        </div>
                    </div>
                </div>
            </div>   
           
           
            {/* CLEARER = clear: both */}
            <div className='clearer'></div>
            <div className='mediumSpace' id='spaceHeight2'></div>
            </div>


            {/* pacman box */}
            { (width>=992) && (<div className="pacmanMoving">
                <div className='GhostMoving'>
                    <img className='img-fluid' src ={Ghost} alt = "pacman ghost" width={50}/>
                </div>
                <div className="pacman">
                    <div className='pacman_eye'></div>
                    <div className='pacman_mouth'> </div>
                </div>
                <div className='pointsEater'></div>
                <div className='pacmanPoints'> </div>
            </div>)}

            <div className='clearer'></div>

            {/*Another parts of page */}
            <UserPageGames/>
            <UserPageLobbys/>
            <Footer/>

        </div>
    );
}

export default UserPage;