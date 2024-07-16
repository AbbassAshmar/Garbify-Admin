import { useEffect, useState } from "react";
import useSendRequest from "./use-send-request";



export default function useGetCategories(format){
    const [categories, setCategories] = useState([]);
    const {sendRequest, serverError} = useSendRequest();

    useEffect(()=>{
        fetchCategoriesNested();
    },[])

    async function fetchCategoriesNested(){
        const {request, response} = await sendRequest(`/api/categories/${format}`);

        if (request?.status == 200){
            setCategories(response.data.categories);
        }else{
            setCategories([]);
        }
    }

    return [categories, setCategories];
}