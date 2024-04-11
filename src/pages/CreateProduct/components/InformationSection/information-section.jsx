import styled from "styled-components";
import Input from "../Input/input";

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
cursor:pointer;
transition: border .3s;
&:focus {
    border:2px solid var(--main-color);
}
`

export default function InformationSection({errors,formData}){
    return (
        <Container>
            <Title>Product Information</Title>
            <Content>
                <Input label={"name"} title={"Product name"} errors={errors?.messages['name']}>
                    <InputField name="name" id="name" type="text" placeholder="name"/>
                </Input>
                <Input label={"description"} title={"Description"} errors={errors?.messages['description']}>
                    <TextAreaField name="description" id="description" placeholder="describe your product"/>
                </Input>
                <Input label={"quantity"} title={"Quantity"} errors={errors?.messages['quantity']}>
                    <InputField name="quantity" id="quantity" type="number" min="0" placeholder="0"/>
                </Input>
                <Input label={"status"} title={"Status"} errors={errors?.messages['status']}>
                    <SelectField name="status" id="status">
                        <option value="in stock">in stock</option>
                        <option value="out of stock">out of stock</option>
                    </SelectField>
                </Input>
            </Content>
        </Container>
    )
}