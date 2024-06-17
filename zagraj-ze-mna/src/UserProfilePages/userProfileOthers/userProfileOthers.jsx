
import UserProfile from "../../PageStructureElements/userProfile/userProfile";
import './userProfileOthers.css';
import Footer from "../../PageStructureElements/footer/footer.jsx";
import ReviewList from "../../PageStructureElements/reviewsList/reviewsList.jsx";

const UserProfileOthrers = () =>{
    return(
        <div className="UserProfileOthersContainer">
            <UserProfile/>
            <div className="gimmeSpace"></div>
            <ReviewList/>
            <div className="gimmeSpace"></div>
            <Footer/>
        </div>
    );
}

export default UserProfileOthrers;