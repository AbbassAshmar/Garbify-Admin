import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
flex:1;
gap:2rem;
display: flex;
flex-direction:column;
`

const TextContainer = styled.div`
gap:.5rem;
display: flex;
flex-direction: column;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Subtitle = styled.p`
color : #A8AAAE;
font-weight:500;
font-size:var(--body);
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

export default function MediaSection({errors, formResetClicked}){
    const [categoryImageURL, setCategoryImageURL] = useState('');

    useEffect(()=>{
        if (formResetClicked)
        setCategoryImageURL('');
    },[formResetClicked])

    function handleCategoryImageInputChange(e){
        setCategoryImageURL(URL.createObjectURL(e.currentTarget.files[0]))
    }

    return(
        <Container>
            <TextContainer>
                <Title>Category Image</Title>
                <Subtitle>Represents the category.</Subtitle>
            </TextContainer>
            <ImageInputContainer htmlFor="category_image">
                <PlusIcon className="fa-solid fa-plus" />
                {categoryImageURL && <CategoryImage src={categoryImageURL} />}
                <HiddenImageInput accept=".jpg,.jpeg,.png" 
                onChange={handleCategoryImageInputChange} 
                id="category_image" type="file" name="image"/>
            </ImageInputContainer>
            {errors?.messages['image'] && <ErrorMessage>{errors.messages['image']}</ErrorMessage>}
        </Container>
    )
}