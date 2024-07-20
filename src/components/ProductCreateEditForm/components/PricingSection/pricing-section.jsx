import {useEffect, useState} from "react";
import Input from "../../../../components/Input/input";
import styled from "styled-components";
import { TextInputField } from "../../../../components/Input/input";
import SectionDefault from "../../../../components/FormDefaultSection/form-default-section";
import { SelectField } from "../InformationSection/information-section";

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

export default function PricingSection({editMode, formData, setFormData, errors}){
    function handleInputValueChange(e,name){
        setFormData((prev) => ({...prev, [name] : e.target.value}));
    }

    const renderColoredLabel = (label,blueText) => (
        <ColoredLabel $enabled={formData?.sale == 1}>
            {label} {blueText && <BlueSpan $enabled={formData?.sale == 1}>{blueText}</BlueSpan>}
        </ColoredLabel>
    )

    return (
        <SectionDefault title={"Pricing"}>
            <PriceInputsContainer>
                <Input label={"original_price"} title={<>Original Price <BlueSpan $enabled={true}>$</BlueSpan></>} errors={errors?.messages['original_price']}>
                    <TextInputField value={formData.original_price} onChange={e=>handleInputValueChange(e,'original_price')} $error={errors?.messages['original_price']} id="original_price" type="number" min="0" placeholder="0"/>
                </Input>
                <Input label={"selling_price"} title={<>Selling Price <BlueSpan $enabled={true}>$</BlueSpan></>} errors={errors?.messages['selling_price']}>
                    <TextInputField value={formData.selling_price} onChange={e=>handleInputValueChange(e,'selling_price')} $error={errors?.messages['selling_price']} id="selling_price" type="number" min="0" placeholder="0"/>
                </Input>
            </PriceInputsContainer>
            {!editMode &&(
                <>
                <SaleHeader>
                    <SaleTitle $enabled={formData?.sale == 1}>Sale</SaleTitle>
                    <Toggle setFormData={setFormData} formData={formData}/>
                </SaleHeader>

                <Input label={"sale_quantity"} title={renderColoredLabel('Sale quantity','(optional)')} errors={errors?.messages['sale_quantity']}>
                    <TextInputField value={formData.sale_quantity} onChange={e=>handleInputValueChange(e,'sale_quantity')} $error={errors?.messages['sale_quantity']} disabled={formData['sale'] == 0} id="sale_quantity" type="number" min="0" placeholder="0"/>
                </Input>

                <Input label={"sale_start_date"} title={renderColoredLabel('Sale start date')} errors={errors?.messages['sale_start_date']}>
                    <TextInputField value={formData.sale_start_date} onChange={e=>handleInputValueChange(e,'sale_start_date')} $error={errors?.messages['sale_start_date']} disabled={formData['sale'] == 0} style={{color:"grey"}} id="sale_start_date" type="datetime-local" min="0" />
                </Input>

                <Input label={"sale_end_date"} title={renderColoredLabel('Sale end date','(optional)')} errors={errors?.messages['sale_end_date']}>
                    <TextInputField value={formData.sale_end_date} onChange={e=>handleInputValueChange(e,'sale_end_date')} $error={errors?.messages['sale_end_date']} disabled={formData['sale'] == 0} style={{color:"grey"}} id="sale_end_date" type="datetime-local" min="0"/>
                </Input>

                <Input label={"discount_percentage"} title={renderColoredLabel('Discount percentage','%')} errors={errors?.messages['discount_percentage']}>
                    <TextInputField value={formData.discount_percentage} onChange={e=>handleInputValueChange(e,'discount_percentage')} $error={errors?.messages['discount_percentage']} disabled={formData['sale'] == 0} id="discount_percentage" type="number" min="0" placeholder="0"/>
                </Input>
                </>
            )}
            {editMode && (
                <>
                    <SaleHeader>
                        <SaleTitle style={{color:"black"}}>Current & Active Sale</SaleTitle>
                    </SaleHeader>
                    {formData.sale == 0 ? 
                        <p>This product has no current and active sale</p>:
                        <>
                            <Input label={"sale_status"} title={"Sale status"} errors={errors?.messages['sale_status']}>
                                <SelectField value={formData.sale_status} onChange={e=>handleInputValueChange(e,'sale_status')} id="sale_status">
                                    <option value="active">active</option>
                                    <option value="inactive">inactive</option>
                                </SelectField>
                            </Input>
                            <Input label={"sale_quantity"} title={"Sale quantity"} errors={errors?.messages['sale_quantity']}>
                                <TextInputField value={formData.sale_quantity} onChange={e=>handleInputValueChange(e,'sale_quantity')} $error={errors?.messages['sale_quantity']} disabled={formData['sale'] == 0} id="sale_quantity" type="number" min="0" placeholder="0"/>
                            </Input>
                            <Input label={"sale_start_date"} title={"Sale start date"} errors={errors?.messages['sale_start_date']}>
                                <TextInputField value={formData.sale_start_date} onChange={e=>handleInputValueChange(e,'sale_start_date')} $error={errors?.messages['sale_start_date']} disabled={formData['sale'] == 0} style={{color:"grey"}} id="sale_start_date" type="datetime-local" min="0" />
                            </Input>
                            <Input label={"sale_end_date"} title={"Sale end date (optional)"} errors={errors?.messages['sale_end_date']}>
                                <TextInputField value={formData.sale_end_date} onChange={e=>handleInputValueChange(e,'sale_end_date')} $error={errors?.messages['sale_end_date']} disabled={formData['sale'] == 0} style={{color:"grey"}} id="sale_end_date" type="datetime-local" min="0"/>
                            </Input>
                            <Input label={"discount_percentage"} title={"Discount percentage"} errors={errors?.messages['discount_percentage']}>
                                <TextInputField value={formData.discount_percentage} onChange={e=>handleInputValueChange(e,'discount_percentage')} $error={errors?.messages['discount_percentage']} disabled={formData['sale'] == 0} id="discount_percentage" type="number" min="0" placeholder="0"/>
                            </Input>
                        </>
                    }
                </>
            )}
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

function Toggle ({formData,setFormData}){
    const handleClick = () => {
        setFormData((prev)=> ({...prev, sale: (prev.sale== 1 ? 0 : 1)}));
    };

    return (
        <ToggleContainer $isActive={formData['sale'] == 1} onClick={handleClick}>
            <Circle $isActive={formData['sale'] == 1} />
        </ToggleContainer>
    );
};
