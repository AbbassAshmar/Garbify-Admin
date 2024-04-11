import { useEffect, useState,useRef } from "react"
import styled from "styled-components"
import ColorSelectory from "./components/ColorSelector/color-selector"

const Container = styled.section`
flex:1;
gap:2rem;
padding:2rem;
display: flex;
border-radius: 6px;
flex-direction: column;
background-color: white;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Content = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`

const InputContainer = styled.div`
display: flex;
flex-direction:column;
gap:1rem;
`

const InputTitle = styled.label`
font-size:var(--body);
font-weight:600;
`
const InputSubtitle= styled.p`
font-size:var(--small-1);
font-weight:600;
color:#A8AAAE;
`
const ErrorMessage = styled.p`
color:red;
font-weight:600; 
font-size:var(--small-1);
`
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
const SelectField = styled.select`
width:32%;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid var(--secondary-color);
border-radius:3px;
outline: none;
transition: border .3s;
cursor:pointer;
&:focus {
    border:2px solid var(--main-color);
}
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


const XIcon = styled.i`
cursor:pointer;
font-size:1.25rem;
&:hover{
    color:grey;
}
`

// product_thumbnail = 'jiojoij'
const resp2 = [
    {
        color: 'red',
        images : [
            {
                file:'img1_file' ,
                url:'img1_url',
            },
            {
                file:'img2_file' ,
                url:'img2_url',
            }
        ],
    },
    {
        color: 'green',
        images : [
            {
                file:'img1_file' ,
                url:'img1_url',
            },
            {
                file:'img2_file' ,
                url:'img2_url',
            }
        ],
    }
]

export default function MediaSection({colors}){
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
        let newColor = isElementAddedToArr(prevColorsRef.current, colors);
        if (newColor){
            for (let imageInput of images){
                if (!imageInput.color){
                    assignColorToColoredImageInput(newColor, imageInput.id)
                    break;
                }
            }
        }else{
            const deletedColor = isElementDeletedFromArr(prevColorsRef.current, colors)
            if (deletedColor){
                unassignColorFromColoredImageInput(deletedColor);
            }else{
                const editedColors = isElementEditedInArr(prevColorsRef.current, colors);
                if (editedColors){
                    for (let imageInput of images){
                        if (imageInput.color === editedColors[0]){
                            unassignColorFromColoredImageInput(editedColors[0]);
                            assignColorToColoredImageInput(editedColors[1], imageInput.id);
                            break;
                        }
                    }
                }
            }
        }

        prevColorsRef.current = colors;
    },[colors])


    function isElementAddedToArr(prevArr,arr){
        let result = null;
        if (prevArr.length < arr.length){
            const addedElement = arr.filter(color => !prevArr.includes(color));
            result = addedElement.length ? addedElement[0] : null;
        }

        return result;
    }

    function isElementDeletedFromArr(prevArr,arr){
        let result = null;
        if (prevArr.length > arr.length){
            const deletedElement = prevArr.filter(color => !arr.includes(color));
            result = deletedElement.length ? deletedElement[0] : null;
        }

        return result;
    }

    function isElementEditedInArr(prevArr,arr){
        let result = null;
        if (prevArr.length === arr.length){
            const oldElement = prevArr.filter(color => !arr.includes(color));
            if (oldElement.length){
                const newElement = colors.filter(color => !prevArr.includes(color));
                result = [oldElement[0], newElement[0]];
            }
        }

        return result;
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

    function handleUploadColoredImage(e,id){
        let newImage = {
            file:e.currentTarget.files[0],
            url:URL.createObjectURL(e.currentTarget.files[0]),
        }

        for (let obj of images){
            if (obj.id == id){
                for (let image of obj.images){
                    if (image.file.name ===newImage.file.name && image.file.size === newImage.file.size) 
                    return;
                }
            }
        }
        
        setImages([...images].map((obj)=>{
            if (id == obj.id)
            obj.images = [...obj.images,newImage]
            return obj;
        }))
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
        if (isColorAvailableForInput(color, inputId)){
            setImages([...images].map((imageInput)=>{
                if (imageInput.id === inputId){
                    imageInput.color = color;
                    setSelectedColors([...selectedColors,[color,inputId]]);
                }
                return imageInput;
            }))

            return true;
        }

        return false;
    }

    function unassignColorFromColoredImageInput(color){
        let result = false;
        setImages([...images].map((imageInput) => {
            if (imageInput.color == color && !result){
                result = true;
                imageInput.color = "";
                setSelectedColors([...selectedColors].filter((_color) => _color[0] != color && _color[1] != imageInput.id));
            }
            return imageInput;
        }))
        
        return result;
    }

    function isColorAvailableForInput(color, inputId){
        return (selectedColors.length == 0 || !selectedColors.some(_color => (_color[0] == color && !(_color[0] == color && _color[1] == inputId))))
    }  

    return(
        <Container>
            <Title>Media</Title>
            <Content>
                <InputContainer style={{gap:'2rem'}}>
                    <div style={{display:"flex",flexDirection:"column",gap:'.2rem'}}>
                        <InputTitle style={{fontSize:'var(--heading-6)'}}>Product Thumbnail</InputTitle>
                        <InputSubtitle>displayed in the product card.</InputSubtitle>
                    </div>
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
                </InputContainer>
                <InputContainer style={{gap:'2rem'}}>
                    <div style={{display:"flex",flexDirection:"column",gap:'.2rem'}}>
                        <InputTitle style={{fontSize:'var(--heading-6)'}}>Product Images</InputTitle>
                        <InputSubtitle>
                            • Select suitable images for each product color available.<br/>
                            • Make sure you have chosen the colors first.
                        </InputSubtitle>
                    </div>
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
                </InputContainer>
            </Content>
        </Container>
    )
}   



