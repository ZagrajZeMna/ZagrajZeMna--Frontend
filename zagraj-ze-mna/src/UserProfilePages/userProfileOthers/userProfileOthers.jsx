
import UserProfile from "../../PageStructureElements/userProfile/userProfile";
import './userProfileOthers.css';
import Footer from "../../PageStructureElements/footer/footer.jsx";

const UserProfileOthrers = () =>{
    return(
        <div className="UserProfileOthersContainer">
            <UserProfile/>
            <div className="gimmeSpace"></div>
            <Footer/>
        </div>
    );
}

export default UserProfileOthrers;