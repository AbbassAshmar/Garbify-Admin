import styled from "styled-components";

const Container = styled.div`
width:100%;
display: flex;
align-items: flex-start;
gap:1rem;
`

const ImageContainer = styled.div`
width:21%;
aspect-ratio:1/1.04;
position:relative;
display:flex;
max-width: 120px;
`

const Image = styled.img`
object-fit: cover; 
width: 100%;
height: 100%;
margin:0;
border-radius: 17px 0 0 17px;
`

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
gap:.5rem;
`

const Name = styled.p`
font-size:var(--body);
font-weight:600;
`

const Description = styled.p`
font-weight:500;
font-size:var(--small-1);
color:var(--secondary-text);
max-width: 200px;
overflow: hidden;
text-overflow: ellipsis;

overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;

`

export default function CategoryCardHorizontal({image, name, description}){
    return(
        <Container>
            <ImageContainer>
                <Image src={image} alt={`product ${name} image`}/>
            </ImageContainer>
            <DetailsContainer>
                <Name>{name}</Name>
                <Description>{description}</Description>
            </DetailsContainer>
        </Container>
    )
}