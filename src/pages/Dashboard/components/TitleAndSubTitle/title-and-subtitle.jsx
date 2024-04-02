import styled from "styled-components";

const TextContainer = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
gap:.5rem;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight:600;
color:black;

@media screen and (max-width:1400px){
    font-size:var(--heading-6);
}
`

const SubTitle = styled.p`
font-size:var(--body);
font-weight:600;
color:#A8AAAE;
`

export default function TitleAndSubTitle({title,subTitle}){
    return (
        <TextContainer>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
        </TextContainer>
    )
}