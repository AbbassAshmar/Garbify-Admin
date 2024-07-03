import { useState } from 'react';



export default function useCreateResource({sendRequest,userState}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [inputErrors, setInputErrors] = useState({ fields: [], messages: {} });

    const handleFormSubmit = async (url, data, onSuccess, onError) => {
        setIsLoading(true);
        const init = {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + userState?.token
            },
        };

        const {request,response} = await sendRequest(url, init);

        console.log(data)
        console.log(response)
        if (request?.status == 201){
            setInputErrors({fields:[] , messages:{}});
            setIsSuccess(true);
            onSuccess();
        } 
        
        //validation error
        else if (request?.status == 400){
            setInputErrors({ fields: response.metadata.error_fields, messages: response.error.details });
            onError(response.error.message);
        } 
        
        //other errors
        else  {
            setInputErrors({fileds:[], messages:{}});
            if (response?.error?.message){
                onError(response.error.message)
            }else{
                onError("Unexpected error... try again later")
            }
        }

        setIsLoading(false);
    };

    return { isLoading, isSuccess, inputErrors, handleFormSubmit };
}
