import EditPageUserDataForm from "./editPageUserDataForm.jsx";
import EditPageUserPicture from "./editProfilePicture.jsx";
import EditPageUserGames from "./editPageUserGames.jsx";
import Footer from "../../PageStructureElements/footer/footer.jsx";

import './editUserPage.css';
import useGet from "../../fetches/useFetch.jsx";

const EditUserPage = () =>
{
    
    return(
        <div className="editPageContainer">
            <EditPageUserDataForm/>
            <EditPageUserPicture/>
            <EditPageUserGames/>
            <Footer/>
        </div>
    );
}
export default EditUserPage;