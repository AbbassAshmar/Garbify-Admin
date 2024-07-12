import { useState } from 'react';

export default function useEditResource(sendRequest) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [inputErrors, setInputErrors] = useState({ fields: [], messages: {} });

    const handleFormSubmit = async (url, data, onSuccess, onError) => {
        setIsLoading(true);
        const INIT = {
            method: "PATCH",
            body: data,
        };

        const {request,response} = await sendRequest(url, INIT);

        if (request?.status == 200){
            setInputErrors({fields:[] , messages:{}});
            setIsSuccess(true);
            onSuccess();
            return;
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
        
        setIsSuccess(false);
        setIsLoading(false);
    };

    return { isLoading, isSuccess, inputErrors, handleFormSubmit };
}
