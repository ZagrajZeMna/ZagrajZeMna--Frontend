//react
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//css
import './NotiPage.css';
import Footer from '../PageStructureElements/footer/footer';
//screen dimensions
import useScreenSize from '../hooks/dimensions';

//images
import gang from '../assets/gangA.png';  
import gang2 from '../assets/gangB.png';  
import Ludek from '../assets/testowy_ludek.png';
import { expandLink } from '../fetches/expandLink';

//icons
import { FaUser } from "react-icons/fa";
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { RxThickArrowLeft } from "react-icons/rx";
import { RxThickArrowRight } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
//?
import io from "socket.io-client";
const socket = io.connect(expandLink(''));

const NotiPage = () => {
    const { height, width } = useScreenSize();
    const [dataFromGet, setDataFromGet] = useState(null);
    const [notificationInfo, setnotificationInfo] = useState(null);
    const [showLobbys, setShowLobbys] = useState(true); // Stan określający czy wyświetlić lobbys
    const [showInfo, setshowInfo] = useState(true);
    const [style, setStyle] = useState("unclicked");
    const [styleinfo, setStyleInfo] = useState("unclicked");
    let content = [];
    useEffect(()=>{
        getInfo(),
        getData();
    },[]);
    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            const tokenWithoutQuotes = token.replace(/"/g, '');
            let url = expandLink('/api/noti/show');
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenWithoutQuotes}`
                }
            });
            if (!response.ok) {
                throw new Error('Nie udało się poprać danych');
            }
            const dataFromGet = await response.json();
            setDataFromGet(dataFromGet);
            console.log(dataFromGet);
        } catch (error) {
            console.error(error);
        }
    };

    const getInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const tokenWithoutQuotes = token.replace(/"/g, '');
            let url = expandLink('/api/noti/showinfo');
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenWithoutQuotes}`
                }
            });
            if (!response.ok) {
                throw new Error('Nie udało się poprać danych');
            }
            const notificationInfo = await response.json();
            console.log(notificationInfo);
            setnotificationInfo(notificationInfo);
        } catch (error) {
            console.error(error);
        }
    };
    function setResponse(){
        setStyleInfo("unclicked");
        getData();
        setShowLobbys(true);
        setshowInfo(false);
        if (style !== "unclicked") setStyle("unclicked");
        else setStyle("clicked");
    };
    function setInfo(){
        setStyle("unclicked");
        getInfo();
        setShowLobbys(false);
        setshowInfo(true);
        if (styleinfo !== "unclicked") setStyleInfo("unclicked");
        else setStyleInfo("clicked");
    }
    const sendAccept = async (ID, Desc, IDLobby) => {
        try {
            console.log("Akceptacja", ID, Desc);
            await socket.emit("accepted", ID, Desc, IDLobby);
            const newData = dataFromGet.Notification.filter(noti => noti.idNoti !== ID);
            setDataFromGet({ Notification: newData });
        } catch (error) {
            console.error(error);
        }
    };
    const sendDecline = async (ID, Desc, IDLobby) => {
        try {
            console.log("Odrzucenie", ID, Desc);
            await socket.emit("declined", ID, Desc, IDLobby);
            const newData = dataFromGet.Notification.filter(noti => noti.idNoti !== ID);
            setDataFromGet({ Notification: newData });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNoti = async (IDNotifi) => {
        try {
            console.log(IDNotifi)
            let url = expandLink('/api/noti/delete');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: IDNotifi, 
                }),
            });
            if (!response.ok) {
                throw new Error('Nie udało się poprać danych');
            }
            const newData = notificationInfo.Notification.filter(noti => noti.idNoti !== IDNotifi);
            setnotificationInfo({ Notification: newData });
        } catch (error) {
            console.error(error);
        }
    };
    const addLobbys = () => {
        const description = dataFromGet ? dataFromGet.Notification.map(noti => noti.message) : [];
        const notiIds = dataFromGet ? dataFromGet.Notification.map(noti => noti.idNoti) : [];
        const lobbyIds = dataFromGet ? dataFromGet.Notification.map(noti => noti.idLobby) : [];
        const avatar = dataFromGet ? dataFromGet.Notification.map(noti => noti.ownerAvatar): [];
        const senderId =  dataFromGet ? dataFromGet.Notification.map(noti => noti.senderId): [];
        for (let i = 0; i < description.length; i++) {
            content.push(
                <div key={i} className={'notificationOne'}>
                    <Link to={`/userProfile/${senderId}`}>
                        <div className='lobbyPicture flotLeftClassOrSth col-4 col-md-2' href="/">
                            <img src={avatar} alt='obraz przedstawiający lobby' className='img-fluid lobbyPictureImg' />
                    </div></Link>
                    <div className='lobbyInfoContainer flotLeftClassOrSth col-7 col-md-10'>
                        <div className='lobbyDescription'> {description[i]}
                        </div>
                    </div>
                    <table className='myTableOrSth'>
                        <tbody>
                            <tr>
                                <td><div className='bAccept' onClick={() => sendAccept(notiIds[i],description[i],lobbyIds[i])}><IoMdCheckmark /></div></td>
                                <td><div className='bAccept' onClick={() => sendDecline(notiIds[i],description[i],lobbyIds[i])}><IoMdClose /></div></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='clearer'></div>
                </div>
            );
        }
        return content;
    }
    const addNotiInfo = () => {
        let info = [];
        const notiinfo = notificationInfo ? notificationInfo.Notification.map(noti => noti.message) : [];
        const notiIds = notificationInfo ? notificationInfo.Notification.map(noti => noti.idNoti) : [];
        const avatar = dataFromGet ? dataFromGet.Notification.map(noti => noti.ownerAvatar): [];
        console.log(avatar);
        for (let i = 0; i < notiinfo.length; i++) {
            info.push(
                <div key={i} className={'notificationOne'}>
                    <div className='lobbyPicture flotLeftClassOrSth col-4 col-md-2' href="/">
                        <img src={avatar} alt='obraz przedstawiający lobby' className='img-fluid lobbyPictureImg' />
                    </div>
                    <div className='lobbyInfoContainer flotLeftClassOrSth col-7 col-md-10'>
                        <div className='lobbyDescription'> {notiinfo[i]}</div>
                    </div>
                    <div className = "deleteButton" onClick={() => deleteNoti(notiIds[i])}><FaTrashCan/></div>
                    <div className='clearer'></div>
                </div>
            );
        }
        return info;
    }

   

    return (
        <div className="NotiContainer">
            <div className="myLobbys">
                <div className='mojeDruzyny'>
                    <div className='flotLeftClassOrSth mojeDruzynyTitl'><h1>POWIADOMIENIA: </h1></div>
                    <div className='pageArrowLobb'>
                        <table className='tableWithLobbyArrows flotLeftClassOrSth'>
                            <tbody>
                                <tr>
                                    <td> <div className='arrowLobby'><LuArrowBigLeftDash /></div></td>
                                    <td> <div className='arrowLobby'><RxThickArrowLeft /></div></td>
                                    <td> <div className='smallPageNumber'>1/1</div></td>
                                    <td> <div className='arrowLobby'><RxThickArrowRight /></div></td>
                                    <td> <div className='arrowLobby'><LuArrowBigRightDash /></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="category">
                        <table className='tableWithCategory flotLeftClassOrSth'>
                            <tbody>
                                <tr>
                                    <td> <div className={style} onClick={() => setResponse()} >PROŚBY</div></td>
                                    <td> <div className={styleinfo} onClick={() => setInfo()}>ODPOWIEDZI</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='clearer'></div>
                </div>
                <div className='lobbylist'>                  
                    {showLobbys && addLobbys()}
                    {showInfo && addNotiInfo()}                
                </div>
            </div>
            <div className='placeholder'>

            </div>
            <Footer />
        </div>
    );
}

export default NotiPage;