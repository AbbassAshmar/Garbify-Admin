import Input from "../../../../components/Input/input";
import styled from "styled-components";
import { TextInputField } from "../../../../components/Input/input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";
import useGetProductStatuses from "../../../../hooks/use-get-product-statuses";

const TextAreaField = styled.textarea`
resize: none;
width:100%;
min-height: 200px;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid ${({$error}) => $error ? "red" : "var(--secondary-color)"};
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
export const SelectField = styled.select`
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

export default function InformationSection({errors,formData, setFormData}){
    const [statuses] = useGetProductStatuses();

    function handleInputValueChange(e,name){
        setFormData((prev) => ({...prev, [name] : e.target.value}));
    }

    return (
        <FormDefaultSection title={'Product Information'}>
            <Input label={"category_name_input"} title={"Product name"} errors={errors?.messages['name']}>
                <TextInputField value={formData.name} onChange={e=>handleInputValueChange(e,'name')} $error={errors?.messages['name']} id="category_name_input" type="text" placeholder="name"/>
            </Input>
            <Input label={"product_description_input"} title={"Description"} errors={errors?.messages['description']}>
                <TextAreaField value={formData.description} onChange={e=>handleInputValueChange(e,'description')} $error={errors?.messages['description']} id="product_description_input" placeholder="describe your product"/>
            </Input>
            <Input label={"product_quantity_input"} title={"Quantity"} errors={errors?.messages['quantity']}>
                <TextInputField value={formData.quantity} onChange={e=>handleInputValueChange(e,'quantity')} $error={errors?.messages['quantity']} id="product_quantity_input" type="number" min="0" placeholder="0"/>
            </Input>
            <Input label={"product_status_input"} title={"Status"} errors={errors?.messages['status']}>
                <SelectField value={formData.status} onChange={e=>handleInputValueChange(e,'status')} id="product_status_input">
                    {statuses.length > 0 && statuses.map((status)=>(
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    ))}
                </SelectField>
            </Input>
        </FormDefaultSection>
    )
}