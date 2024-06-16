/*  MANUAL OF FUNCTIONS BELOW:
---------------------------------------------------------------
            postFetchJWT
    import:
    import {postFetchJWT} from 'fetches/postFetch.jsx'

    useage:
    respond = await postFetchJWT(url, body); //await is important to get the data
    //below is example how to get certain data fields
    console.log(respond);
    console.log(respond.isError);
    console.log(respond.errorMessage);
    console.log(respond.data);
    
    params:
    - url means url to api
    can be: '/api/profile/updateCountry'. Important don't add at the begining host url
    fetch adds it automatically
    - body - required body by backend, can be something like that:
    let body = { "country": "Poland" };

    return value:
    {isError, errorMessage, data}
    - isError is boolean, when true it means that error occures when tried to fetch the data
    - errorMEssage is string with explanation why error happened
    - data is backend respond, like page of games or sth like that

    if you want to see working example go to editPageUserDataForm.jsx to the handleSubmit function

-----------------------------------------------------------------------------------------------------
                postFetch

*/


import { jwtDecode } from 'jwt-decode';
import { expandLink } from './expandLink';
import {CheckData} from './testers/checkData';

export const postFetchJWT = async (url,my_body, toJSON=true, postMethod=true) => {
    
    const token = localStorage.getItem('token');
    let data = null;
    let isError = false;
    let errorMessage = "none";

    let urlBig = expandLink(url);
    
    try
    {
        let decoded = [];
        if(token != null)
            decoded = jwtDecode(token);

        //date
        let currentDate = new Date();

        //if token not exist = we are log out
        if(!token || decoded.exp * 1000 < currentDate.getTime())
        {
            isError = true;
            throw new Error('Forbiden request! Please log in!');
            
        }
        const tokenWithoutQuotes = token.replace(/"/g, '');

        let sender = null;
        let my_headers = null;
        if(toJSON)
        {
            sender = JSON.stringify(my_body);
            my_headers = {
                'Authorization' : `Bearer ${tokenWithoutQuotes}`,
                'content-type': 'application/json'};
        }
        
        else
        {
            my_headers = {
                'Authorization' : `Bearer ${tokenWithoutQuotes}`};
             sender = my_body;
        }
        let post_m
        if(postMethod)
            post_m = 'POST';
        else
            post_m = 'DELETE';
           

        //console.log("body: ",sender);
        //console.log("headers: ", my_headers);

        const response = await fetch(
        urlBig,
        {
            method: post_m,
            headers: my_headers,
            body:  sender,
        }
        );

        //checking backend respond
        if(!response.ok){
            const errorData = await response.json();
            isError = true;
            throw new Error(errorData.message || 'Login error');
            
        }
        else
        {
            data = await response.json();
            //console.log(data);
            if(!CheckData(url, data)){
                console.error("unexpected respond from backend!");
                throw new Error('Unexpected respond from backend. JSON not form properly');
            }
            else
                return {isError, errorMessage, data};
        }
        
    }
    catch(error)
    {
        console.error(error.message);
        errorMessage = error.message;
        return {isError, errorMessage, data};
    }
    
  };