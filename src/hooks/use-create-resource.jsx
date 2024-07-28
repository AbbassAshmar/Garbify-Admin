import { useState } from 'react';



export default function useCreateResource({sendRequest,userState}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [inputErrors, setInputErrors] = useState({ fields: [], messages: {} });

    function handleResponse(request, response, onSuccess, onError){
        if (!request) {
            setIsSuccess(false);
            setInputErrors({fields:[] , messages:{}});
            return;
        };

        if (request.status == 201){
            setInputErrors({fields:[] , messages:{}});
            setIsSuccess(true);
            onSuccess();
            return;
        } 
        
        //validation error
        else if (request.status == 400){
            setInputErrors({ fields: response.metadata.error_fields, messages: response.error.details });
            onError(response.error.message);
            setIsSuccess(false);
        } 
        
        //other errors
        else  {
            setIsSuccess(false);
            setInputErrors({fileds:[], messages:{}});

            if (response?.error?.message){
                onError(response.error.message)
            }else{
                onError("Unexpected error... try again later")
            }
        }
    }
    const handleFormSubmit = async (url, data, onSuccess, onError) => {
        setIsLoading(true);

        const INIT = {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + userState?.token
            },
        };

        const {request,response} = await sendRequest(url, INIT);
        handleResponse(request, response, onSuccess, onError);
        setIsLoading(false);
    };

    return { isLoading, isSuccess, inputErrors, handleFormSubmit };
}
