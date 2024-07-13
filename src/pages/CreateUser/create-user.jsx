import { useState } from "react";
import DetailsSection from "./components/DetailsSection/details-section";
import MediaSection from "./components/MediaSection/media-section";
import { MediaDetailsContent } from "../CreateCategory/create-category";
import ResourceCreationWrapper from "../../components/ResourceCreationWrapper/resource-creation-wrapper";
import processUserData from "../../helpers/process-user-data";
import UserCreateEditForm from "../../components/UserCreateEditForm/user-create-edit-form";

const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    profile_picture: {file: '', url: ''},
};

export default function CreateUser(){
    const [formData, setFormData] = useState(initialFormData);

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});
    const [userType, setUserType] = useState("Client");

    function handleData(formEvent) {
        return processUserData(formEvent,formData,false);
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
            <UserCreateEditForm 
            editMode={false} 
            formData={formData} 
            inputErrors={inputErrors} 
            userType={userType}
            setUserType={setUserType}
            formResetClicked={formResetClicked} 
            setFormData={setFormData}/>
        </ResourceCreationWrapper>
    )
}