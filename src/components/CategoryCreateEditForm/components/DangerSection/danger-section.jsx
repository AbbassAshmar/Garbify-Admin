import Input from "../../../../components/Input/input";
import styled from "styled-components";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";
import { useState } from "react";
import useSendRequest from "../../../../hooks/use-send-request";
import useUserState from "../../../../hooks/use-user-state";
import { useNavigate, useParams } from "react-router-dom";
import SuccessOrErrorPopUp from "../../../../components/SuccessOrErrorPopUp/success-or-error-pop-up";

const DeleteButton = styled.button`
background-color: red;
color:white;
padding:.5rem 1rem;
border-radius: 6px;
font-weight:500;
font-size : var(--body);
width:fit-content;
border:none;
justify-self: end;
cursor:pointer;
transition: background-color .3s;
box-shadow: 0px 0px 8px rgba(0,0,0,.4);
&:hover{
    background-color: darkred;
}
`

export default function DangerSection(){
    const {id} = useParams();
    const navigate = useNavigate();

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [isLoading, setIsLoading] = useState(false);
    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
   
    function handleResponse(request, response){
        if (!request) return;

        if (request.status == 200){
            navigate("/categories");
            return;
        }

        if (response?.error?.message){
            setResultPopUp({
                show:true, 
                status:"Error", 
                message:response.error.message
            })
        }else{
            setResultPopUp({
                show:true, 
                status:"Error", 
                message:"Unexpected error... try again later"
            })
        }
    }

    async function requestDeleteProduct(id){
        setIsLoading(true);

        const URL = `/categories/${id}`;
        const INIT = {method:"DELETE"};

        const {request, response} = await sendRequest(URL,INIT);
        handleResponse(request,response)

        setIsLoading(false);
    }

    function handleDeleteButtonClick(e){
        requestDeleteProduct(id);
    }

    return (
        <FormDefaultSection title={'Danger Section'} style={{border:"3px solid red"}}>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp}/>
            <Input style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}} title={"Delete this category"} subtitle={"Once you delete a category, there is no going back. Please be certain."}>
                <DeleteButton disabled={isLoading} onClick={handleDeleteButtonClick}>Delete category</DeleteButton>
            </Input>
        </FormDefaultSection>
    )
}