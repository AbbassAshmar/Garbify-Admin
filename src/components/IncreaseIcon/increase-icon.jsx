import styled from "styled-components";

const Container = styled.div`
border-radius:50%;
background:rgba(0,255,0,0.18);

display:flex;
align-items:center;
justify-content:center;
width:22px;
height:22px;
`
const ArrowIcon = styled.i`
font-size:.8rem;
transform:rotate(30deg);
color :rgb(81,230,49);
`

export default function IncreaseIcon(){
    return(
        <Container>
            <ArrowIcon className="fa-solid fa-arrow-up"/>
        </Container>
    )
}