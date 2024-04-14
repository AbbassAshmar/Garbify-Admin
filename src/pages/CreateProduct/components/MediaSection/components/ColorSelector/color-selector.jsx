import styled from "styled-components";
import {InputTitle, ErrorMessage, InputContainer} from "../../../../../../components/Input/input.jsx";

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

const XIcon = styled.i`
cursor:pointer;
font-size:1.25rem;
&:hover{
    color:grey;
}
`


export default function ColorSelector({ id, colors, selectedColor, onChange, optionCondition, XClick}){
    return (
        <InputContainer>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',overflow:'hidden'}}>
                <InputTitle htmlFor={id}>Color</InputTitle>
                {XClick && <XIcon onClick={XClick} className="fa-solid fa-xmark" />}
            </div>
            <SelectField onChange={onChange} id={id}>
                {colors.map((color) => {
                    if (optionCondition(color))
                    return <option key={color} value={color}>{color}</option>
                })}
            </SelectField>
            {!selectedColor && <ErrorMessage>Please select a color</ErrorMessage>}
        </InputContainer>
    );
};
