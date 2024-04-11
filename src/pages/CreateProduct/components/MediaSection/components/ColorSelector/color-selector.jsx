import styled from "styled-components";

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


export default function ColorSelectory({ id, colors, selectedColor, onChange, optionCondition, XClick}){
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
