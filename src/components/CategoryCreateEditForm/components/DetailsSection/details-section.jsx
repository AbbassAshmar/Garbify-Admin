import styled from "styled-components";
import CategoryInformation from "./components/CategoryInformation/category-information";
import CategoryParentPicker from "./components/CategoryParentPicker/category-parent-picker";

const Container = styled.div`
flex:1.4;
gap:2rem;
display: flex;
flex-direction: column;
`

export default function DetailsSection({errors, formData, setFormData, isEditing}){
    return(
        <Container>
            <CategoryInformation formData={formData} setFormData={setFormData} errors={errors}/>
            <CategoryParentPicker formData={formData} setFormData={setFormData} errors={errors} isEditing={isEditing}/>
        </Container>
    )
}