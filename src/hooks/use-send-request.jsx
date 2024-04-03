import { useState, useEffect } from "react";

export async function refreshAccessToken(userContext){
    let access_token_url = import.meta.env.VITE_API_DOMAIN + "/api/access_tokens";
    let accessTokensInit = {
        method :"POST",
        headers:{
            'content-type' : "application/json",
            'accept' : 'application/json',
            'credentials': "include",        
        }
    };

    try {
        const request_access_token = await fetch(access_token_url,accessTokensInit);
        if (request_access_token?.status == 201){
            const response_access_token = await request_access_token.json();
            const token =  response_access_token.body.token;
            userContext.setToken(token)
            return token;
        }

        userContext.setToken(null);
        return null;

    }catch(error){
        userContext.setToken(null);
        return null;
    }
}


// hook that sends a request and displays a PopUp component on server down error
export const useSendRequest = (userContext) => {
    const [isServerError, setIsServerError] = useState(false);

    const sendRequest = async (uri, init={}) => {
        let url = import.meta.env.VITE_API_DOMAIN + uri;
        let defaultInit = {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'accept': 'application/json',
                'Authorization': 'Bearer ' + userContext?.token
            },
            ...init
        };

        try {
            let request = await fetch(url, defaultInit);
            let response = await request.json();

            // request a new access token 
            if (request.status === 401) {
                let new_token = await refreshAccessToken(userContext);

                if (new_token){
                    defaultInit.headers['Authorization'] = 'Bearer ' + new_token;
                    request = await fetch(url, defaultInit);
                    response = await request.json();
                }
            }
      
            return {request, response};
        } catch (error) {
            setIsServerError(true); // set error state to true if there's an error
            setTimeout(()=>{setIsServerError(false)},3000)
        }

        return {request:null, response:null};
    };

    const serverError ={
        get : ()=>{return isServerError},
        set: (state)=>setIsServerError(state)
    }

    return { sendRequest, serverError};
};
