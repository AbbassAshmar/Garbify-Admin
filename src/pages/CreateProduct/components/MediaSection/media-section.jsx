import Input, { ErrorMessage } from "../../../../components/Input/input";
import styled from "styled-components";
import { useEffect, useState,useRef } from "react";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";
import ColorSelector from "./components/ColorSelector/color-selector";


const ThumbnailFieldContainer = styled.label`
width: 32%;
aspect-ratio:1/1.15;
overflow: hidden;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-radius: 6px;
border:3px dashed ${({$color}) => $color};
`
const ThumbnailImage = styled.img`
border-radius:6px;
position:relative;
width:100%;
height:100%;
object-fit:cover;
`
const PlusIcon = styled.i`
position: absolute;
color:${({$color}) => $color};
font-size:var(--heading-3);
z-index: 0;
`
const ImageColorContainer = styled.div`
gap:2rem;
padding:2rem;
display: flex;
border-radius: 6px;
flex-direction: column;
border: 3px solid var(--secondary-color);
`
const ImageField = styled.label`
width: 100%;
height:100%;
cursor: pointer;
border-radius: 6px;
border:3px dashed ${({$color}) => $color};
`
const ImagesAndFieldContainer=  styled.div`
gap:2rem;
width: 100%;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: flex-start;
`
const ImageFieldContainer = styled.div`
width:30%;
aspect-ratio:1/1.15;
position: relative;
display: flex;
justify-content: center;
align-items: center;
`
const AddImageButton = styled.button`
border:none;
padding:.5rem 2rem;
font-weight:500;
cursor: pointer;
border-radius: 4px;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);
color: white;
width: fit-content;
&:hover{
    background-color:#009BCC;
}
&:disabled{
    background-color: grey;
}
`
const ImageContainer = styled.div`
width:30%;
overflow: hidden;
aspect-ratio:1/1.15;
border:3px solid ${({$color}) => $color};
border-radius: 6px;
`
const Image = styled.img`
height:100%;
width:100%;
object-fit: cover;
border-radius: 6px;
`

const IMAGES_SUBTITLE = <span>• Select suitable images for each product color available.<br/>
• Make sure you have chosen the colors first.</span>

function renderTitle(title){
    return <span style={{fontSize:'var(--heading-6)'}}>{title}</span>;
}

