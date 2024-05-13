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






const Footer = () =>
{
    return(
        <div className="footerContainer">
            <div className="konamiCode col-12 offset-md-1 col-md-10">
                <table>
                    <tbody>
                        <tr>
                            <td><HiOutlineArrowSmUp/></td>
                            <td><HiOutlineArrowSmUp/></td>
                            <td><HiOutlineArrowSmDown/></td>
                            <td><HiOutlineArrowSmDown/></td>
                            <td><HiOutlineArrowSmLeft/></td>
                            <td><HiOutlineArrowSmRight/></td>
                            <td><HiOutlineArrowSmLeft/></td>
                            <td><HiOutlineArrowSmRight/></td>
                            <td><TbCircleLetterB/></td>
                            <td><TbCircleLetterA/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            

            <div className="documentsClass">
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p> &copy; Copyright 2024 Zagraj Ze Mną </p> </div>
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p><Link to='https://www.youtube.com/watch?v=xvFZjo5PgG0' > Warunki Usługi </Link></p></div>
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p><Link to='https://www.youtube.com/watch?v=xvFZjo5PgG0' > Polityka prywatności </Link></p></div>
                <div className='toTheLeftDude col-10 offset-1 col-md-3 offset-md-0'><p>Nie znamy Twojej gry? Zgłoś się <Link to='gameRequest'>tutaj</Link>!</p></div>
            </div>

            <div className='clearer'></div>

        </div>
    );
}

export default Footer;