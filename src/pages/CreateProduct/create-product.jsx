import { useEffect, useState } from "react";
import styled from "styled-components";
import InformationSection from "./components/InformationSection/information-section";
import PricingSection from "./components/PricingSection/pricing-section";
import VariantsSection from "./components/VariantsSection/variants-section";
import ClassificationSection from "./components/ClassificationSection/classification-section";
import MediaSection from "./components/MediaSection/media-section";
import ResourceCreationWrapper from "../components/ResourceCreationWrapper/resource-creation-wrapper";
import { useParams } from "react-router-dom";
import useSendRequest from "../../hooks/use-send-request";
import useUserState from "../../hooks/use-user-state";

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
    const {id} = useParams();

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});

    const [formData, setFormData] = useState({
        name : '',
        description : '',
        quantity  : '',
        status : 'in stock',
        original_price : '',
        selling_price : '',
        sale : 0,
        sale_quantity : '',
        sale_start_date : '',
        sale_end_date : '',
        discount_percentage :'',
        colors : ['#000000'],
        type : '',
        tags : ['shoes','sport'],
        category_id : '',
        sizes_data : [],
        sizes_measurement_unit : '',
        sizes : [],
        thumbnail_data : {color : '#000000', image:{file:'',url:''}},
        images_data : []
    });

    
    async function fetchProductForEdit(){
        const URL = `${process.env}/api/products/${id}`;
        const {request,response} = await sendRequest(URL);

        if (request?.status == 200){
            let product = response.data.product;
            let data = {
                name : product.name,
                type : product.type,
                description : product.description,
                quantity  : product.quantity,
                status : product.status,
                original_price : product.original_price,
                selling_price : product.selling_price,
                category_id : product.category.id,
                images_data : [],
            };
            if (product.sale){
                let sale = {
                    sale : 1,
                    sale_quantity : product.sale.quantity,
                    sale_start_date : product.sale.starts_at,
                    sale_end_date : product.sale.ends_at,
                    discount_percentage : product.sale.sale_percentage
                }
                data = {...data , sale};
            }     

            data.colors = product.colors.map(color => color.name);
            data.sizes = product.sizes.map(size => size.size);
            data.sizes_data = product.sizes;

            data.measurement_unit = product.sizes[0].unit;
            data.thumbnail_data ={
                color : product.thumbnail.color.color, 
                image : {file :'',url : product.thumbnail.image_url}
            }

            for (const color in product.images){
                data.images_data.push({
                    id : Date.now() , 
                    color : color, 
                    images : product.images.map(image => ({
                        file : "", url : image.image_url
                    }))
                })
            }

        }
    }

    function handleData(formEvent){
        let formObject = new FormData(formEvent.currentTarget);

        // handle thumbnail data
        formObject.append('thumbnail_data[color]',formData['thumbnail_data'].color);
        formObject.append('thumbnail_data[image]',formData['thumbnail_data'].image.file);

        // handle images data
        for (let i in formData['images_data']){
            if (formData['images_data'][i].images.length == 0) continue;
            
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
        
        console.log(formObject)
        for (let obj of formObject.entries()){
            console.log(obj)
        }
        return formObject;
    }

    useEffect(()=>{
        if (formResetClicked){
            setFormData({
                name : '',
                description : '',
                quantity  : '',
                status : 'in stock',
                original_price : '',
                selling_price : '',
                sale : 0,
                sale_quantity : '',
                sale_start_date : '',
                sale_end_date : '',
                discount_percentage :'',
                colors : ['#000000'],
                type : '',
                tags : ['shoes','sport'],
                category_id : '',
                sizes_data : [],
                sizes_measurement_unit : '',
                sizes : [],
                thumbnail_data : {color : '#000000' , image:{file:'',url:''}},
                images_data : []
            })
        }
    },[formResetClicked])

    return(
        <ResourceCreationWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/products"} 
        resource={"product"} 
        handleData={handleData}>
            <Content>
                <InformationPricingContainer>
                    <InformationSection errors={inputErrors} formData={formData} setFormData={setFormData}/>
                    <PricingSection errors={inputErrors} formData={formData} setFormData={setFormData}/>
                </InformationPricingContainer>
                <VariantsClassificationContainer>
                    <VariantsSection errors={inputErrors} formResetClicked={formResetClicked} formData={formData} setFormData={setFormData}/>
                    <ClassificationSection errors={inputErrors} formResetClicked={formResetClicked} formData={formData} setFormData={setFormData}/>
                </VariantsClassificationContainer>
                <MediaSection errors={inputErrors} formResetClicked={formResetClicked} formData={formData} setFormData={setFormData}/>
            </Content>
        </ResourceCreationWrapper>    
    )
}