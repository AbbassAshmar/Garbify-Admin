import { useEffect, useState } from "react";
import useSendRequest from "./use-send-request";



export default function useGetCategories(form){
    const [categories, setCategories] = useState([]);
    const {sendRequest, serverError} = useSendRequest();

    useEffect(()=>{
        fetchCategoriesNested();
    },[])

    async function fetchCategoriesNested(){
        const {request, response} = await sendRequest(`/api/categories/${form}`);

        if (request?.status == 200){
            setCategories(response.data.categories);
        }else{
            setCategories([]);
        }
    }

    return [categories, setCategories];
}