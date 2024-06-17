import EditPageUserDataForm from "./editPageUserDataForm.jsx";
import EditPageUserPicture from "./editProfilePicture.jsx";
import EditPageUserGames from "./editPageUserGames.jsx";
import Footer from "../../PageStructureElements/footer/footer.jsx";
import ChangePassword from "./changePassword.jsx";

import './editUserPage.css';
import useGet from "../../fetches/useFetch.jsx";

const EditUserPage = () =>
{
    
    return(
        <div className="editPageContainer">
            <EditPageUserDataForm/>
            <hr/>
            <div className="space"></div>
            <EditPageUserPicture/>
            <div className="space"></div>
            <hr/>
            <EditPageUserGames/>
            <div className="space"></div>
            <hr/>
            <ChangePassword/>
            <Footer/>
        </div>
    );
}
export default EditUserPage;