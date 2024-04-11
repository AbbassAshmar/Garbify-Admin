import styled from "styled-components";

export const InputContainer = styled.div`
display: flex;
flex-direction:column;
gap:1rem;
`
export const TextContainer = styled.div`
display: flex;
flex-direction:column;
gap:.25rem;
`
export const InputTitle = styled.label`
font-size:var(--body);
font-weight:600;
`
export const InputSubtitle= styled.p`
font-size:var(--small-1);
font-weight:600;
color:#A8AAAE;
`
export const ErrorMessage = styled.p`
color:red;
font-weight:600; 
font-size:var(--small-1);
`

export const TextInputField = styled.input`
width:100%;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid var(--secondary-color);
border-radius:3px;
outline: none;
transition: border .3s;
&:focus {
    border:2px solid var(--main-color);
}
&::placeholder{
    font-weight:400;
    color:#A8AAAE;
}
`
export default function Input({label,title,subtitle,children,errors,style}){
    return (
        <InputContainer style={style}>
            <TextContainer>
                <InputTitle htmlFor={label}>{title}</InputTitle>
                {subtitle && <InputSubtitle>{subtitle}</InputSubtitle>}
            </TextContainer>
            {children}
            {errors && <ErrorMessage>{errors}</ErrorMessage>}
        </InputContainer>
    )
}