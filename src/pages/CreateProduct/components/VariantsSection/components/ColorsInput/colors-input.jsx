import styled from 'styled-components';
import { useState,useEffect } from 'react';
import PlusSign from '../../../../../../components/PlusSignCircle/plus-sign-circle';

export default function ColorsInput({formResetClicked, errors,formData, setFormData}){
    const [sameColorError,setSameColorError] = useState();
    const [colorInputValue, setColorInputValue] = useState();

    useEffect(()=>{
        if (formResetClicked){
            setSameColorError("");
            setColorInputValue("");
        }
    },[formResetClicked])

    useEffect(()=>{
        if (formData.colors.length !== new Set(formData.colors).size){
            setSameColorError("Same colors are not allowed.");
        }else{
            setSameColorError('');
        }
    },[formData?.colors])

    function handleDeleteColor(color){
        setFormData((prev) => ({...prev, colors : prev.colors.filter((_color) => _color !== color)}));
    }
    
    function handleColorChange(e){
        setColorInputValue(e.currentTarget.value)
    }

    function handleColorBlur(e,i){
        if (!colorInputValue) return;

        let newColor = colorInputValue;
        let newColors = [...formData.colors];

        if (newColors.some(color => color === newColor)){
            setSameColorError("Same colors are not allowed.");
            return;
        }

        newColors[i] = newColor;
        setFormData(prev => ({...prev, colors : newColors}));
        setColorInputValue('');
    }

    function handleColorPlusClick(e){
        let randomColor;
        let currentColors = [...formData.colors];

        do {
            randomColor = randomColor = "#ffffff".replace(/f/g,() => (~~(Math.random()*16)).toString(16));
        } while (currentColors.some(color => color === randomColor));
    
        setFormData(prev => ({...prev, colors : [...prev.colors, randomColor]}));
    }


    return (
        <InputContainer>
            <InputTitle>Colors</InputTitle>
            <ColorsContainer $error={errors?.messages['colors']}>
                {formData.colors.map((color,i)=>(
                    <ColorContainer key={`${color}${i}`}>
                        <XIconContainer onClick={()=>handleDeleteColor(color)}>
                            <XIcon className="fa-solid fa-xmark" />
                        </XIconContainer>
                        <ColorsInputFieldContainer>
                            <ColorsInputField 
                            onBlur={(e)=>handleColorBlur(e,i)}
                            onChange={handleColorChange}
                            value={color} 
                            type="color"/>    
                        </ColorsInputFieldContainer>
                    </ColorContainer>
                ))}
                <PlusSign onClick={handleColorPlusClick} />
            </ColorsContainer>
            {sameColorError && <ErrorMessage>{sameColorError}</ErrorMessage>}
            {errors?.messages['colors'] && <ErrorMessage>{errors?.messages['colors']}</ErrorMessage>}
        </InputContainer>
    )
}


const InputContainer = styled.div`
display: flex;
flex-direction:column;
gap:1rem;
`
const InputTitle = styled.label`
font-size:var(--body);
font-weight:600;
`

const ErrorMessage = styled.p`
color:red;
font-weight:600; 
font-size:var(--small-1);
`
const ColorsContainer = styled.div`
gap:1rem;
padding:1rem;
display: flex;
margin-top: 4px;
border-radius: 5px;
align-items: center;
flex-wrap: wrap;
border: 2px solid ${({$error}) => $error ? "red" : "var(--secondary-color)"};
`
const ColorContainer = styled.div`
position:relative;
`
const XIconContainer = styled.div`
width:20px;
height:20px;
top:-18%;
z-index:2;
right:-18%;
display: flex;
cursor: pointer;
position:absolute;
border-radius: 50%;
align-items: center;
justify-content: center;
background:var(--secondary-color);
transition: scale .3s , background-color .3s;
box-shadow: 0px 0px 4px rgba(0,0,0,0.4);
&:hover{
    background-color: grey;
    scale: 1.07;
}
`
const XIcon = styled.i`
font-size:16px;
`
const ColorsInputFieldContainer = styled.div`
height:40px;
width:40px;
border-radius:3px;
overflow:hidden;
transition: scale .3s;
box-shadow: 0px 0px 6px rgba(0,0,0,0.7);
&:hover{
    scale: 1.07;
}
`
const ColorsInputField = styled.input`
height: 200%;
width: 200%;
border: 0;
padding: 0;
outline: none;
cursor: pointer;
background:none;
cursor: pointer;
transform: translate(-25%, -25%);
`

