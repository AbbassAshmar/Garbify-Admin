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

export default function Input({label,title,subtitle,children,errors}){
    return (
        <InputContainer>
            <TextContainer>
                <InputTitle htmlFor={label}>{title}</InputTitle>
                {subtitle && <InputSubtitle>{subtitle}</InputSubtitle>}
            </TextContainer>
            {children}
            {errors && <ErrorMessage>{errors}</ErrorMessage>}
        </InputContainer>
    )
}