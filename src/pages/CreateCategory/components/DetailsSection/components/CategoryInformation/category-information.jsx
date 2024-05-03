import styled from "styled-components";
import Input, { TextInputField } from "../../../../../../components/Input/input";
import SectionDefault from "../../../../../../components/FormDefaultSection/form-default-section";

const Container = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`
const TextContainer = styled.div`
gap:.5rem;
display: flex;
flex-direction: column;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Content = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`

const TextAreaField = styled.textarea`
resize: none;
width:100%;
min-height: 200px;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid var(--secondary-color);
border-radius:3px;
outline: none;
transition: border .3s;
&:focus {
    border:2px solid var(--main-color);
}
&::placeholder{
    font-weight:400;
    color:#A8AAAE;
}
`

export default function CategoryInformation({errors}){
    return(
        <Container>
            <TextContainer>
                <Title>Category Information</Title>
            </TextContainer>
            <Content>
                <Input label={"category_name_input"} title={"Category name"} subtitle={"name stored in the server"} errors={errors?.messages['name']}>
                    <TextInputField name="name" id="category_name_input" type="text" placeholder="ex. shoes"/>
                </Input>
                <Input label={"category_display_name_input"} title={"Category display name"} subtitle={"name displayed for you"} errors={errors?.messages['display_name']}>
                    <TextInputField name="display_name" id="category_display_name_input" type="text" placeholder="ex. women's best shoes"/>
                </Input>
                <Input label={"category_description_input"} title={"Category description"} errors={errors?.messages['description']}>
                    <TextAreaField name="description" id="category_description_input" type="text" placeholder="description"/>
                </Input>
            </Content>
        </Container>
    )
}