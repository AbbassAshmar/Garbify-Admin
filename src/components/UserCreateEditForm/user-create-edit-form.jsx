import DetailsSection from "./components/DetailsSection/details-section";
import MediaSection from "./components/MediaSection/media-section";
import DangerSection from "./components/DangerSection/danger-section";
import { MediaDetailsContent } from "../../pages/CreateCategory/create-category";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
gap:2rem;
`

export default function UserCreateEditForm({editMode,formData, inputErrors, setFormData,userType, setUserType}){
    return(
        <Container>
            <MediaDetailsContent>
                <MediaSection formData={formData} setFormData={setFormData} errors={inputErrors}/>
                <DetailsSection editMode={editMode} formData={formData} setFormData={setFormData} userType={userType} setUserType={setUserType} errors={inputErrors}/>
            </MediaDetailsContent>
            {editMode && <DangerSection />}
        </Container>

    )
}