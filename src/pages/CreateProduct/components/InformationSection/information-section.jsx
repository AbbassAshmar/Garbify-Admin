import Input from "../Input/input";
import styled from "styled-components";
import { TextInputField } from "../Input/input";
import SectionDefault from "../SectionDefault/section-default";

const TextAreaField = styled.textarea`
resize: none;
width:100%;
min-height: 200px;
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
const SelectField = styled.select`
width:100%;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid var(--secondary-color);
border-radius:3px;
outline: none;
cursor:pointer;
transition: border .3s;
&:focus {
    border:2px solid var(--main-color);
}
`

export default function InformationSection({errors,formData}){
    return (
        <SectionDefault title={'Product Information'}>
            <Input label={"name"} title={"Product name"} errors={errors?.messages['name']}>
                <TextInputField name="name" id="name" type="text" placeholder="name"/>
            </Input>
            <Input label={"description"} title={"Description"} errors={errors?.messages['description']}>
                <TextAreaField name="description" id="description" placeholder="describe your product"/>
            </Input>
            <Input label={"quantity"} title={"Quantity"} errors={errors?.messages['quantity']}>
                <TextInputField name="quantity" id="quantity" type="number" min="0" placeholder="0"/>
            </Input>
            <Input label={"status"} title={"Status"} errors={errors?.messages['status']}>
                <SelectField name="status" id="status">
                    <option value="in stock">in stock</option>
                    <option value="out of stock">out of stock</option>
                </SelectField>
            </Input>
        </SectionDefault>
    )
}