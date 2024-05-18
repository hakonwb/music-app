


export const fetchSpotifyAPI = async(url, method, body, contentType, token ) => {

    const response = await fetch(url,{
        method: method,
        headers: {
            'Content-type': contentType,
            authorization: token? token : null,
        },
        body: body?? null,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } 
        else{
            throw new Error(res.statusText);
        }
    });

    return response;


}