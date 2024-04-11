import { useEffect, useState } from "react";
import Input from "../Input/input";
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
font-weight:600;
transition:color .3s;
font-size:var(--heading-6);
color:${({$enabled})=>$enabled?"var(--main-color)":"black"};
`

const ColoredLabel = styled.span`
transition:color .3s;
color: ${({$enabled}) => $enabled?"black":"grey"};
`
const BlueSpan = styled.span`
transition:color .3s;
color:${({$enabled})=>$enabled?"var(--main-color)":"grey"};
`

export default function PricingSection({errors,formData}){
    const [isSaleEnabled, setIsSaleEnabled] = useState(false)


    function renderColoredLabel(label,blueText){
        return (
            <ColoredLabel $enabled={isSaleEnabled}>
                {label} {blueText && <BlueSpan $enabled={isSaleEnabled}>{blueText}</BlueSpan>}
            </ColoredLabel>
        )
    }

    return (
        <Container>
            <Title>Pricing</Title>
            <Content>

                <PriceInputsContainer>
                    <Input label={"original_price"} title={<>Original Price <BlueSpan $enabled={true}>$</BlueSpan></>} errors={errors?.messages['original_price']}>
                        <InputField name="original_price" id="original_price" type="number" min="0" placeholder="0"/>
                    </Input>
                    <Input label={"selling_price"} title={<>Selling Price <BlueSpan $enabled={true}>$</BlueSpan></>} errors={errors?.messages['selling_price']}>
                        <InputField name="selling_price" id="selling_price" type="number" min="0" placeholder="0"/>
                    </Input>
                </PriceInputsContainer>

                <SaleHeader>
                    <SaleTitle $enabled={isSaleEnabled}>Sale</SaleTitle>
                    <Toggle setState={setIsSaleEnabled} state={isSaleEnabled}/>
                </SaleHeader>

                <Input label={"sale_quantity"} title={renderColoredLabel('Sale quantity','(optional)')} errors={errors?.messages['sale_quantity']}>
                    <InputField disabled={!isSaleEnabled} name="sale_quantity" id="sale_quantity" type="number" min="0" placeholder="0"/>
                </Input>

                <Input label={"sale_start_date"} title={renderColoredLabel('Sale start date')} errors={errors?.messages['sale_start_date']}>
                    <InputField disabled={!isSaleEnabled} style={{color:"grey"}} name="sale_start_date" id="sale_start_date" type="date" min="0" />
                </Input>

                <Input label={"sale_end_date"} title={renderColoredLabel('Sale end date','(optional)')} errors={errors?.messages['sale_end_date']}>
                    <InputField disabled={!isSaleEnabled} style={{color:"grey"}} name="sale_end_date" id="sale_end_date" type="date" min="0"/>
                </Input>

                <Input label={"discount_percentage"} title={renderColoredLabel('Discount percentage','%')} errors={errors?.messages['discount_percentage']}>
                    <InputField disabled={!isSaleEnabled} name="discount_percentage" id="discount_percentage" type="number" min="0" placeholder="0"/>
                </Input>
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
background-color: ${({ $isActive }) => ($isActive ? 'var(--main-color)' : '#C0C3C7')};

`;

const Circle = styled.div`
height: 14px;
width: 14px;
background-color: ${({ $isActive }) => ($isActive ? 'white' : 'var(--secondary-color)')};
border-radius: 50%;
position: absolute;
top: 3px;
left: ${({ $isActive }) => ($isActive ? '23px' : '3px')};
transition: left 0.3s, background-color 0.3s;
`;

function Toggle ({state,setState}){

    const handleClick = () => {
        setState(!state);
    };

    return (
        <ToggleContainer $isActive={state} onClick={handleClick}>
            <Circle $isActive={state} />
        </ToggleContainer>
    );
};
