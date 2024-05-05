import styled from "styled-components";


const Container = styled.button`
display: flex;
align-items: center;
justify-content: center;
gap:.5rem;
font-weight:500;
background-color: var(--secondary-color);
border:none;
color:#A8AAAE;
cursor: pointer;
padding:0 1rem;
font-size: var(--body);
border-radius:6px;
`

const FilterIcon = styled.i`
line-height:1rem;
font-size:14px;
`

export default function FilterButton(){
    return(
        <Container>
            <FilterIcon style={{}} className="fa-solid fa-filter" /> 
            <p style={{lineHeight:'1rem'}} >filter</p>
        </Container>
    )
}