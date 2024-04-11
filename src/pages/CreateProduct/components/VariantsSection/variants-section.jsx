import SizesInput from "./components/SizesInput/sizes-input";
import ColorsInput from "./components/ColorsInput/colors-input";
import SectionDefault from "../SectionDefault/section-default";

export default function VariantsSection({errors,formData, colors, setColors}){
    return (
        <SectionDefault title={"Variants"}>
            <ColorsInput colors={colors} setColors={setColors} errors={errors} formData={formData} />
            <SizesInput errors={errors} formData={formData} />
        </SectionDefault>
    )
}

