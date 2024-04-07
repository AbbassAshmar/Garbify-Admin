import { useEffect, useState } from "react";
import styled from "styled-components";
import ColorsInput from "./components/ColorsInput/colors-input";
import SizesInput from "./components/SizesInput/sizes-input";
import SizesTable from "./components/SizesInput/components/SizesTable/sizes-table";

const Container = styled.section`
flex:1;
gap:2rem;
padding:2rem;
display: flex;
border-radius: 6px;
min-width: 0;
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
gap:1rem;
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
const ErrorMessage = styled.p`
color:red;
font-weight:600; 
font-size:var(--small-1);
`
const SizesInputContainer = styled.div`
gap:1rem;
display: flex;
flex-direction:column;
padding:1rem; 
border-radius:6px;
border: 3px solid var(--secondary-color);
`
const AddSizeButton = styled.button`
border:none;
padding:0 1rem;
font-weight:500;
cursor: pointer;
border-radius: 4px;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);

&:hover{
    background-color:#009BCC;
}
`
const SizesListContainer = styled.div`
gap:1rem;
display: flex;
flex-wrap: wrap;
min-height:65px;
max-height: 160px;
overflow-y:auto;
align-items: flex-start;
justify-content: flex-start;
`
const Size = styled.div`
gap:4px;
display: flex;
font-weight:500;
cursor: pointer;
padding:4px 8px;
border-radius:4px;
align-items: center;
justify-content: center;
font-size:var(--small-1);
background-color: var(--secondary-color);
&:hover{
    background-color: #c0c3c7;
}
`
const SizesTableButton = styled.button`
border:none;
padding:.5rem 2rem;
font-weight:500;
cursor: pointer;
border-radius: 4px;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);
color: white;
width: fit-content;
&:hover{
    background-color:#009BCC;
}
`
export default function VariantsSection({errors,formData}){

    return (
        <Container>
            <Title>Variants</Title>
            <Content>
                <ColorsInput errors={errors} formData={formData} />
                <SizesInput errors={errors} formData={formData} />
            </Content>
        </Container>
    )
}

