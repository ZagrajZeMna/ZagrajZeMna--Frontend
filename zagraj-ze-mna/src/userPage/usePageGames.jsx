
//react
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//screen dimensions
import useScreenSize from '../hooks/dimensions';

//css
import './userPageGames.css';

//images
import Tetris from '../assets/tetris.png';
import Sus from '../assets/Sus.jpg';


//icons
import { SlGameController } from "react-icons/sl";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";
import { FaRegEdit, FaVenusMars } from "react-icons/fa";
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";


const UserPageGames = () =>
 {

    //to check screen dimensions
    const { height, width } = useScreenSize();

    //it force page to reRender when setReRender is used
    const [pageGames, setPageGames] = useState(0);

    const [maxPageNumber, setMPNumber] = useState(11);

    //paging buttos games
    function PageLeft()
    {
        let page = pageGames;
        if(page>0)
        {
            page--;
            console.log(page);
            setPageGames(page);
        }
            

    } 

    function FirstLeft()
    {
        setPageGames(0);
    }

    function LastRight()
    {
        setPageGames(maxPageNumber -1);
    }

    //to do - add max value
    function PageRight()
    {
        let page = pageGames;
        
        if(page < maxPageNumber - 1)
        {
            page++;
            setPageGames(page);
            console.log(page);
        }
        

            
    } 


    //tetris alike shelf loop (shows only when width >= 1200)
    const TetrisGamesLoop = () =>
    {
        //to bottom green first
        let colorsTetris = ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'r', 'c', 'c', 'b', 'b', 'r', 'c', 'c', 'b', 'b', 'r', 'r', 'c' ];

        //to bottom green tree squares
        let colorsTetris2 = ['c', 'c', 'c', 'c', 'g', 'c', 'c', 'r', 'c', 'c', 'b', 'b', 'r', 'c', 'c', 'b', 'b', 'r', 'r', 'c' ];

        //to bottom full green
        let colorsTetris3 =['c', 'c', 'c', 'g', 'g', 'c', 'c', 'r', 'c', 'g', 'b', 'b', 'r', 'c', 'c', 'b', 'b', 'r', 'r', 'c' ];

        //to bottom full green one below
        let colorsTetris4 = ['c', 'c', 'c', 'g', 'c', 'c', 'c', 'r', 'g', 'g', 'b', 'b', 'r', 'c', 'g', 'b', 'b', 'r', 'r', 'c' ];

        //to bottom full green two lines filled
        let colorsTetris5 = ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'r', 'g', 'c', 'b', 'b', 'r', 'g', 'g', 'b', 'b', 'r', 'r', 'g' ];

        //to lines destroyed
        let colorsTetris6 = ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c','c', 'c', 'c', 'c', 'c', 'c', 'c', 'r', 'g', 'c' ];

        //to up two lines filled
        let colorsTetris7 = ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'r', 'g', 'c', 'b', 'b', 'r', 'g', 'g', 'b', 'b', 'r', 'r', 'g' ];

        //green one up
        let colorsTetris8 = ['c', 'c', 'c', 'g', 'c', 'c', 'c', 'r', 'g', 'g', 'b', 'b', 'r', 'c', 'g', 'b', 'b', 'r', 'r', 'c' ];

        //green two up
        let colorsTetris9 = ['c', 'c', 'c', 'g', 'g', 'c', 'c', 'r', 'c', 'g', 'b', 'b', 'r', 'c', 'c', 'b', 'b', 'r', 'r', 'c' ];

        //to up green part tree
        let colorsTetris10 = ['c', 'c', 'c', 'c', 'g', 'c', 'c', 'r', 'c', 'c', 'b', 'b', 'r', 'c', 'c', 'b', 'b', 'r', 'r', 'c' ];

        let content = [];
        let usingColors = [];
        var colorClass = ' ';
        var HeightOfBlock = width * 0.84 * 0.52 * 0.18;
        let modForGame = 10;
        
        for(let i = 0; i<20; i++)
        {

            if(pageGames%modForGame == 0)
                usingColors = colorsTetris;
            else if(pageGames%modForGame == 1)
                usingColors = colorsTetris2;
            else if(pageGames%modForGame == 2)
                usingColors = colorsTetris3;
            else if(pageGames%modForGame==3)
                usingColors = colorsTetris4;
            else if(pageGames%modForGame==4)
                usingColors = colorsTetris5;
            else if(pageGames%modForGame==5)
                usingColors = colorsTetris6;
            else if(pageGames%modForGame==6)
                usingColors = colorsTetris7;
            else if(pageGames%modForGame==7)
                usingColors = colorsTetris8;
            else if(pageGames%modForGame==8)
                usingColors = colorsTetris9;
            else if(pageGames%modForGame==9)
                usingColors = colorsTetris10;
            

            if(usingColors[i]=='r')
                colorClass = ' redTetrisBlock';
            else if(usingColors[i] == 'g')
                colorClass = ' greenTetrisBlock';
            else if(usingColors[i] == 'b')
                colorClass = ' blueTetrisBlock';
            else if(usingColors[i] == 'c')
                colorClass = ' backGroundTetrisBlock';


            content.push(
            <div key={i} className={'tetrisBlock tetrisBlock_withGame ' + colorClass} style={{height: + HeightOfBlock + 'px'}}>
                <img src={Sus} alt="gra" className='img-fluid gameImage'/>
                <p>Among Us</p>
            </div>);
                   
        }
        return content;
    }


    //shelft loop when width < 1200
    const ShelfGamesLoop = () =>
    {
        let colorsTetris = ['r', 'r', 'r', 'r', 'g', 'g', 'g', 'g', 'b', 'b', 'b', 'b', 'g', 'g', 'g', 'g','r', 'r', 'r', 'r'];
        let content = [];
        var colorClass = ' ';
        for(let i=0; i<12; i++)
        {

            content.push(
                <div key={i} className='col-lg-2 col-md-3 col-sm-4 col-6 gamesShelf'>
                    <div className='gamesShelfItem'>
                        <div className={'gamesShelfItemInside colorClassGame' + ' whiteShadow'}>
                            <img src={Sus} alt="gra" className='img-fluid gameImageSmall'/>
                            <p>Among Us</p>
                        </div>
                       
                    </div>
                </div>
            );
        }

        return content;
    }


    //return stuff
    return(
        <div className="myGames">
            

            <div className='gradientGamesEntry'></div>

            {(width >= 1200) && (
            <div className='tetrisAlikeShelf'>

                <div className='tetrisSideOfShelf'>

                    <div className='TetrisTitleContainer'>
                        <h1 className='TetrisALikeTittle'>
                            <span className='yellowLetter'> M</span>
                            <span className='yellowLetter'>O</span>
                            <span className='yellowLetter'>J</span>
                            <span className='yellowLetter'>E</span> 
                            <span className='yellowLetter'> G</span>
                            <span className='yellowLetter'>R</span>
                            <span className='yellowLetter'>Y </span>
                        </h1>
                    </div>

                    {TetrisGamesLoop()}
                </div>
                    

                <div className='tetrisGamePanel'>
                    <div className='tetrisArrows'>
                        <table>
                            <tbody>
                            <tr>
                                <td><div onClick={FirstLeft} className='arrowButtonTetris'> <LuArrowBigLeftDash /></div></td>
                                <td><div onClick={PageLeft} className='arrowButtonTetris'><RxThickArrowLeft /></div></td>
                                <td><p className='bigPageNumber'>{pageGames+1} / {maxPageNumber}</p></td>
                                <td><div onClick={PageRight} className='arrowButtonTetris'><RxThickArrowRight /></div></td>
                                <td><div onClick={LastRight} className='arrowButtonTetris'><LuArrowBigRightDash/></div></td>
                               
                            </tr>
                            </tbody>
                        </table>
                        <div className='clearer'></div> 
                        
                    </div>
                    


                    {<div className='nextBlock'>
                        <p> Następny </p>
                        <img src={Tetris} alt="tetris_block" className='img-flud tetrisNext' />
                    </div>}


                    <div className='allTetrisGamesInfo'>
                        <div className='addedGamesInfo'>Statystyki</div>
                        <div className='editTetrisIcon'><FaRegEdit /></div>
                        <div className='clearer'></div>
                        <p>Wyświetlanych: 20</p>
                        <p>Dodanych: 25</p>
                        
                    </div>

                </div>

               

                <div className='clearer'></div>


            </div>)}

            {(width < 1200) && (
                <div className='gameShelfSmall'>
                
                <div className='conteinerSmallTitle'>
                    <h1 className='smallTitleGames'>
                        MOJE GRY
                    </h1>
                </div>
                

                    <div className='pageArrowsSmall'>
                        <table className='myTableOrSth'>
                            <tbody>
                            <tr>
                                <td> <div  onClick={FirstLeft} className='arrowSmallGames'><LuArrowBigLeftDash /></div></td> 
                                <td> <div  onClick={PageLeft} className='arrowSmallGames'><RxThickArrowLeft /></div></td> 
                                <td> <div className='smallPageNumber'>{pageGames + 1} / {maxPageNumber} </div></td>  
                                <td> <div  onClick={PageRight} className='arrowSmallGames'><RxThickArrowRight /></div></td>
                                <td> <div  onClick={LastRight} className='arrowSmallGames'><LuArrowBigRightDash/></div></td>
                                
                            </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <div className='clearer'></div>
                    <div className='smallConteinerForGames'>
                        {ShelfGamesLoop()}
                    </div>

                    

                    <div className='clearer'></div>
                    <div className='marginMySmall'></div>
                    
                    <div className='pageArrowsSmall'>
                        <table className='myTableOrSth'>
                            <tbody>
                            <tr>
                                <td> <div  onClick={FirstLeft} className='arrowSmallGames'><LuArrowBigLeftDash /></div></td> 
                                <td> <div  onClick={PageLeft} className='arrowSmallGames'><RxThickArrowLeft /></div></td> 
                                <td> <div className='smallPageNumber'>{pageGames + 1} / {maxPageNumber} </div></td>  
                                <td> <div  onClick={PageRight} className='arrowSmallGames'><RxThickArrowRight /></div></td>
                                <td> <div  onClick={LastRight} className='arrowSmallGames'><LuArrowBigRightDash/></div></td>
                                
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className='clearer'></div>
                    
                </div>  
            )}
            <div className='clearer'></div>
            <div className='gradientGamesExit'></div>
             <div className='clearer'></div>
        </div>
    );
 }

 export default UserPageGames;