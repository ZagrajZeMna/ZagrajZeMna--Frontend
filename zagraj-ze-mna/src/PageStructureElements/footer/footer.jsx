//css
import './footer.css';


//icons
import { TbCircleLetterB } from "react-icons/tb";
import { TbCircleLetterA } from "react-icons/tb";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




const Footer = () =>
{

    let table_inputs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const navigate = useNavigate();

    function checking_clicks(number){
        

        let good = true;
        let was_zero = false;
        let reset = false;
        
        if(table_inputs[number] == 1)
            reset = true;

        table_inputs[number] = 1;

        for(let i=0; i<10; i++){
            if(table_inputs[i]==0){
                good = false;
                was_zero = true;
            }

            if(was_zero && table_inputs[i] == 1)
            {
                reset = true;
            }

        }
        if(reset){
            for(let i=0; i<10; i++)
                table_inputs[i] = 0;
        }

        for(let i=number+1; i<10; i++)
            table_inputs[i] = 0;

        if(good)
            navigate("/niktTuNieWejdzieSuperTajemniceTuSiedzaZaDlugaNazwaBySamemuToWpisacLosoweSlowaJabloPociagKostaryka");
    }


    return(
        <div className="footerContainer">
            <div className="konamiCode col-12 offset-md-1 col-md-10">
                <table>
                    <tbody>
                        <tr>
                            <td><HiOutlineArrowSmUp onClick={() => checking_clicks(0)}/></td>
                            <td><HiOutlineArrowSmUp onClick={() => checking_clicks(1)}/></td>
                            <td><HiOutlineArrowSmDown onClick={() => checking_clicks(2)}/></td>
                            <td><HiOutlineArrowSmDown onClick={() => checking_clicks(3)}/></td>
                            <td><HiOutlineArrowSmLeft onClick={() => checking_clicks(4)}/></td>
                            <td><HiOutlineArrowSmRight onClick={() => checking_clicks(5)}/></td>
                            <td><HiOutlineArrowSmLeft onClick={() => checking_clicks(6)}/></td>
                            <td><HiOutlineArrowSmRight onClick={() => checking_clicks(7)}/></td>
                            <td><TbCircleLetterB onClick={() => checking_clicks(8)}/></td>
                            <td><TbCircleLetterA onClick={() => checking_clicks(9)}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            

            <div className="documentsClass">
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p> &copy; Copyright 2024 Zagraj Ze Mną </p> </div>
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p><Link to='https://www.youtube.com/watch?v=xvFZjo5PgG0' > Warunki Usługi </Link></p></div>
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p><Link to='https://www.youtube.com/watch?v=xvFZjo5PgG0' > Polityka prywatności </Link></p></div>
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p>Nie znamy Twojej gry? Zgłoś się <Link to='/contact'>tutaj</Link>!</p></div>
            </div>

            <div className='clearer'></div>

        </div>
    );
}

export default Footer;