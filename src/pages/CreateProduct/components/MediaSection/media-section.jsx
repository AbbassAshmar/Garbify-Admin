import Input from "../Input/input";
import styled from "styled-components";
import { useEffect, useState,useRef } from "react";
import SectionDefault from "../SectionDefault/section-default";
import ColorSelectory from "./components/ColorSelector/color-selector";


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
border:3px dashed var(--main-color);
`
const PlusIcon = styled.i`
position: absolute;
color:var(--main-color);
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
border:3px dashed #A8AAAE;
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

export default function MediaSection({colors,errors,formData}){
    const prevColorsRef = useRef(colors);
    const [selectedColors, setSelectedColors] = useState([]);
    const [images, setImages] = useState([]); 
    const [thumbnail, setThumbnail] = useState({color:'' , image:{file:'',url:''}});
    
    useEffect(()=>{
        if (colors.length)
        thumbnail.color = colors[0];
    },[colors])

    useEffect(()=>{
        handleAddColoredImageInput();
    },[])

    useEffect(()=>{
        handleColorChanges();
        prevColorsRef.current = colors;
    },[colors])


    function handleColorChanges() {
        const newColor = findAddedElement(prevColorsRef.current, colors);
        if (newColor) {
            const addedColor = images.find(imageInput => !imageInput.color);
            if (addedColor) {
                assignColorToColoredImageInput(newColor, addedColor.id);
                return;
            }
        }
      
        const deletedColor = findDeletedElement(prevColorsRef.current, colors);
        if (deletedColor) {
            unassignColorFromColoredImageInput(deletedColor);
            return; 
        }
      
        const editedColors = findEditedElements(prevColorsRef.current, colors);
        if (editedColors) {
            const [oldColor, newColor] = editedColors;
            const imageInputWithOldColor = images.find(imageInput => imageInput.color === oldColor);
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
        setThumbnail({...thumbnail,color:e.currentTarget.value})
    }

    function handleColoredImagesColorInputChange(e,inputId){
        let color = e.currentTarget.value;
        let newSelectColors = [...selectedColors].filter((_color => _color[0] != color && _color[1] !=inputId));

        setSelectedColors([...newSelectColors,[color,inputId]]);
        setImages([...images].map((imageInput)=>{
            if (imageInput.id === inputId){
                imageInput.color = color;
            }
            return imageInput;
        }))
    }
    
    function handleThumbnailImageInputChange(e){
        let newImage = {
            file:e.currentTarget.files[0],
            url:URL.createObjectURL(e.currentTarget.files[0]), 
        };

        setThumbnail({...thumbnail, image:newImage});
    }

    function handleUploadColoredImage(e, id) {
        const newImageFile = e.currentTarget.files[0];
        const newImageUrl = URL.createObjectURL(newImageFile);
    
        // Check if the new image already exists in any of the image objects
        if (isImageAlreadyUploaded(newImageFile.name, newImageFile.size)) return;
    
        // Add the new image to the appropriate image object
        const updatedImages = images.map(obj => {
            if (obj.id === id) {
                obj.images = [...obj.images, { file: newImageFile, url: newImageUrl }];
            }
            return obj;
        });
    
        setImages(updatedImages);
    }
    
    function isImageAlreadyUploaded(fileName, fileSize) {
        for (const obj of images) {
            for (const image of obj.images) {
                if (image.file.name === fileName && image.file.size === fileSize) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function handleDeleteColoredImage(e,id,url){  
        setImages(images.map((obj)=>{
            if (id === obj.id)
            obj.images = obj.images.filter((image)=>(image.url != url));
            return obj;
        }))
    }
    
    function handleAddColoredImageInput(){
        let inputId = `${Date.now()}`;
        let selectedColor = '';
        for (let color of colors){
            if (isColorAvailableForInput(color,inputId)){
                selectedColor = color;
                setSelectedColors([...selectedColors,[color,inputId]]);
                break;
            }
        }

        setImages([...images,{id:inputId,color:selectedColor, images:[]}]);
    }

    function handleDeleteColoredImageInput(id){
        setImages(images.filter(image=>{
            if (image.id === id){
                unassignColorFromColoredImageInput(image.color);
            }
            return image.id != id
        }))
        
    }

    function assignColorToColoredImageInput(color,inputId){
        if (!isColorAvailableForInput(color, inputId)) return false;

        setImages(images.map((imageInput)=>{
            if (imageInput.id === inputId){
                imageInput.color = color;
                setSelectedColors([...selectedColors,[color,inputId]]);
            }
            return imageInput;
        }))
 
        return true;
    }

    function unassignColorFromColoredImageInput(color){
        let isColorUnassigned = false;

        let updatedSelectedColors = selectedColors;
        const updatedImages = images.map((imageInput) => {
            if (imageInput.color == color && !isColorUnassigned){
                isColorUnassigned = true;
                imageInput.color = "";
                updatedSelectedColors = updatedSelectedColors.filter((_color) => _color[0] != color && _color[1] != imageInput.id);
            }
            return imageInput;
        })

        setImages(updatedImages);
        setSelectedColors(updatedSelectedColors);
        return isColorUnassigned;
    }

    function isColorAvailableForInput(color, inputId){
        return (selectedColors.length == 0 || !selectedColors.some(_color => (_color[0] == color && !(_color[0] == color && _color[1] == inputId))))
    }  

    return(
        <SectionDefault title={"Media"}>
            <Input style={{gap:'2rem'}} label={"thumbnail"} subtitle={'displayed in the product card.'} title={renderTitle('Product Thumbnail')} errors={errors?.messages['thumbnail']}>
                <ColorSelectory 
                id={'thumbnail_color'}
                onChange={handleThumbnailColorInputChange}
                colors={colors}
                XClick={null}
                selectedColor={thumbnail.color}
                optionCondition={color=>(true)}
                />
                <ThumbnailFieldContainer htmlFor="product_thumbnail">
                    <PlusIcon className="fa-solid fa-plus" />
                    {thumbnail.image.url &&
                    <img style={{borderRadius:"6px",position:"relative",width:'100%',height:"100%",objectFit:"cover"}} src={thumbnail.image.url} />}
                    <input accept=".jpg,.jpeg,.png" 
                    onChange={handleThumbnailImageInputChange} 
                    id="product_thumbnail" type="file" 
                    style={{visibility:'hidden',width:'.2px',position:"absolute"}}/>
                </ThumbnailFieldContainer>
            </Input>
            <Input style={{gap:'2rem'}} label={"product_images"} subtitle={IMAGES_SUBTITLE} title={renderTitle('Product Images')} errors={errors?.messages['original_price']}>
                {images && images.map((imageColorObj)=>{ 
                    return(
                    <ImageColorContainer key={imageColorObj.id}>
                        <ColorSelectory 
                        id={"images_color"+imageColorObj.id}
                        onChange={(e)=>handleColoredImagesColorInputChange(e,imageColorObj.id)}
                        colors={colors}
                        selectedColor={imageColorObj.color}
                        XClick={e=>handleDeleteColoredImageInput(imageColorObj.id)}
                        optionCondition={color => isColorAvailableForInput(color,imageColorObj.id)}
                        />
                        <ImagesAndFieldContainer>
                            <ImageFieldContainer>
                                <PlusIcon style={{color:"#A8AAAE"}} className="fa-solid fa-plus" />
                                <ImageField htmlFor={"product_image" + imageColorObj.id}/>
                                <input accept=".jpg,.jpeg,.png" 
                                onChange={(e)=> handleUploadColoredImage(e,imageColorObj.id)} 
                                id={"product_image" + imageColorObj.id} type="file" 
                                style={{visibility:'hidden',width:'.2px'}}/>
                            </ImageFieldContainer>
                            {imageColorObj.images.map((image)=>(
                                <ImageContainer onClick={(e)=>handleDeleteColoredImage(e,imageColorObj.id,image.url)} key={image.url}>
                                    <Image src={image.url} />
                                </ImageContainer>
                            ))}
                        </ImagesAndFieldContainer>
                    </ImageColorContainer>
                )})}
                <AddImageButton disabled={images.length >= colors.length? true :false} onClick={handleAddColoredImageInput}>
                    {images.length >= colors.length?
                        'No colors available': 'Add color and images'}
                </AddImageButton>
            </Input>
        </SectionDefault>
    )
}   



