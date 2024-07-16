import styled from "styled-components";
import Input, { TextInputField } from "../../../../../../components/Input/input";
import FormDefaultSection from "../../../../../../components/FormDefaultSection/form-default-section";


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

export default function CategoryInformation({errors, formData, setFormData}){
    function handleInputValueChange(e,name){
        setFormData((prev) => ({...prev, [name] : e.target.value}));
    }

    return(
        <FormDefaultSection title="Category Information" style={{padding:"0", boxShadow:"none"}} >
            <Input label={"category_name_input"} title={"Category name"} subtitle={"name stored in the server"} errors={errors?.messages['name']}>
                <TextInputField value={formData.name} onChange={e=>handleInputValueChange(e,'name')} id="category_name_input" type="text" placeholder="ex. shoes"/>
            </Input>
            <Input label={"category_display_name_input"} title={"Category display name"} subtitle={"name displayed for you"} errors={errors?.messages['display_name']}>
                <TextInputField value={formData.display_name} onChange={e=>handleInputValueChange(e,'display_name')} id="category_display_name_input" type="text" placeholder="ex. women's best shoes"/>
            </Input>
            <Input label={"category_description_input"} title={"Category description"} errors={errors?.messages['description']}>
                <TextAreaField  value={formData.description} onChange={e=>handleInputValueChange(e,'description')} id="category_description_input" type="text" placeholder="description"/>
            </Input>
        </FormDefaultSection>
    )
}