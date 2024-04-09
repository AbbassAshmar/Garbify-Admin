import { useLocation } from "react-router-dom";
import styled from "styled-components";
import InformationSection from "./components/InformationSection/information-section";
import PricingSection from "./components/PricingSection/pricing-section";
import VariantsSection from "./components/VariantsSection/variants-section";
import ClassificationSection from "./components/ClassificationSection/classification-section";
import MediaSection from "./components/MediaSection/media-section";
import { useState } from "react";


const Container = styled.form`
gap:2rem;
padding:2rem;
display: flex;
flex-direction:column;
background-color: #F1F4F9;
`
const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: flex-start;
`
const HeaderText = styled.div`
display: flex;
flex-direction: column;
gap:.5rem;
`
const PageTitle = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`

const PagePath = styled.p`
font-size:var(--body);
font-weight: 600;
color : #A8AAAE;
`

const HeaderButtons = styled.div`
display: flex;
gap:1rem;
`

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
`
const DiscardChangesButton = styled.button`
border:none;
color: #bebebe;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background .3s;
background-color: #f1f1f1;
&:hover{
    background-color: #dddddd;
}
`
const Content = styled.main`
display: flex;
flex-direction: column;
gap:2rem;
`
const InformationPricingContainer = styled.div`
display: flex;
width:100%;
gap:2rem;
`

const VariantsClassificationContainer = styled.div`
display: flex;
width:100%;
gap:2rem;
`

export default function CreateProduct(){
    const [colors, setColors] = useState(["#000000"])
    const location = useLocation();

    function handleFormSubmit (e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
    }


    return(
        <Container onSubmit={handleFormSubmit}>
            <Header>
                <HeaderText>
                    <PageTitle>Add Product</PageTitle>
                    <PagePath>{location.pathname.split("/").join(" / ")}</PagePath>
                </HeaderText>
                <HeaderButtons>
                    <DiscardChangesButton>Discard</DiscardChangesButton>
                    <AddProductButton type="submit">Add product</AddProductButton>
                </HeaderButtons>
            </Header>
            <Content>
                <InformationPricingContainer>
                    <InformationSection />
                    <PricingSection />
                </InformationPricingContainer>
                <VariantsClassificationContainer>
                    <VariantsSection colors={colors} setColors={setColors} />
                    <ClassificationSection />
                </VariantsClassificationContainer>
                <MediaSection colors={colors}/>
            </Content>
        </Container>
    )
}