import { useState } from "react";
import DetailsSection from "./components/DetailsSection/details-section";
import MediaSection from "./components/MediaSection/media-section";
import { MediaDetailsContent } from "../CreateCategory/create-category";
import ResourceCreationWrapper from "../components/ResourceCreationWrapper/resource-creation-wrapper";


export default function CreateUser(){
    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});
    const [userType, setUserType] = useState("Client");

    function handleData(formEvent){
        return new FormData(formEvent.currentTarget);
    }

    function setEndpoint(){
        if (userType ==="Client"){
            return "/api/register";
        }
        else if (userType === "Admin"){
            return "/api/register/admin";
        }
    }

    return (
        <ResourceCreationWrapper
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={setEndpoint()} 
        resource={"user"} 
        handleData={handleData}>
            <MediaDetailsContent>
                <MediaSection errors={inputErrors} formResetClicked={formResetClicked}/>
                <DetailsSection userType={userType} setUserType={setUserType} formResetClicked={formResetClicked} errors={inputErrors}/>
            </MediaDetailsContent>
        </ResourceCreationWrapper>
    )
}