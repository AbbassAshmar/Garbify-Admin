import styled from "styled-components";
import { useEffect, useState } from "react";
import {ErrorMessage} from "../../../../components/Input/input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

const Container = styled.div`
flex:1;
`
const ImageInputContainer = styled.label`
width: 100%;
border-radius: 50%;
aspect-ratio: 1/1;
overflow: hidden;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border:3px dashed var(--main-color);
`

const CategoryImage = styled.img`
border-radius:6px;
position:relative;
width:100%;
height:100%;
object-fit:cover;
`
const PlusIcon = styled.i`
position: absolute;
color:var(--main-color);
font-size:var(--heading-3);
z-index: 0;
`

const HiddenImageInput = styled.input`
visibility: hidden;
width: .2px;
position: absolute;
`

export default function MediaSection({errors, formData, setFormData}){
    function handleProfilePictureChange(e){
        setFormData((prev) => ({
            ...prev, 
            profile_picture : {
                file : e.target.files[0], 
                url:URL.createObjectURL(e.currentTarget.files[0])
            }
        }));
    }

    return(
        <Container>
            <FormDefaultSection style={{padding:"0",boxShadow:"none"}} title={"User Profile Picture"} subtitle={"represents the user (optional)"}>
                <ImageInputContainer htmlFor="user_profile_picture">
                    <PlusIcon className="fa-solid fa-plus" />
                    {formData?.profile_picture?.url && <CategoryImage src={formData.profile_picture.url} />}
                    <HiddenImageInput accept=".jpg,.jpeg,.png" 
                    onChange={handleProfilePictureChange} 
                    id="user_profile_picture" type="file" />
                </ImageInputContainer>
                {errors?.messages['profile_picture'] && <ErrorMessage>{errors.messages['profile_picture']}</ErrorMessage>}
            </FormDefaultSection>
        </Container>
    )
}