/*ABOUT THIS FILE
contains function that expand main link with host name
if you are using some urls please use this function
 */

export const expandLink = (url) =>
{
    let link = 'https://zagrajzemna-backend.onrender.com';
    link+=url;
    return link;
}