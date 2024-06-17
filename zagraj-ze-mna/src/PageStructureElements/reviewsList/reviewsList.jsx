
import { useState } from "react";
import { postFetchJWT } from "../../fetches/postFetch";
import { useParams } from 'react-router-dom';


//icons
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";

import './reviewList.css';


const ReviewList = () =>{

    const[currentPage, setCP] = useState(0);
    const[maxPage, setMP] = useState(0);
    const[firstTime, setFTfrfr] = useState(true);
    const [reviewList, setReviewList] = useState(null);
    const [once, setOnce] = useState(true);
    
    let size = 5; 

    let myUrl = ''
    let {id} = useParams();
    let currentUrl = window.location.href;

    if(currentUrl.slice(-9)=='/userPage'){
        //dataFromGet = useGetToken('/api/profile/getUserDetails'); 
        if(once){
            setOnce(false);
            myUrl = '/api/review/sendReviews';
            console.log(myUrl);
            
        }
    }
    else if(currentUrl.search('/userProfile/')){
        let {id} = useParams();
        if(once){
            setOnce(false);  
            myUrl = `/api/review/sendReviewsByUrl?id=${id}`; 
            console.log(myUrl);
        }
    }
    
    
    function toTheRight(){
        let page = currentPage;
        if(page < maxPage){
            page++;
            setCP(page);
            getReviews(page);
        }

    }

    function toTheLast()
    {
        setCP(maxPage);
        let page = maxPage;
        getReviews(page);
    }

    function toTheFirst()
    {
        setCP(0);
        let page = 0;
        getReviews(page);
    }

    function toTheLeft(){
        let page = currentPage;
        if(page > 0){
            page--;
            setCP(page);
            getReviews(page);
        }
    }

    const getReviews = async (page) =>
    {

        if(currentUrl.slice(-9)=='/userPage'){
            //dataFromGet = useGetToken('/api/profile/getUserDetails'); 
            myUrl = '/api/review/sendReviews';
            console.log(myUrl);
        }
        else if(currentUrl.search('/userProfile/')){
            //let {id} = useParams();  
            myUrl = `/api/review/sendReviewsByUrl?id=${id}`; 
            console.log(myUrl);
        }

        console.log(page);
        let body =
        { 
            "page": `${page}`,
            "size": `${size}`
        };

        let url = myUrl;

        let respond = await postFetchJWT(url, body);
        console.log("data: ", respond.data);
        setMP(0);
        if(!respond.isError && respond.data != null){
            
            setReviewList(respond);
            setMP(respond.data.pages-1);
            console.log(maxPage);
            
        }
    }

    function createReviews()
    {
        let content = [];
        //console.log("joł: ", reviewList.data.raviews.length);
        let len = reviewList.data.raviews.length;

        
        for(let i=0; i<len; i++)
            {
                content.push(
                    <div key={i} className="reviewConteiner toTheLeft col-10 offset-1">
                        <div className="toTheLeft offset-3 col-6 offset-md-0  col-md-3">
                            <div className="imageConteiner">
                                <img src={reviewList.data.raviews[i].senderAvatar} className="img-fluid myImageClass"/>
                            </div>
                            
                        </div>
                        <div className="dataContainer toTheLeft col-12 col-md-9">
                            <p className="userName">Użytkownik: {reviewList.data.raviews[i].senderName}</p>
                            <p>
                                {reviewList.data.raviews[i].description}
                                <br/><br/>
                                Ocenia na: <span className="stars"> {reviewList.data.raviews[i].starts} </span>
                            </p>
                        </div>
                    </div>
                );
            }
        
        if(len == 0){
            content.push(<p className="noReviews"> Hmm... Przeczesaliśmy nasze bazy danych wzdłuż i wszerz i nic nie znaleźliśmy. Ciekawa sprawa... 🤔</p>)
        }

        content.push(<div className="clearer" key={-2000}></div>)

        return content;
    }

    function handlingOnLoad()
    {
        if(firstTime){
            setFTfrfr(false);
            getReviews(0);
        }
    }

    return(
        <div className="reviewsConteiner">
            <div className='mojeDruzyny' onLoad={handlingOnLoad()}>
                <div className='flotLeftClassOrSth mojeDruzynyTitle'><h1>RECENZJE PROFILU: </h1></div>
                    <div className='pageArrowLobby'>
                        <table className='tableWithLobbyArrows flotLeftClassOrSth'>
                            <tbody>
                                <tr>
                                    <td  onClick={toTheFirst}> <div className='arrowLobby'><LuArrowBigLeftDash/></div></td> 
                                    <td onClick={toTheLeft}> <div className='arrowLobby'><RxThickArrowLeft /></div></td> 
                                    <td> <div className='smallPageNumber'>{currentPage+1}/{maxPage+1}</div></td>  
                                    <td onClick={toTheRight}> <div className='arrowLobby'><RxThickArrowRight /></div></td>
                                    <td  onClick={toTheLast}> <div className='arrowLobby'><LuArrowBigRightDash/></div></td>                
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div className='clearer'></div>
            </div>

            {reviewList && reviewList.data && (!reviewList.isError) && (<div>{createReviews()}</div>)}
            {!reviewList && (<p className="noReviews"> Hmm... Przeczesaliśmy nasze bazy danych wzdłuż i w szerz i nic nie znaleźliśmy. Ciekawa sprawa... 🤔</p>)}
        </div>
    );
}

export default ReviewList;