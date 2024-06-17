
//structure
import Footer from "./footer";
import PedroPedroPedro from "../../LoadingChad/JustPedro";

//images
import Shocking from '../../assets/Impossible.png'; 

//css
import './easterEgg.css';
import { connect } from "socket.io-client";

import logoBaki from "./assets/Baki.jpg"

const createPedroTable =() =>
{
    let index = 0;
    let content = [];
    for(let i=0; i<1; i++){
        for(let j=0; j<1; j++){
            content.push(<div key={index} className="pedroContainerHere">
                <PedroPedroPedro/>
            </div>);
            index++;
        }
        content.push(<div key={index} className="clearer"></div>);
        index++;
        content.push(<div key={index} className="spaceEasterEgg"></div>);
        index++;

    }
    return content;
}

let gibberishLines = [
    '- \"Przed wyruszeniem w drogę należy zebrać drużynę\"',
    "- Drużynę?",
    "- Ludzi, z którymi skrzyżujesz drogi, poznanych na dłużej czy krócej... Zapamiętasz...",
    "- Zapamiętam?",
    "- Nawet gdy ostatnia gra zostanie rozegrana, wspomnienia pozostaną. Z nostalgią będą wracać zarwane noce w kompanii dobrych znajomych, gry pełne emocji. To pozostanie...",
    "- Zapamiętam...",
    "- Szerokej drogi!"
];

const createGibberishTalking = () =>{
    let content = [];
    let left = true;
    let classAdd = "leftText"; 
    for(let i = 0; i < 7; i++){
        if(left)
            classAdd = "leftText";
        else
            classAdd = "rightText";

        left = !left;
        content.push(<div key={i} className={"dialogLine "+ classAdd}>
                {gibberishLines[i]}
        </div>);
    }

    return content;
}

const EasterEgg = () =>{
    
    return(
        <div className="easterEggContainer">
            <div className="spaceEasterEgg"></div>
            <div className="ContainerSlim">

                
                <div className="borderEasterEgg">

                
                    <div className="titleEasterEgg">
                        <div className="textEasterEgg">
                            <h1>
                                <img src={Shocking} alt="that was shocking" className="img-fluid faceEmoji"/>
                                Znalaziono mnie!
                                <img src={Shocking} alt="that was shocking" className="img-fluid faceEmoji"/>
                            </h1>  
                        </div>
                        <div className="clearer"></div>
                    </div>
                    {createPedroTable()}

                    <div className="dialogOrSth">
                    <div class="container">
                        <h1 className="tytul">NASZA DRUŻYNA</h1>
                            <div class="memberWhite">
                                <img src={logoBaki} alt="Member 1"/>
                                <div class="description">
                                    <h3 className="IMIE">Przemysław Kubas</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                            <div class="memberBlack right">
                                <img src={logoBaki} alt="Member 2"/>
                                <div class="description">
                                    <h3 className="IMIE">Michał Kosiorski</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                            <div class="memberWhite">
                                <img src={logoBaki} alt="Member 3"/>
                                <div class="description">
                                    <h3 className="IMIE">Adam Krawczyk</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                            <div class="memberBlack right">
                                <img src={logoBaki} alt="Member 4"/>
                                <div class="description">
                                    <h3 className="IMIE">Hubert Kraus</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                            <div class="memberWhite">
                                <img src={logoBaki} alt="Member 5"/>
                                <div class="description">
                                    <h3 className="IMIE">Jakub Ciurkot</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                            <div class="memberBlack right">
                                <img src={logoBaki} alt="Member 6"/>
                                <div class="description">
                                    <h3 className="IMIE">Jan Kościółek</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                            <div class="memberWhite">
                                <img src={logoBaki} alt="Member 7"/>
                                <div class="description">
                                    <h3 className="IMIE">Łukasz Książek</h3>
                                    <p>Opis</p>
                                </div>
                            </div>
                        </div>
                        {/* {createGibberishTalking()} */}
                    </div>
                </div>
                <div className="spaceEasterEgg"></div>
            </div>
            <Footer/>
        </div>
    );
}


export default EasterEgg;