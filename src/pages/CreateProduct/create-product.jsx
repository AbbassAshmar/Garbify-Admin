import { useLocation } from "react-router-dom";
import styled from "styled-components";
import InformationSection from "./components/InformationSection/information-section";
import PricingSection from "./components/PricingSection/pricing-section";
import VariantsSection from "./components/VariantsSection/variants-section";
import ClassificationSection from "./components/ClassificationSection/classification-section";
import MediaSection from "./components/MediaSection/media-section";
import { useEffect, useState } from "react";

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
    const [formData, setFormData] = useState();
    const [formResetClicked, setFormResetClicked] = useState(false);

    const [colors, setColors] = useState(["#000000"])
    const location = useLocation();

    function handleFormSubmit (e){
        e.preventDefault();
        let formObject = new FormData(e.currentTarget);

        // handle thumbnail data
        formObject.append('thumbnail_data[color]',formData['thumbnail_data'].color);
        formObject.append('thumbnail_data[image]',formData['thumbnail_data'].image.file);

        // handle images data
        for (let i in formData['images_data']){
            formObject.append('images_data['+i+']'+'[color]',formData['images_data'][i].color);
            for (let j in formData['images_data'][i].images){
                formObject.append('images_data['+i+']'+'[images][]',formData['images_data'][i].images[j].file);
            }
        }

        // handle sizes data
        let attributeWithValue = {};
        for (let i in formData['sizes_data']){
            let size_object = formData['sizes_data'][i];
            formObject.append('sizes_data['+i+']'+'[value]', size_object.value);
            formObject.append('sizes_data['+i+']'+'[measurement_unit]', size_object.measurement_unit);

            for (let j in size_object['attributes']){
                let attribute = size_object['attributes'][j];
                if (attribute.value.trim() !== '') {
                    attributeWithValue[j] = true;
                }
            }
        }

        for (let i in formData['sizes_data']){
            let size_object = formData['sizes_data'][i];

            let hasAttributesWithValue = size_object['attributes'].some(attribute => attribute.value.trim() !== '');
            if (!hasAttributesWithValue) continue;

            for (let j in size_object['attributes']){
                if (!attributeWithValue[j]) continue;
                if (attributeWithValue[j]) {
                    let attribute = size_object['attributes'][j];
                    if (attribute.value.trim() === '' && attribute.measurement_unit.trim() === '') continue;

                    formObject.append('sizes_data['+i+']'+'[attributes]['+j+'][value]', attribute.value);
                    formObject.append('sizes_data['+i+']'+'[attributes]['+j+'][measurement_unit]', attribute.measurement_unit);
                }
            }
        }
        
        // make the request 
    }

    function handleDiscardForm(e){
        setFormResetClicked(true);
    }

    useEffect(()=>{
        if (formResetClicked) setFormResetClicked(false);
    },[formResetClicked])

    return(
        <Container onSubmit={handleFormSubmit}>
            <Header>
                <HeaderText>
                    <PageTitle>Add Product</PageTitle>
                    <PagePath>{location.pathname.split("/").join(" / ")}</PagePath>
                </HeaderText>
                <HeaderButtons>
                    <DiscardChangesButton type="reset" onClick={handleDiscardForm}>Discard</DiscardChangesButton>
                    <AddProductButton type="submit">Add product</AddProductButton>
                </HeaderButtons>
            </Header>
            <Content>
                <InformationPricingContainer>
                    <InformationSection />
                    <PricingSection formResetClicked={formResetClicked}/>
                </InformationPricingContainer>
                <VariantsClassificationContainer>
                    <VariantsSection formResetClicked={formResetClicked} setFormData={setFormData} colors={colors} setColors={setColors} />
                    <ClassificationSection formResetClicked={formResetClicked}/>
                </VariantsClassificationContainer>
                <MediaSection formResetClicked={formResetClicked} setFormData={setFormData} colors={colors}/>
            </Content>
        </Container>
    )
}