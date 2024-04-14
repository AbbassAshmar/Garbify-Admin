import Input from "../../../../components/Input/input";
import styled from "styled-components";
import { TextInputField } from "../../../../components/Input/input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

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
        <FormDefaultSection title={'Product Information'}>
            <Input label={"category_name_input"} title={"Product name"} errors={errors?.messages['name']}>
                <TextInputField name="name" id="category_name_input" type="text" placeholder="name"/>
            </Input>
            <Input label={"product_description_input"} title={"Description"} errors={errors?.messages['description']}>
                <TextAreaField name="description" id="product_description_input" placeholder="describe your product"/>
            </Input>
            <Input label={"product_quantity_input"} title={"Quantity"} errors={errors?.messages['quantity']}>
                <TextInputField name="quantity" id="product_quantity_input" type="number" min="0" placeholder="0"/>
            </Input>
            <Input label={"product_status_input"} title={"Status"} errors={errors?.messages['status']}>
                <SelectField name="status" id="product_status_input">
                    <option value="in stock">in stock</option>
                    <option value="out of stock">out of stock</option>
                </SelectField>
            </Input>
        </FormDefaultSection>
    )
}