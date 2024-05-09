import { useState } from "react";
import DetailsSection from "./components/DetailsSection/details-section";
import MediaSection from "./components/MediaSection/media-section";
import { MediaDetailsContent } from "../CreateCategory/create-category";
import ResourceCreationWrapper from "../components/ResourceCreationWrapper/resource-creation-wrapper";


export default function CreateUser(){
    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});


    function handleData(formEvent){
        return new FormData(formEvent.currentTarget);
    }

    return (
        <ResourceCreationWrapper
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/users"} 
        resource={"user"} 
        handleData={handleData}>
            <MediaDetailsContent>
                <MediaSection errors={inputErrors} formResetClicked={formResetClicked}/>
                <DetailsSection errors={inputErrors}/>
            </MediaDetailsContent>
        </ResourceCreationWrapper>
    )
}