import { useEffect, useState } from "react";
import useSendRequest from "./use-send-request";



export default function useGetProductStatuses(){
    const [statuses, setStatuses] = useState([]);
    const {sendRequest, serverError} = useSendRequest();

    useEffect(()=>{
        fetchProductStatuses();
    },[])

    async function  fetchProductStatuses(){
        const {request, response} = await sendRequest(`/api/products/statuses`);

        if (request?.status == 200){
            setStatuses(response.data.statuses);
        }else{
            setStatuses([]);
        }
    }

    return [statuses, setStatuses];
}