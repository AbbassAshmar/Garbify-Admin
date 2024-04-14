import styled from "styled-components";

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
const TextContainer = styled.div`
gap:.5rem;
display: flex;
flex-direction: column;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Subtitle = styled.p`
color : #A8AAAE;
font-weight:500;
font-size:var(--body);
`
const Content = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`

export default function FormDefaultSection({children,title,subtitle}){
    return (
        <Container>
            <TextContainer>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </TextContainer>
            
            <Content>
                {children}
            </Content>
        </Container>
    )
}