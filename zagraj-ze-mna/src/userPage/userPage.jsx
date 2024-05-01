//variables
const connectionLink = 'http://localhost:4001';

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


    //Variables
    var mediocre = 4.5;
    var ColouringClass = 'greenBox';
    var profileDivHeight = 100;

    function setPDHeight(h)
    {
        profileDivHeight = h;
    }


    function firstTimeSettingInterval()
    {
        if(firstTime)
        {
            setInterval(changeHeightInterval, 200);
            setFT(false)
        }
            
    }

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

    //this efect checks if screen was resized and then set proper height of one of the elements 
    //(it look nice when two elements have the same height)
    useEffect(() => {
        const handleResize = () => {
            checkHeight();
        };
    
        window.addEventListener('resize', handleResize);
    

        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    

    
      
    //functions that runs only once after render
    useEffect(()=>{
        checkHeight();
    }, []); 
    

    
    

    //------------------------------------------------
    //this below makes packman move 
    //------------------------------------------------

    window.addEventListener(
        "scroll",
        () => 
        {
            var height_computed = 0;
            var navbar_height = 0;
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


                    if(document.getElementById('BannerID') != 'null')
                        height_computed+=document.getElementById('BannerID').offsetHeight;

                    if(document.getElementById('profileContainerId') != 'null')
                        height_computed+=document.getElementById('profileContainerId').offsetHeight;

                    if(document.getElementById('spaceHeight1') != 'null')
                        height_computed+=document.getElementById('spaceHeight1').offsetHeight;

                    if(document.getElementById('spaceHeight2') != 'null')
                        height_computed+=document.getElementById('spaceHeight2').offsetHeight;

                    //pacman movent margin
                    //height_computed+=60;
                    height_computed-=height;

                    var fullHeight = 0;
                    if(document.body != 'null')
                        fullHeight = document.body.scrollHeight - document.body.clientHeight;

                    var calulated = ((window.scrollY-height_computed) / (fullHeight))*(fullHeight/(height + 2*navbar_height))
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

            <div className='backImage col-12' id="backImageId">  
                <img src={BackImage} alt='pad do gry jako tło strony' className='img-fluid tlo'/>
            </div>


            <div className='moreSpace' id='spaceHeight1'></div>
            <div className='Banner' id='BannerID'>
                <div className='BannerTitle'>
                    <h1>KARTA POSTACI:</h1>
                </div>
                
            </div>

            <div className='backTriangle'>
            

                
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
                            <p className='nickname'>Nick</p>
                            <p> <span className='topSecret'>Top secret: </span> dane kontaktowe</p>
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
                                <span className='aboutMeLiTitle'>Pochodzenie: </span> Kraj: Miasto
                            </p>
                            
                            <p className='bioListElement'>
                                <span className='aboutMeLiTitle'>Języki: </span> polski, angielski
                            </p>
                            

                            <h2> Opis postaci: </h2>
                            <p className='bioAboutMe small-font-size'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet rutrum urna, a laoreet quam. Etiam a finibus eros. Duis volutpat in ante non iaculis. Ut sit amet dolor et neque ultricies semper quis sed tellus. Praesent id feugiat ipsum. Vestibulum ullamcorper nulla non elit tristique vestibulum. Pellentesque mi turpis, luctus vel porttitor id, lacinia vel felis. Ut pretium facilisis est, a varius neque pharetra ornare. Vivamus diam dui, dapibus maximus tempor ac, interdum at odio. Ut fringilla tellus sed enim porta, ut imperdiet metus porta. Nulla facilisi. Curabitur maximus aliquam nunc in egestas.
                            </p>

                        </div>
                    </div>
                </div>
            </div>   
           
           

            <div className='clearer'></div>
            <div className='mediumSpace' id='spaceHeight2'></div>
            </div>

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
            <UserPageGames/>
            <UserPageLobbys/>
            <Footer/>

        </div>
    );
}

export default UserPage;