import { useState } from "react";
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

const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Content = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`
const PriceInputsContainer = styled.div`
gap:2rem;
display: flex;
align-items: center;
justify-content: space-between;
`
const InputContainer = styled.div`
display: flex;
flex-direction:column;
gap:.5rem;
`
const InputTitle = styled.label`
font-size:var(--body);
font-weight:600;
`
const InputField = styled.input`
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

const SaleHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const SaleTitle = styled.h6`
font-size:var(--heading-6);
font-weight:600;
`
const SaleToggle = styled.div`
    
`
export default function PricingSection({error,formData}){
    return (
        <Container>
            <Title>Pricing</Title>
            <Content>
                <PriceInputsContainer>
                    <InputContainer>
                        <InputTitle for="original_price">Original Price <span style={{color:"var(--main-color)"}}>$</span></InputTitle>
                        <InputField name="original_price" id="original_price" type="number" min="0" placeholder="0"/>
                        {error?.messages['name'] && <ErrorMessage>{error?.messages['name']}</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <InputTitle for="selling_price">Selling Price <span style={{color:"var(--main-color)"}}>$</span></InputTitle>
                        <InputField name="selling_price" id="selling_price" type="number" min="0" placeholder="0"/>
                        {error?.messages['name'] && <ErrorMessage>{error?.messages['name']}</ErrorMessage>}
                    </InputContainer>
                </PriceInputsContainer>
                <SaleHeader>
                    <SaleTitle>Sale</SaleTitle>
                    <Toggle />
                </SaleHeader>
                <InputContainer>
                    <InputTitle for="sale_quantity">Sale quantity <span style={{color:"var(--main-color)"}}>(optional)</span></InputTitle>
                    <InputField name="sale_quantity" id="sale_quantity" type="number" min="0" placeholder="0"/>
                    {error?.messages['sale_quantity'] && <ErrorMessage>{error?.messages['sale_quantity']}</ErrorMessage>}
                </InputContainer>
                <InputContainer>
                    <InputTitle for="sale_start_date">Sale start date</InputTitle>
                    <InputField style={{color:"grey"}} name="sale_start_date" id="sale_start_date" type="date" min="0" />
                    {error?.messages['sale_start_date'] && <ErrorMessage>{error?.messages['sale_start_date']}</ErrorMessage>}
                </InputContainer>
                <InputContainer>
                    <InputTitle for="sale_end_date">Sale end date <span style={{color:"var(--main-color)"}}>(optional)</span></InputTitle>
                    <InputField style={{color:"grey"}} name="sale_end_date" id="sale_end_date" type="date" min="0"/>
                    {error?.messages['name'] && <ErrorMessage>{error?.messages['name']}</ErrorMessage>}
                </InputContainer>
                <InputContainer>
                    <InputTitle for="discount_percentage">Discount percentage <span style={{color:"var(--main-color)"}}>%</span></InputTitle>
                    <InputField name="discount_percentage" id="discount_percentage" type="number" min="0" placeholder="0"/>
                    {error?.messages['name'] && <ErrorMessage>{error?.messages['name']}</ErrorMessage>}
                </InputContainer>
            </Content>
        </Container>
    )
}


const ToggleContainer = styled.div`
display: inline-block;
height: 20px;
width: 40px;
border-radius: 12px;
position: relative;
cursor: pointer;
background-color: ${({ isActive }) => (isActive ? 'var(--main-color)' : '#C0C3C7')};

`;

const Circle = styled.div`
height: 14px;
width: 14px;
background-color: ${({ isActive }) => (isActive ? 'white' : 'var(--secondary-color)')};
border-radius: 50%;
position: absolute;
top: 3px;
left: ${({ isActive }) => (isActive ? '23px' : '3px')};
transition: left 0.3s, background-color 0.3s;
`;

function Toggle () {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <ToggleContainer isActive={isActive} onClick={handleClick}>
            <Circle isActive={isActive} />
        </ToggleContainer>
    );
};
