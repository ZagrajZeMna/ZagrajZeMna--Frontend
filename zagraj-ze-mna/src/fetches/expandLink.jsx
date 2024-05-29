/*ABOUT THIS FILE
contains function that expand main link with host name
if you are using some urls please use this function
 */

export const expandLink = (url) =>
{
    let link = 'http://localhost:4001';
    link+=url;
    return link;
}