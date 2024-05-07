import styled from "styled-components";
import InformationSection from "./components/InformationSection/information-section";
import PricingSection from "./components/PricingSection/pricing-section";
import VariantsSection from "./components/VariantsSection/variants-section";
import ClassificationSection from "./components/ClassificationSection/classification-section";
import MediaSection from "./components/MediaSection/media-section";
import { useEffect, useRef, useState } from "react";
import DefaultPageHeader from "../DefaultPageHeader/default-page-header";
import useUserState from "../../hooks/use-user-state";
import useSendRequest from "../../hooks/use-send-request";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";

const AddProductButton = styled.button`
border:none;
color:white;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);

&:hover{
    background-color:#009BCC;
}
`
const DiscardChangesButton = styled.button`
border:none;
color: #bebebe;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background .3s;
background-color: #f1f1f1;
&:hover{
    background-color: #dddddd;
}
`
const Content = styled.main`
display: flex;
flex-direction: column;
gap:2rem;
`
const InformationPricingContainer = styled.div`
display: flex;
width:100%;
gap:2rem;
`
const VariantsClassificationContainer = styled.div`
display: flex;
width:100%;
gap:2rem;
`

export default function CreateProduct(){
    const discardButtonRef = useRef();
    const [formData, setFormData] = useState();
    const [formResetClicked, setFormResetClicked] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState(["#000000"])

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest();
    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});

    const [InputErorrs, setInputErrors] = useState({
        fields:[] , 
        messages:{} 
    })

    async function createProductRequest(data){
        let url = "/api/products";
        let init ={
            method:"POST",
            body:data,
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + userState.token
            },
        };

        const {request , response} = await sendRequest(url, init);

        if (request?.status == 200){
            discardButtonRef.current.click();
            setInputErrors({fileds:[], messages:{}});
            setResultPopUp({
                show:true,
                status:"Success",
                message:"Product created successfully"
            })
        }

        //validation error
        else if (request?.status == 400){
            setInputErrors({fields:response.metadata.error_fields, messages: response.error.details})
            setResultPopUp({
                show: true,
                status: 'Error',
                message: response.error.message,
            });
        }

        //other errors
        else  {
            setInputErrors({fileds:[], messages:{}});
            setResultPopUp({
                show: true,
                status: 'Error',
                message: response.error.message,
            });
        }

        // if failure or server down, add the removed category back
        if (!request || !request.ok){

        }


    }

    async function handleFormSubmit(e){
        e.preventDefault();
        let formObject = new FormData(e.currentTarget);

        // handle thumbnail data
        formObject.append('thumbnail_data[color]',formData['thumbnail_data'].color);
        formObject.append('thumbnail_data[image]',formData['thumbnail_data'].image.file);

        // handle images data
        for (let i in formData['images_data']){
            formObject.append('images_data['+i+']'+'[color]',formData['images_data'][i].color);
            for (let j in formData['images_data'][i].images){
                formObject.append('images_data['+i+']'+'[images][]',formData['images_data'][i].images[j].file);
            }
        }

        // handle sizes data
        let attributeWithValue = {};
        for (let i in formData['sizes_data']){
            let size_object = formData['sizes_data'][i];
            formObject.append('sizes_data['+i+']'+'[value]', size_object.value);
            formObject.append('sizes_data['+i+']'+'[measurement_unit]', size_object.measurement_unit);

            for (let j in size_object['attributes']){
                let attribute = size_object['attributes'][j];
                if (attribute.value.trim() !== '') {
                    attributeWithValue[j] = true;
                }
            }
        }

        for (let i in formData['sizes_data']){
            let size_object = formData['sizes_data'][i];

            let hasAttributesWithValue = size_object['attributes'].some(attribute => attribute.value.trim() !== '');
            if (!hasAttributesWithValue) continue;

            for (let j in size_object['attributes']){
                if (!attributeWithValue[j]) continue;
                if (attributeWithValue[j]) {
                    let attribute = size_object['attributes'][j];
                    if (attribute.value.trim() === '' && attribute.measurement_unit.trim() === '') continue;

                    formObject.append('sizes_data['+i+']'+'[attributes]['+j+'][value]', attribute.value);
                    formObject.append('sizes_data['+i+']'+'[attributes]['+j+'][measurement_unit]', attribute.measurement_unit);
                }
            }
        }

        setIsLoading(true);
        await createProduct(formObject);
        setIsLoading(false);
    }

    function handleDiscardForm(e){
        setFormResetClicked(true);
    }

    useEffect(()=>{
        if (formResetClicked) setFormResetClicked(false);
    },[formResetClicked])

    const renderHeaderButtons = ()=>(
        <>
            <DiscardChangesButton ref={discardButtonRef} type="reset" onClick={handleDiscardForm}>Discard</DiscardChangesButton>
            <AddProductButton disabled={isLoading} type="submit">Add product</AddProductButton>
        </>
    )

    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp}/>
            <form onSubmit={handleFormSubmit}>
                <DefaultPageHeader title={"New Product"} renderButtons={renderHeaderButtons}>
                        <Content>
                            <InformationPricingContainer>
                                <InformationSection errors={InputErorrs} />
                                <PricingSection errors={InputErorrs} formResetClicked={formResetClicked}/>
                            </InformationPricingContainer>
                            <VariantsClassificationContainer>
                                <VariantsSection errors={InputErorrs} formResetClicked={formResetClicked} setFormData={setFormData} colors={colors} setColors={setColors} />
                                <ClassificationSection errors={InputErorrs} formResetClicked={formResetClicked}/>
                            </VariantsClassificationContainer>
                            <MediaSection errors={InputErorrs} formResetClicked={formResetClicked} setFormData={setFormData} colors={colors}/>
                        </Content>
                </DefaultPageHeader>    
            </form>
        </>
    )
}