import styled from "styled-components";
import Input, { TextInputField } from "../../../../components/Input/input"
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

const Container = styled.div`
flex:1.4;
`
export default function DetailsSection({errors}){
    return(
        <Container>
            <FormDefaultSection title="User Information" style={{padding:"0", boxShadow:"none"}} >
                <Input label={"user_name_input"} title={"User name"} subtitle={"user name is unique"} errors={errors?.messages['name']}>
                    <TextInputField name="name" id="user_name_input" type="text" placeholder="ex. jackTheRipper"/>
                </Input>
                <Input label={"user_email_input"} title={"User email"} subtitle={"user email is unique"} errors={errors?.messages['email']}>
                    <TextInputField name="email" id="user_email_input" type="text" placeholder="ex. jackTheRipper123@gmail.com"/>
                </Input>
                <Input label={"user_confirm_password_input"} title={"User password"} subtitle={"password should be at least 8 characters"} errors={errors?.messages['password']}>
                    <TextInputField name="password" id="user_password_input" type="password" placeholder="JackTheRipper432"/>
                </Input>
                <Input label={"user_confirm_password_input"} title={"Confirm password"} subtitle={"re-write the password."} errors={errors?.messages['confirm_password']}>
                    <TextInputField name="confirm_password" id="user_confirm_password_input" type="password" placeholder="JackTheRipper432"/>
                </Input>
                <Input label={"user_type_input"} title={"User Type"} subtitle={"Admin has permissions to add, delete and edit resources."} errors={errors?.messages['type']}>
                    {/* <TextInputField name="type" id="user_type_input" type="password" placeholder="JackTheRipper432"/> */}
                </Input>
            </FormDefaultSection>
        </Container>
    )
}