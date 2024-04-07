import styled from 'styled-components';
import { useState } from 'react';
import PlusSign from '../../../../../../components/PlusSignCircle/plus-sign-circle';

export default function ColorsInput({errors, formData}){
    const [colors, setColors] = useState([{id:`${Date.now()}`}])

    function handleDeleteColor(id){
        setColors(colors.filter((color) => color.id !== id));
    }

    function handleColorPlusClick(){
        setColors([...colors,{id:`${Date.now()}`}]);
    }

    return (
        <InputContainer>
            <InputTitle>Colors</InputTitle>
            <ColorsContainer>
                {colors.map((color)=>(
                    <ColorContainer key={color.id}>
                        <XIconContainer onClick={(e)=>handleDeleteColor(color.id)}>
                            <XIcon className="fa-solid fa-xmark" />
                        </XIconContainer>
                        <ColorsInputFieldContainer>
                            <ColorsInputField name="colors[]" type="color"/>    
                        </ColorsInputFieldContainer>
                    </ColorContainer>
                ))}
                <PlusSign  onClick={handleColorPlusClick} />
            </ColorsContainer>
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
border:3px solid var(--secondary-color);
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

