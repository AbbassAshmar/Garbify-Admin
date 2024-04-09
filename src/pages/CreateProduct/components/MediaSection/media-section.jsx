import { useEffect, useState } from "react"
import styled from "styled-components"




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
    const [selectedColors, setSelectedColors] = useState([]);
    const [images, setImages] = useState([]); 
    const [thumbnail, setThumbnail] = useState({color:'' , image:{file:'',url:''}});
    
    useEffect(()=>{
        handleAddColoredImageInput();
    },[])

    useEffect(()=>{
        // you can't add image input without an available color
    },[colors])

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

    //upload according to indexes , color might change at any index 
    //without leading to images inconsistency
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
        setImages(images.filter(image=>image.id != id))
    }

    function assignColorToColoredImageInput(color,inputId){
        if (isColorAvailableForInput(color, inputId)){
            setSelectedColors([...selectedColors,[color,inputId]]);
            setImages([...images].map((imageInput)=>{
                if (imageInput.id === inputId){
                    imageInput.color = color;
                }
                return imageInput;
            }))

            return true;
        }

        return false;
    }

    function isColorAvailableForInput(color, inputId){
        return (selectedColors.length == 0 || !selectedColors.some(_color => (_color[0] == color && !(_color[0] == color && _color[1] == inputId))))
    }  

    useEffect(()=>{
        console.log(selectedColors)
    },[selectedColors])

    return(
        <Container>
            <Title>Media</Title>
            <Content>
                <InputContainer style={{gap:'2rem'}}>
                    <div style={{display:"flex",flexDirection:"column",gap:'.2rem'}}>
                        <InputTitle style={{fontSize:'var(--heading-6)'}}>Product Thumbnail</InputTitle>
                        <InputSubtitle>displayed in the product card.</InputSubtitle>
                    </div>
                    <InputContainer>
                        <InputTitle htmlFor="thumbnail_color">Color</InputTitle>
                        <SelectField defaultValue={'Red'} onChange={handleThumbnailColorInputChange} id="thumbnail_color">
                            {colors.map((color)=>(
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </SelectField>
                    </InputContainer>
                    <ThumbnailFieldContainer htmlFor="product_thumbnail">
                        <PlusIcon className="fa-solid fa-plus" />
                        {thumbnail.image.url &&
                        <img style={{borderRadius:"6px",position:"relative",width:'100%',height:"100%",objectFit:"cover"}} src={thumbnail.image.url} />
                        }
                    </ThumbnailFieldContainer>
                    <input accept=".jpg,.jpeg,.png" onChange={handleThumbnailImageInputChange} id="product_thumbnail" type="file" style={{visibility:'hidden',width:'.2px',position:"absolute"}}/>
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
                            <InputContainer>
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',overflow:'hidden'}}>
                                    <InputTitle htmlFor={"images_color"+imageColorObj.id}>Color</InputTitle>
                                    <XIcon onClick={e=>handleDeleteColoredImageInput(imageColorObj.id)} className="fa-solid fa-xmark" />
                                </div>
                                <SelectField onChange={(e)=>handleColoredImagesColorInputChange(e,imageColorObj.id)} id={"images_color"+imageColorObj.id}>
                                    {colors.map((color)=>{
                                        if (isColorAvailableForInput(color,imageColorObj.id))
                                        return <option key={color} value={color}>{color}</option>
                                    })}
                                </SelectField>
                            </InputContainer>
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
                    
                    <AddImageButton onClick={handleAddColoredImageInput}>Add color and images</AddImageButton>
                </InputContainer>
            </Content>
        </Container>
    )
}   