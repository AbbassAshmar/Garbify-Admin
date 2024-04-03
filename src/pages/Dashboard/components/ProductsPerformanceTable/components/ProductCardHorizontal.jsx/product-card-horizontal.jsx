import styled from "styled-components";

const Container = styled.div`
width:100%;
display: flex;
align-items: flex-start;
gap:1rem;
`

const ImageContainer = styled.div`
width:27%;
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
const Price = styled.p`
    font-size:var(--small-1);
    font-weight:400;

`

export default function ProductCardHorizontal({image, name, price}){
    return(
        <Container>
            <ImageContainer>
                <Image src={image} alt={`product ${name} image`}/>
            </ImageContainer>
            <DetailsContainer>
                <Name>{name}</Name>
                <Price>{price}$</Price>
            </DetailsContainer>
        </Container>
    )
}