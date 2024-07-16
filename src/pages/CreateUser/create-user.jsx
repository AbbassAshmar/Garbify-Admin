import { useEffect, useState } from "react";
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
    const [userType, setUserType] = useState("Client");
    const [formData, setFormData] = useState(initialFormData);

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});

    useEffect(() => {
        if (formResetClicked) {
            setFormData({ ...initialFormData });
            setUserType("Client")
        }
    }, [formResetClicked]);
    

    function handleData(formEvent) {
        return processUserData(formEvent,formData,false);
    }

    function setEndpoint(){
        if (userType ==="Client"){
            return "/api/users/clients";
        }
        else if (userType === "Admin"){
            return "/api/users/admins";
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
            setFormData={setFormData}/>
        </ResourceCreationWrapper>
    )
}