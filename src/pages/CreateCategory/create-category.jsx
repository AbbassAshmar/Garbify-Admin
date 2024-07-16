import styled from "styled-components";
import {useEffect, useState} from "react";
import ResourceCreationWrapper from "../../components/ResourceCreationWrapper/resource-creation-wrapper";
import CategoryCreateEditForm from "../../components/CategoryCreateEditForm/category-create-edit-form";
import processCategoryData from "../../helpers/process-category-data";

export const MediaDetailsContent = styled.main`
gap:max(13%, 7rem);
padding:2rem;
display: flex;
border-radius: 6px;
background-color: white;
justify-content: space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`

const initialFormData = {
    name : "",
    display_name: "",
    description: "",
    parent_id : "",
    image : {url : "" , file : ""}
}

export default function CreateCategory(){
    const [formData, setFormData] = useState(initialFormData);

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});

    useEffect(() => {
        if (formResetClicked) 
        setFormData({ ...initialFormData });
    }, [formResetClicked]);

    function handleData(formEvent) {
        return processCategoryData(formEvent,formData,false);
    }

    return(
        <ResourceCreationWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/categories"} 
        resource={"category"} 
        handleData={handleData}>
            <CategoryCreateEditForm 
            inputErrors={inputErrors} 
            formData={formData} 
            setFormData={setFormData}/>
        </ResourceCreationWrapper>
    )
}