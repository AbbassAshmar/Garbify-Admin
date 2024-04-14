import SizesInput from "./components/SizesInput/sizes-input";
import ColorsInput from "./components/ColorsInput/colors-input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

export default function VariantsSection({formResetClicked, errors,setFormData, colors, setColors}){
    return (
        <FormDefaultSection title={"Variants"}>
            <ColorsInput formResetClicked={formResetClicked} colors={colors} setColors={setColors} errors={errors}/>
            <SizesInput formResetClicked={formResetClicked} errors={errors} setFormData={setFormData}/>
        </FormDefaultSection>
    )
}

