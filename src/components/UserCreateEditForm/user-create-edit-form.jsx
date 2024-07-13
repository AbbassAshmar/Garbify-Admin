import DetailsSection from "./components/DetailsSection/details-section";
import MediaSection from "./components/MediaSection/media-section";
import DangerSection from "./components/DangerSection/danger-section";
import { MediaDetailsContent } from "../CreateCategory/create-category";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
gap:2rem;
`

export default function UserCreateEditForm({editMode,formData, inputErrors,formResetClicked, setFormData, setUserType}){
    return(
        <Container>
            <MediaDetailsContent>
                <MediaSection formData={formData} setFormData={setFormData} errors={inputErrors} formResetClicked={formResetClicked}/>
                <DetailsSection formData={formData} setFormData={setFormData} userType={userType} setUserType={setUserType} formResetClicked={formResetClicked} errors={inputErrors}/>
            </MediaDetailsContent>
            {editMode && <DangerSection />}
        </Container>

    )
}