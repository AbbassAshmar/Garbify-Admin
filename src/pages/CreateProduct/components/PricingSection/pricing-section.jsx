import {useState} from "react";
import Input from "../Input/input";
import styled from "styled-components";
import { TextInputField } from "../Input/input";
import SectionDefault from "../SectionDefault/section-default";

const PriceInputsContainer = styled.div`
gap:2rem;
display: flex;
align-items: center;
justify-content: space-between;
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
color:${({$enabled})=>$enabled?"var(--main-color)":"grey"};
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
        <SectionDefault title={"Pricing"}>
            <PriceInputsContainer>
                <Input label={"original_price"} title={<>Original Price <BlueSpan $enabled={true}>$</BlueSpan></>} errors={errors?.messages['original_price']}>
                    <TextInputField name="original_price" id="original_price" type="number" min="0" placeholder="0"/>
                </Input>
                <Input label={"selling_price"} title={<>Selling Price <BlueSpan $enabled={true}>$</BlueSpan></>} errors={errors?.messages['selling_price']}>
                    <TextInputField name="selling_price" id="selling_price" type="number" min="0" placeholder="0"/>
                </Input>
            </PriceInputsContainer>

            <SaleHeader>
                <SaleTitle $enabled={isSaleEnabled}>Sale</SaleTitle>
                <Toggle setState={setIsSaleEnabled} state={isSaleEnabled}/>
            </SaleHeader>

            <Input label={"sale_quantity"} title={renderColoredLabel('Sale quantity','(optional)')} errors={errors?.messages['sale_quantity']}>
                <TextInputField disabled={!isSaleEnabled} name="sale_quantity" id="sale_quantity" type="number" min="0" placeholder="0"/>
            </Input>

            <Input label={"sale_start_date"} title={renderColoredLabel('Sale start date')} errors={errors?.messages['sale_start_date']}>
                <TextInputField disabled={!isSaleEnabled} style={{color:"grey"}} name="sale_start_date" id="sale_start_date" type="date" min="0" />
            </Input>

            <Input label={"sale_end_date"} title={renderColoredLabel('Sale end date','(optional)')} errors={errors?.messages['sale_end_date']}>
                <TextInputField disabled={!isSaleEnabled} style={{color:"grey"}} name="sale_end_date" id="sale_end_date" type="date" min="0"/>
            </Input>

            <Input label={"discount_percentage"} title={renderColoredLabel('Discount percentage','%')} errors={errors?.messages['discount_percentage']}>
                <TextInputField disabled={!isSaleEnabled} name="discount_percentage" id="discount_percentage" type="number" min="0" placeholder="0"/>
            </Input>

            <input type="hidden" name='sale' value='true' disabled={!isSaleEnabled} style={{width:".2px", position:"absolute"}} />
        </SectionDefault>
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
