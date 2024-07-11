import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import useUserState from "../../../hooks/use-user-state";
import useSendRequest from "../../../hooks/use-send-request";
import useCreateResource from "../../../hooks/use-create-resource";
import SuccessOrErrorPopUp from "../../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import ResourceCreatedPopUP from "../ResourceCreatedPopUp/resource-created-pop-up";
import DefaultPageHeader from "../../components/DefaultPageHeader/default-page-header";

const AddProductButton = styled.button`
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

export default function ResourceCreationWrapper({children, endpointURL, handleData, resource, formResetClicked, setFormResetClicked, setInputErrors}){
    const discardButtonRef = useRef();
    const userState = useUserState();
    const {sendRequest ,serverError} = useSendRequest(userState);

    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
    const {isLoading, isSuccess, inputErrors, handleFormSubmit:handleSubmit} = useCreateResource({sendRequest,userState});

    const [showSuccessPopUP, setShowSuccessPopUp] = useState(false);

    useEffect(()=>{
        setInputErrors(inputErrors)
    }, [inputErrors])

    useEffect(()=>{
        if (isSuccess) setShowSuccessPopUp(true);
    },[isSuccess])

    useEffect(()=>{
        if (formResetClicked) setFormResetClicked(false);
    },[formResetClicked])

    function onSuccess(){
        discardButtonRef.current.click();
    }   

    function onError(message){
        setResultPopUp({
            show:true,
            status:"Error",
            message:message
        });
    }

    function handleFormSubmit(e){
        e.preventDefault();
        handleSubmit(endpointURL, handleData(e), onSuccess, onError);
    }

    function handleDiscardForm(e){
        setFormResetClicked(true);
    }

    const renderHeaderButtons = ()=>(
        <>
            <DiscardChangesButton ref={discardButtonRef} type="reset" onClick={handleDiscardForm}>Discard</DiscardChangesButton>
            <AddProductButton disabled={isLoading} type="submit">Add {resource}</AddProductButton>
        </>
    )

    return (
        <>
            {showSuccessPopUP && <ResourceCreatedPopUP button={"View "+resource+"s"} redirect={"/"+resource+"s"} message={`${resource} created successfully`} show={showSuccessPopUP} setShow={setShowSuccessPopUp}/>}
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp}/>
            <form onSubmit={handleFormSubmit}>
                <DefaultPageHeader renderButtons={renderHeaderButtons} title={"New " + resource}>
                    {children}
                </DefaultPageHeader>
            </form>
        </>
    )
}