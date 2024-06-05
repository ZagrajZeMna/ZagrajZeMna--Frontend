/*
THIS FILE CONTAINS:
- CheckAllUserData


----------------------------------------------
1. CheckAllUserData(data) - takes data and checks if it has all needed properties
properties: 'email', 'username', 'language', 'ID_LANGUAGE','about', 'city', 'contact', 'country'
if there is something wrong returns false, if everything is correct returns true
 */


export const CheckAllUserData = async(data) =>{

    let good_respond = true;
    let props = ['email', 'username', 'language', 'ID_LANGUAGE','about', 'city', 'contact', 'country'];

    if(data == null)
        return false;

    for(let i=0; i<props.length; i++){
            if(!data.hasOwnProperty(props[i]))
                good_respond = false;
        }
    
    return good_respond;

}