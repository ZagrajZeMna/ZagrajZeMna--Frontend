/*      THIS FILE CONTAINS:
    - useGetToken hook

---------------------------------------------------------
    1. useGetToken

    1.1. params:
    url - url to get data from backend, for example:
    /api/profile/getUserDetails
    host name is added by useGetToken
    
    1.2 return value:
    - isPending - if true then data is still loading
    - isError - if true then there is an error
    - errorMessage - contains error message, empty if there is no error
    - data - data from backend

    1.3. accessing data from useGetToken
    
    const DataRespond = useGetToken('/api/profile/getAllLanguages');
    DataRespond.isPending; DataRespond.isError; DataRespond.errorMessage; DataRespond.data;
    important: you can use any name as the name of const response 

    or

    const {isPending, isError, errorMessage, data} = useGetToken('/api/profile/getUserDetails');
    important: names of consts have to be the same as above (otherwise they will be undefined)

    1.4. using the data:
    EXAMPLE I.
    {!DataRespond.isError && (<div className='dataGetter' onLoad={setData()}></div>)}
    exmaple above fires functions setData when error is null
    function setData() sets all states that are needed
    IMPORTANT: you need to add some protection from invinity rerenders of page, due to using
    react useState

    EXMAPLE II.
     {!DataRespond.isError && (<div className='dataWritter'>DataRespond.data.myElement</div>)}
     this above displays div that contains some dataElement if there is no error



 */


import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CheckData } from '../testers/checkData';
import { expandLink } from './expandLink';


const useGetToken = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setMessage] = useState('');

  useEffect(()=>{
    const fetchData = async() => {
        setIsPending(true);
        try
        {
          let urlBig = expandLink(url);
        
        const token = localStorage.getItem('token');
        let decoded = [];
        if(token != null)
            decoded = jwtDecode(token);

        //date
        let currentDate = new Date();

        //if token not exist = we are logged out
        if(!token || decoded.exp * 1000 < currentDate.getTime())
        {
            setError(true);
            throw new Error('Forbiden request! Please log in!');
            
        }
        const tokenWithoutQuotes = token.replace(/"/g, '');


        const response =  await fetch(urlBig,{
          method:'GET',
          headers: {
              'Authorization' : `Bearer ${tokenWithoutQuotes}`
          }
          });

          if(!response.ok) throw new Error(response.statusText);
          const json = await response.json();
          setIsPending(false);
          let checked = CheckData(url, json);
          if(!checked)
          {
            console.error("unexpected respond from backend!");
            throw new Error('Unexpected respond from backend. JSON not form properly');
          }

          setData(json);
          setError(null);
        }
        catch(error)
        {
          setError(true);
          setIsPending(false);
          setMessage(error.message);
        }
        
      };
      fetchData();
  }, [url]);
  return {isPending, isError, errorMessage, data};
}
export default useGetToken;