import styled from "styled-components";
import MediaSection from "./components/MediaSection/media-section";
import DetailsSection from "./components/DetailsSection/details-section";
import { useEffect, useRef, useState } from "react";
import useSendRequest from "../../hooks/use-send-request";
import useUserState from "../../hooks/use-user-state";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import CategoryCreatedPopUP from "./components/CategoryCreatedPopUp/category-created-pop-up";
import DefaultPageHeader from "../DefaultPageHeader/default-page-header";



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
const Content = styled.main`
gap:max(13%, 7rem);
padding:2rem;
display: flex;
border-radius: 6px;
background-color: white;
justify-content: space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`

export default function CreateCategory(){
    const discardButtonRef = useRef();
    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);
    const [isCreateSuccess,setIsCreateSuccess] = useState(false);

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [errors,setErrors] = useState({fields : [] , messages : {}});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if (formResetClicked) setFormResetClicked(false);
    },[formResetClicked])

    async function requestCreateCategory(formObject){
        const url = "/api/categories";
        const init = {
            method:"POST",
            data:formObject,
            headers : {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + userState?.token
            }
        }
       
        const {request, response} = await sendRequest(url, init);
        if (request){
            if (request.status === 201){
                discardButtonRef.current.click();
                setIsCreateSuccess(true);
                setErrors({fields:[], messages:{}});
            }

            if (request.status === 400){ // validation error
                setErrors({fields:response.metadata.error_fields, message : response.error.details})
            }
        }else{
            setErrors({fields:[], messages:{}});
        }

        setIsLoading(false);
    }

    function handleFormSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        requestCreateCategory(new FormData(e.currentTarget));
    }

    function handleDiscardButtonClick(e){
        setFormResetClicked(true);
    }

    const renderHeaderButtons = ()=>(
        <>
            <DiscardChangesButton ref={discardButtonRef} onClick={handleDiscardButtonClick}>Discard</DiscardChangesButton>
            <AddCategoryButton disabled={isLoading} type="submit">Add category</AddCategoryButton>
        </>
    )
    
    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError}/>
            {isCreateSuccess && <CategoryCreatedPopUP show={isCreateSuccess} setShow={setIsCreateSuccess}/>}
            <form onSubmit={handleFormSubmit}>
                <DefaultPageHeader title="New category" renderButtons={renderHeaderButtons}>
                        <Content>   
                            <MediaSection errors={errors} formResetClicked={formResetClicked}/>
                            <DetailsSection errors={errors} formResetClicked={formResetClicked}/>
                        </Content>
                </DefaultPageHeader>
            </form>

        </>
    )
}