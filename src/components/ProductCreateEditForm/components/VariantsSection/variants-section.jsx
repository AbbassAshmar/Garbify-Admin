import SizesInput from "./components/SizesInput/sizes-input";
import ColorsInput from "./components/ColorsInput/colors-input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

export default function VariantsSection({formResetClicked, errors,setFormData, formData}){
    return (
        <FormDefaultSection title={"Variants"}>
            <ColorsInput formResetClicked={formResetClicked} errors={errors} setFormData={setFormData} formData={formData}/>
            <SizesInput formResetClicked={formResetClicked} errors={errors} setFormData={setFormData} formData={formData}/>
        </FormDefaultSection>
    )
}

