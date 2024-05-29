import EditPageUserDataForm from "./editPageUserDataForm.jsx";
import Footer from "../footer/footer.jsx";

import './editUserPage.css';
import useGet from "../fetches/useFetch.jsx";

const EditUserPage = () =>
{
    
    return(
        <div className="editPageContainer">
            <EditPageUserDataForm/>
            <Footer/>
        </div>
    );
}
export default EditUserPage;