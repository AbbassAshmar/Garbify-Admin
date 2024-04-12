import SizesInput from "./components/SizesInput/sizes-input";
import ColorsInput from "./components/ColorsInput/colors-input";
import SectionDefault from "../SectionDefault/section-default";

export default function VariantsSection({errors,setFormData, colors, setColors}){
    return (
        <SectionDefault title={"Variants"}>
            <ColorsInput colors={colors} setColors={setColors} errors={errors}/>
            <SizesInput errors={errors} setFormData={setFormData}/>
        </SectionDefault>
    )
}

