import { useEffect, useState } from "react";
import processProductData from "../../helpers/process-product-data";
import ResourceCreationWrapper from "../../components/ResourceCreationWrapper/resource-creation-wrapper";
import ProductCreateEditForm from "../../components/ProductCreateEditForm/product-create-edit-form";

const initialFormData = {
    name: '',
    description: '',
    quantity: '',
    status: 'in stock',
    original_price: '',
    selling_price: '',
    sale: 0,
    sale_quantity: '',
    sale_start_date: '',
    sale_end_date: '',
    discount_percentage: '',
    colors: ['#000000'],
    type: '',
    tags: ['shoes', 'sport'],
    category_id: '',
    sizes_data: [],
    sizes_unit: '',
    sizes: [],
    thumbnail_data: { color: '#000000', image: { file: '', url: '' } },
    images_data: []
};

export default function CreateProduct(){
    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (formResetClicked) 
        setFormData({ ...initialFormData });
    }, [formResetClicked]);
    
    function handleData(formEvent) {
        processProductData(formEvent,formData,false);
    }

    return(
        <ResourceCreationWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/products"} 
        resource={"product"} 
        handleData={handleData}>
            <ProductCreateEditForm 
            editMode={false} 
            formData={formData} 
            inputErrors={inputErrors} 
            formResetClicked={formResetClicked} 
            setFormData={setFormData}/>
        </ResourceCreationWrapper>    
    )
}