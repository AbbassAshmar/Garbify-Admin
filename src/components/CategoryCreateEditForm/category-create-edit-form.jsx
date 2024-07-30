import styled from "styled-components"
import MediaSection from "./components/MediaSection/media-section";
import DetailsSection from "./components/DetailsSection/details-section";
import DangerSection from "./components/DangerSection/danger-section";

export const MediaDetailsContent = styled.main`
gap:max(13%, 7rem);
padding:2rem;
display: flex;
border-radius: 6px;
background-color: white;
justify-content: space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`


export default function CategoryCreateEditForm({editMode,formData, inputErrors, setFormData, isEditing=false}){
    return( 
        <MediaDetailsContent>   
            <MediaSection errors={inputErrors} formData={formData} setFormData={setFormData}/>
            <DetailsSection formData={formData} setFormData={setFormData} errors={inputErrors} isEditing={isEditing}/>
            {editMode && <DangerSection />}
        </MediaDetailsContent>
    )
}