export default function MediaSection({formResetClicked, formData,errors,setFormData}){
    const prevColorsRef = useRef(formData.colors);

    useEffect(()=>{
        if (formResetClicked){
            prevColorsRef.current=[]
        }
    },[formResetClicked])
    
    useEffect(()=>{
        if (formData.images_data.length == 0){
            let inputId = `${Date.now()}`;
            let color = formData.colors[0];
            
            setFormData(prev => ({
                ...prev,
                images_data : [{id:inputId,color:color, images:[]}]
            }))
        }
    },[])

    useEffect(()=>{
        setFormData(prev => ({
            ...prev,
            thumbnail_data :{
                ...prev.thumbnail_data,
                color:prev.colors[0] || ""
            }
        }))
    },[JSON.stringify(formData.colors)])

    useEffect(()=>{
        handleColorChanges();
        prevColorsRef.current = formData.colors;
    },[JSON.stringify(formData.colors)])

    function handleColorChanges() {
        // if a new color is added, assign it to an images group without a color
        const newColor = findAddedElement(prevColorsRef.current, formData.colors);
        if (newColor) {
            const colorlessInput = formData.images_data.find(imageInput => !imageInput.color);
            if (colorlessInput) {
                assignColorToColoredImageInput(newColor, colorlessInput.id);
                return;
            }
        }
      
        // if a color is deleted, unassign it from the images group using it
        const deletedColor = findDeletedElement(prevColorsRef.current, formData.colors);
        if (deletedColor) {
            unassignColorFromColoredImageInput(deletedColor);
            return; 
        }
      
        // if a color is changed, update the color of the images group using it.
        const editedColors = findEditedElements(prevColorsRef.current, formData.colors);
        if (editedColors) {
            const [oldColor, newColor] = editedColors;
            const imageInputWithOldColor = formData.images_data.find(imageInput => imageInput.color === oldColor);
            if (imageInputWithOldColor) {
                unassignColorFromColoredImageInput(oldColor);
                assignColorToColoredImageInput(newColor, imageInputWithOldColor.id);
            }
        }
    }

    function findAddedElement(prevArr, arr) {
        if (prevArr.length >= arr.length) return null;
        const addedElements = arr.filter(element => !prevArr.includes(element));
        return addedElements.length > 0 ? addedElements[0] : null;
    }

    function findDeletedElement(prevArr, arr) {
        if (prevArr.length <= arr.length) return null;
        const deletedElements = prevArr.filter(element => !arr.includes(element));
        return deletedElements.length > 0 ? deletedElements[0] : null;
    }

    function findEditedElements(prevArr, arr) {
        if (prevArr.length !== arr.length) return null;
        
        const oldElement = prevArr.filter(element => !arr.includes(element));
        if (oldElement.length === 0) return null;
    
        const newElement = arr.filter(element => !prevArr.includes(element));
        return [oldElement[0], newElement[0]];
    }

    function handleThumbnailColorInputChange(e){
        setFormData(prev =>({
            ...prev, 
            thumbnail_data : {...prev.thumbnail_data, color :e.target.value}
        }))
    }

    function handleColoredImagesColorInputChange(e,inputId){
        let color = e.currentTarget.value;
        setFormData(prev => ({
            ...prev,
            images_data : prev.images_data.map(imageInput => {
                if (imageInput.id === inputId) imageInput.color = color;
                return imageInput;
            })
        }))
    }
    
    function handleThumbnailImageInputChange(e){
        let newImage = {
            file:e.currentTarget.files[0],
            url:URL.createObjectURL(e.currentTarget.files[0]), 
        };

        setFormData(prev =>({
            ...prev, 
            thumbnail_data : {...prev.thumbnail_data, image:newImage}
        }))
    }

    function handleUploadColoredImage(e, id) {
        const newImageFile = e.currentTarget.files[0];
        const newImageUrl = URL.createObjectURL(newImageFile);
    
        // Check if the new image already exists in any of the image objects
        if (isImageAlreadyUploaded(newImageFile.name, newImageFile.size)) return;
    
        // Add the new image to the appropriate image object
        const updatedImages = formData.images_data.map(obj => {
            if (obj.id === id) 
            obj.images = [...obj.images, { file: newImageFile, url: newImageUrl }];
            
            return obj;
        });
        
        setFormData(prev => ({...prev, images_data : updatedImages}));
    }
    
    function isImageAlreadyUploaded(fileName, fileSize) {
        for (const obj of formData.images_data) {
            for (const image of obj.images) {
                if (image.file.name === fileName 
                && image.file.size === fileSize) return true;
            }
        }
        return false;
    }
    
    function handleDeleteColoredImage(e,id,url){  
        setFormData(prev => ({
            ...prev,
            images_data : prev.images_data.map(imageInput => {
                if (imageInput.id === id) 
                imageInput.images = imageInput.images.filter((image)=>(image.url != url));
                return imageInput;
            })
        }))
    }
    
    function handleAddColoredImageInput(){
        let inputId = `${Date.now()}`;
        for (let color of formData.colors){
            if (isColorAvailableForInput(color,inputId)){
                setFormData(prev => ({
                    ...prev,
                    images_data : [...prev.images_data,{id:inputId,color:color, images:[]}]
                }))
                return true;
            }
        }
        return false;
    }

    function handleDeleteColoredImageInput(id){
        let images_data = [...formData.images_data].filter(input => {
            if (input.id === id) unassignColorFromColoredImageInput(input.color);
            return input.id != id
        });
        
        setFormData(prev => ({
            ...prev,
            images_data :images_data
        }))
    }

    function assignColorToColoredImageInput(color,inputID){
        if (!isColorAvailableForInput(color, inputID)) return false;

        setFormData(prev => ({
            ...prev,
            images_data : prev.images_data.map(imageInput => {
                if (imageInput.id === inputID) {
                    imageInput.color = color;
                }
                return imageInput;
            })
        }))
        
        return true;
    }

    function unassignColorFromColoredImageInput(color){
        let isColorUnassigned = false;

        const updatedImages = formData.images_data.map(imageInput => {
            if (imageInput.color == color && !isColorUnassigned){
                isColorUnassigned = true;
                imageInput.color = "";
            }
            return imageInput;
        })

        setFormData(prev => ({
            ...prev ,
            images_data : updatedImages
        }));

        return isColorUnassigned;
    }


    function getSelectedColors(){
        let selected = [];
        formData.colors.forEach(color => {
            formData.images_data.forEach(input =>{
                if (color == input.color)
                selected.push([color, input.id])
            })
        })
    
        return selected;
    }

    function isColorAvailableForInput(color, inputId){
        let selected = getSelectedColors();
        let available = (selected.length == 0 || !selected.some(_color => (
            _color[0] == color && _color[1] != inputId
        )))

        return available;
    }  

    function isSubStringKeyInErrors(substring){
        if (!errors?.messages) return false;
        for (const key in errors.messages) {
            if (key.startsWith(substring)) {
                return true;
            }
        }
        return false;
    }

    function showErrorMessagesOfSubStrings(substring){
        if (!errors?.messages) return [];
        let messages = [];
        for (const key in errors.messages) {
            if (key.startsWith(substring)) {
                messages.push(errors.messages[key]);
            }
        }
        return messages;
    }

    return(
        <FormDefaultSection title={"Media"}>
            <Input style={{gap:'2rem'}} label={"thumbnail"} subtitle={'displayed in the product card.'} title={renderTitle('Product Thumbnail')} errors={errors?.messages['thumbnail_data.image']}>
                <ColorSelector 
                errors={errors?.messages['thumbnail_data.color']}
                id={'thumbnail_color'}
                onChange={handleThumbnailColorInputChange}
                colors={formData.colors}
                XClick={null}
                selectedColor={formData.thumbnail_data.color}
                optionCondition={color=>(true)}
                />
                <ThumbnailFieldContainer $color={errors?.messages['thumbnail_data.image'] ? "red" : "var(--main-color)"} htmlFor="product_thumbnail">
                    <PlusIcon $color={errors?.messages['thumbnail_data.image'] ? "red" : "var(--main-color)"}  className="fa-solid fa-plus" />
                    {formData.thumbnail_data.image.url &&
                    <ThumbnailImage src={formData.thumbnail_data.image.url} />}
                    <input accept=".jpg,.jpeg,.png" 
                    onChange={handleThumbnailImageInputChange} 
                    id="product_thumbnail" type="file" 
                    style={{visibility:'hidden',width:'.2px',position:"absolute"}}/>
                </ThumbnailFieldContainer>
            </Input>
            <Input style={{gap:'2rem'}} label={"product_images"} subtitle={IMAGES_SUBTITLE} title={renderTitle('Product Images')}>
                {formData.images_data && formData.images_data.map((imageColorObj,index)=>{ 
                    return(
                    <ImageColorContainer key={imageColorObj.id}>
                        <ColorSelector
                        errors={errors?.messages[`images_data.${index}.color`]} 
                        id={"images_color"+imageColorObj.id}
                        onChange={(e)=>handleColoredImagesColorInputChange(e,imageColorObj.id)}
                        colors={formData.colors}
                        selectedColor={imageColorObj.color}
                        XClick={e=>handleDeleteColoredImageInput(imageColorObj.id)}
                        optionCondition={color => isColorAvailableForInput(color,imageColorObj.id)}
                        />
                        <ImagesAndFieldContainer>
                            <ImageFieldContainer>
                                <PlusIcon $color={isSubStringKeyInErrors(`images_data.${index}.images`)? "red" : "#A8AAAE"} className="fa-solid fa-plus" />
                                <ImageField $color={isSubStringKeyInErrors(`images_data.${index}.images`)? "red" : "#A8AAAE"} htmlFor={"product_image" + imageColorObj.id}/>
                                <input accept=".jpg,.jpeg,.png" 
                                onChange={(e)=> handleUploadColoredImage(e,imageColorObj.id)} 
                                id={"product_image" + imageColorObj.id} type="file" 
                                style={{visibility:'hidden',width:'.2px'}}/>
                            </ImageFieldContainer>
                            {imageColorObj.images.map((image,_index)=>(
                                <ImageContainer $color={errors?.messages[`images_data.${index}.images.${_index}`] ? "red" : "#A8AAAE"} onClick={(e)=>handleDeleteColoredImage(e,imageColorObj.id,image.url)} key={image.url}>
                                    <Image src={image.url} />
                                </ImageContainer>
                            ))}
                        </ImagesAndFieldContainer>
                        {isSubStringKeyInErrors(`images_data.${index}.images`) && (
                            <div style={{display:"flex", flexDirection:"column", gap:".25rem"}}>
                                {showErrorMessagesOfSubStrings(`images_data.${index}.images`).map((message,index)=>(
                                    <ErrorMessage key={index}>{message}</ErrorMessage>
                                ))}
                            </div>
                        )}
                    </ImageColorContainer>
                )})}
                <AddImageButton type="button" disabled={formData.images_data.length >= formData.colors.length} onClick={handleAddColoredImageInput}>
                    {formData.images_data.length >= formData.colors.length?
                        'No colors available': 'Add color and images'}
                </AddImageButton>
            </Input>
        </FormDefaultSection>
    )
}   



