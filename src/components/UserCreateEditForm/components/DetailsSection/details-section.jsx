import styled from "styled-components";
import Input, { TextInputField } from "../../../../components/Input/input"
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";
import { useEffect } from "react";

const Container = styled.div`
flex:1.4;
`

const RadioInput = styled.input`
visibility: hidden;
position: absolute;
`
const FakeRadioInput = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
`
const RadioInputContainer = styled.label`
gap:.5rem;
display: flex;
cursor: pointer;
font-weight:500;
padding:.25rem .5rem;
align-items: center;
border-radius: 40px;
justify-content: center;
transition:border .3s, color .3s, background-color .3s;
border:2px solid ${({$checked})=> $checked ? "var(--main-color)" : "var(--secondary-color)"};
color:${({$checked})=> $checked ? "white" : "black"};
background-color:${({$checked})=> $checked ? "var(--main-color)" : "var(--secondary-color)"};
`

const CheckIcon = styled.i`
color:var(--main-color);
font-size: 13px;
`

export default function DetailsSection({userType, setUserType, formResetClicked, errors, setFormData, formData}){
    useEffect(()=>{
        if (formResetClicked)
        setUserType("Client");
    }, [formResetClicked])

    function handleInputValueChange(e,name){
        setFormData((prev) => ({...prev, [name] : e.target.value}));
    }

    return(
        <Container>
            <FormDefaultSection title="User Information" style={{padding:"0", boxShadow:"none"}} >
                <Input label={"user_name_input"} title={"User name"} subtitle={"user name is unique"} errors={errors?.messages['name']}>
                    <TextInputField value={formData.name} onChange={e=>handleInputValueChange(e,'name')} id="user_name_input" type="text" placeholder="ex. jackTheRipper"/>
                </Input>
                <Input label={"user_email_input"} title={"User email"} subtitle={"user email is unique"} errors={errors?.messages['email']}>
                    <TextInputField value={formData.name} onChange={e=>handleInputValueChange(e,'name')} id="user_email_input" type="text" placeholder="ex. jackTheRipper123@gmail.com"/>
                </Input>
                <Input label={"user_confirm_password_input"} title={"User password"} subtitle={"password should be at least 8 characters"} errors={errors?.messages['password']}>
                    <TextInputField value={formData.name} onChange={e=>handleInputValueChange(e,'name')} id="user_password_input" type="password" placeholder="JackTheRipper432"/>
                </Input>
                <Input label={"user_confirm_password_input"} title={"Confirm password"} subtitle={"re-write the password."} errors={errors?.messages['confirm_password']}>
                    <TextInputField value={formData.confirm_password} onChange={e=>handleInputValueChange(e,'confirm_password')} id="user_confirm_password_input" type="password" placeholder="JackTheRipper432"/>
                </Input>
                <Input label={"user_type_input"} title={"User Type"} subtitle={"Admin has permissions to add, delete and edit resources."} errors={errors?.messages['type']}>
                    <div style={{display:'flex',gap:"1rem"}}>
                        <RadioInputContainer $checked={userType=="Admin"} htmlFor="user_type_input_admin">
                            <RadioInput onChange={()=>setUserType("Admin")} checked={userType==="Admin"} type="radio" id="user_type_input_admin" value={"Admin"} />
                            <FakeRadioInput $checked={userType=="Admin"}>
                                {userType=="Admin" && <CheckIcon className="fa-solid fa-check"/> }
                            </FakeRadioInput>
                            <p>Admin</p>
                        </RadioInputContainer>
                        <RadioInputContainer  $checked={userType=="Client"} htmlFor="user_type_input_client">
                            <RadioInput onChange={()=>setUserType("Client")} checked={userType==="Client"} type="radio" id="user_type_input_client" value={"Client"} />
                            <FakeRadioInput $checked={userType=="Client"}>
                                {userType=="Client" && <CheckIcon className="fa-solid fa-check"/> }
                            </FakeRadioInput>
                            <p>Client</p>
                        </RadioInputContainer>
                    </div>
                </Input>
            </FormDefaultSection>
        </Container>
    )
}