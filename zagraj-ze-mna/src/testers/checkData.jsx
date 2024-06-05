/*
THIS FILE CONTAINS:
- checkData function

-------------------------------------------
About checkData:
- it use switch to call others functions that checks if data from backend is correct
- you are free to add here your own units tests
*/

//imports of unit tests
import { CheckAllUserData } from "./userPageTesters";

export const CheckData = async(url, data) =>{

    let correct = true;
    switch(url)
    {
        case '/api/profile/getUserDetails':
            correct = await CheckAllUserData(data);
            break;
        default:
            correct = true;
            console.warn("Warning! There is no unit test for your url! Data can be incorrect! Your url:", url, " \nPlese go to checkData file and add needed unit test!");
            break;
    }
    return correct;
};