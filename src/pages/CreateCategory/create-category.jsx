import styled from "styled-components";
import MediaSection from "./components/MediaSection/media-section";
import DetailsSection from "./components/DetailsSection/details-section";
import { useEffect, useRef, useState } from "react";
import useSendRequest from "../../hooks/use-send-request";
import useUserState from "../../hooks/use-user-state";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import CategoryCreatedPopUP from "../components/ResourceCreatedPopUp/resource-created-pop-up";
import DefaultPageHeader from "../components/DefaultPageHeader/default-page-header";
import ResourceCreationWrapper from "../components/ResourceCreationWrapper/resource-creation-wrapper";



const AddCategoryButton = styled.button`
border:none;
color:white;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);

&:hover{
    background-color:#009BCC;
}
&:disabled{
    background-color: grey;
}
`
const DiscardChangesButton = styled.button`
border:none;
color: #bebebe;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background-color .3s;
background-color: #f1f1f1;
&:hover{
    background-color: #dddddd;
}
`
export const MediaDetailsContent = styled.main`
gap:max(13%, 7rem);
padding:2rem;
display: flex;
border-radius: 6px;
background-color: white;
justify-content: space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`

const CREATION_SUCCESS_TEXT_MESSAGE = `
Category Created Successfully
and it can be used in you product
`

export default function CreateCategory(){
    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});


    function handleData(formEvent){
        return new FormData(formEvent.currentTarget);
    }

    return(
        <ResourceCreationWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/categories"} 
        resource={"category"} 
        handleData={handleData}>
            <MediaDetailsContent>   
                <MediaSection errors={inputErrors} formResetClicked={formResetClicked}/>
                <DetailsSection errors={inputErrors} formResetClicked={formResetClicked}/>
            </MediaDetailsContent>
        </ResourceCreationWrapper>
    )
}