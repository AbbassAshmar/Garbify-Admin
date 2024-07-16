import styled from "styled-components";
import { useEffect, useState } from "react";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

const Container = styled.div`
flex:1;
`
const ImageInputContainer = styled.label`
width: 100%;
aspect-ratio:1/1.15;
overflow: hidden;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-radius: 6px;
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

export default function MediaSection({errors, setFormData, formData}){
    function handleCategoryImageInputChange(e){
        setFormData((prev) => ({
            ...prev, 
            image : {
                file : e.target.files[0], 
                url:URL.createObjectURL(e.currentTarget.files[0])
            }
        }));
    }

    return(
        <Container>
            <FormDefaultSection style={{padding:"0",boxShadow:"none"}} title={"Category image"} subtitle={"Represents the category"}>
                <ImageInputContainer htmlFor="category_image">
                    <PlusIcon className="fa-solid fa-plus" />
                    {formData?.image?.url && <CategoryImage src={formData.image.url} />}
                    <HiddenImageInput accept=".jpg,.jpeg,.png" 
                    onChange={handleCategoryImageInputChange} 
                    id="category_image" type="file"/>
                </ImageInputContainer>
                {errors?.messages['image'] && <ErrorMessage>{errors.messages['image']}</ErrorMessage>}
            </FormDefaultSection>
        </Container>
    )
}