import { useState } from "react";
import styled from "styled-components";
import InformationSection from "./components/InformationSection/information-section";
import PricingSection from "./components/PricingSection/pricing-section";
import VariantsSection from "./components/VariantsSection/variants-section";
import ClassificationSection from "./components/ClassificationSection/classification-section";
import MediaSection from "./components/MediaSection/media-section";
import ResourceCreationWrapper from "../components/ResourceCreationWrapper/resource-creation-wrapper";

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
    const [colors, setColors] = useState(["#000000"])

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});

    function handleData(formEvent){
        let formObject = new FormData(formEvent.currentTarget);

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
        
        console.log(formObject)
        for (let obj of formObject.entries()){
            console.log(obj)
        }
        return formObject;
    }

    return(
        <ResourceCreationWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/products"} 
        resource={"product"} 
        handleData={handleData}>
            <Content>
                <InformationPricingContainer>
                    <InformationSection errors={inputErrors} />
                    <PricingSection errors={inputErrors} formResetClicked={formResetClicked}/>
                </InformationPricingContainer>
                <VariantsClassificationContainer>
                    <VariantsSection errors={inputErrors} formResetClicked={formResetClicked} setFormData={setFormData} colors={colors} setColors={setColors} />
                    <ClassificationSection errors={inputErrors} formResetClicked={formResetClicked}/>
                </VariantsClassificationContainer>
                <MediaSection errors={inputErrors} formResetClicked={formResetClicked} setFormData={setFormData} colors={colors}/>
            </Content>
        </ResourceCreationWrapper>    
    )
}