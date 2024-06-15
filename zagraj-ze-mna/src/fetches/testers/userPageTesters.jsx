/*
THIS FILE CONTAINS:
- CheckAllUserData


----------------------------------------------
1. CheckAllUserData(data) - takes data and checks if it has all needed properties
properties: 'email', 'username', 'language', 'ID_LANGUAGE','about', 'city', 'contact', 'country'
if there is something wrong returns false, if everything is correct returns true
2. CheckUserStats
3. CheckLobbyList
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

export const CheckUserStats = async(data) =>{
    let good_respond = true;
    let props = ['gamesOnShelf', 'lobbiesJoined'];
    
    if(data == null)
        return false;

    for(let i=0; i<props.length; i++){
        if(!data.hasOwnProperty(props[i]))
            good_respond = false;
    }

    return good_respond;
}

export const CheckLobbyList = async(data) =>{

    let good_respond = true;
    let props = ['Lobby', 'pages'];
    let props_lobby = ['Description', 'ID_LOBBY','Name', 'NeedUsers', 'gameName', 'ownerAvatar', 'playerCount'];

    if(data == null)
        return false;

    for(let i=0; i<props.length; i++){
        if(!data.hasOwnProperty(props[i]))
            good_respond = false;
    }

    if(good_respond){
        if(data.Lobby.length>0)
            for(let i=0; i<props_lobby.length; i++)
                if(!data.Lobby.hasOwnProperty(props_lobby[i]))
                    good_respond = false;

    }

    return good_respond;
}