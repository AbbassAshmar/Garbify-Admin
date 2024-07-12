import styled from "styled-components";
import MediaSection from "./components/MediaSection/media-section";
import DetailsSection from "./components/DetailsSection/details-section";
import {useState} from "react";
import ResourceCreationWrapper from "../../components/ResourceCreationWrapper/resource-creation-wrapper";

export const MediaDetailsContent = styled.main`
gap:max(13%, 7rem);
padding:2rem;
display: flex;
border-radius: 6px;
background-color: white;
justify-content: space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
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