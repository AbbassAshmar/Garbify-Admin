import styled from "styled-components";
import InformationSection from "./components/InformationSection/information-section";
import PricingSection from "./components/PricingSection/pricing-section";
import VariantsSection from "./components/VariantsSection/variants-section";
import ClassificationSection from "./components/ClassificationSection/classification-section";
import MediaSection from "./components/MediaSection/media-section";
import DangerSection from "./components/DangerSection/danger-section";

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

export default function ProductCreateEditForm({editMode,formData, inputErrors,formResetClicked, setFormData}){
    return(
        <Content>
            <InformationPricingContainer>
                <InformationSection errors={inputErrors} formData={formData} setFormData={setFormData}/>
                <PricingSection errors={inputErrors} formData={formData} setFormData={setFormData}/>
            </InformationPricingContainer>
            <VariantsClassificationContainer>
                <VariantsSection errors={inputErrors} formResetClicked={formResetClicked} formData={formData} setFormData={setFormData}/>
                <ClassificationSection errors={inputErrors} formResetClicked={formResetClicked} formData={formData} setFormData={setFormData}/>
            </VariantsClassificationContainer>
            <MediaSection errors={inputErrors} formResetClicked={formResetClicked} formData={formData} setFormData={setFormData}/>
            {editMode && <DangerSection />}
        </Content>
    )
}