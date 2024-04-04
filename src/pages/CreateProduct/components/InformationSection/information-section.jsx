import styled from "styled-components";

const Container = styled.section`
flex:1;
gap:2rem;
padding:2rem;
display: flex;
border-radius: 6px;
flex-direction: column;
background-color: white;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
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
const InputContainer = styled.div`
display: flex;
flex-direction:column;
gap:.5rem;
`
const InputTitle = styled.label`
font-size:var(--body);
font-weight:600;
`
const InputField = styled.input`
width:100%;
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
const SelectField = styled.select`
width:100%;
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
`
const ErrorMessage = styled.p`
color:red;
font-weight:600; 
font-size:var(--small-1);
`
export default function InformationSection({error,formData}){
    return (
        <Container>
            <Title>Product Information</Title>
            <Content>
                <InputContainer>
                    <InputTitle for="name">Product name</InputTitle>
                    <InputField name="name" id="name" type="text" placeholder="name"/>
                    {error?.messages['name'] && <ErrorMessage>{error?.messages['name']}</ErrorMessage>}
                </InputContainer>
                <InputContainer>
                    <InputTitle for="description">Description</InputTitle>
                    <TextAreaField name="description" id="description" placeholder="describe your product"/>
                    {error?.messages['description'] && <ErrorMessage>{error?.messages['description']}</ErrorMessage>}
                </InputContainer>
                <InputContainer>
                    <InputTitle for="quantity">Quantity</InputTitle>
                    <InputField name="quantity" id="quantity" type="number" min="0" placeholder="0"/>
                    {error?.messages['quantity'] && <ErrorMessage>{error?.messages['quantity']}</ErrorMessage>}
                </InputContainer>
                <InputContainer>
                    <InputTitle for="status">Status</InputTitle>
                    <SelectField name="status" id="status">
                        <option value="in stock">in stock</option>
                        <option value="out of stock">out of stock</option>
                    </SelectField>
                    {error?.messages['status'] && <ErrorMessage>{error?.messages['status']}</ErrorMessage>}
                </InputContainer>
            </Content>
        </Container>
    )
}