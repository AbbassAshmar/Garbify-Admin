import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSendRequest from "../../hooks/use-send-request";
import useUserState from "../../hooks/use-user-state";
import ProductCreateEditForm from "../../components/ProductCreateEditForm/product-create-edit-form";
import ResourceEditWrapper from "../../components/ResourceEditWrapper/resource-edit-wrapper";


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

export default function EditProduct(){
    const {id} = useParams();

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [formResetClicked, setFormResetClicked] = useState(false);
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (formResetClicked) 
        setFormData({ ...initialFormData });
    }, [formResetClicked]);

    useEffect(()=>{
        if (id) fetchProductForEdit();
    }, [id])
    
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
                colors : product.colors.map(color => color.name),
                tags : product.tags.map(tag => tag.name),
                sizes : product.sizes.map(size => size.size),
                sizes_data : product.sizes,
                sizes_unit : product.sizes[0].unit,
                thumbnail_data : {
                    color : product.thumbnail.color.color, 
                    image : {file :'',url : product.thumbnail.image_url}
                }
            };
            
            for (const color in product.images){
                data.images_data.push({
                    id : Date.now() , 
                    color : color, 
                    images : product.images.map(image => ({
                        file : "", url : image.image_url
                    }))
                })
            }

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

            setFormData(data);
        }
    }

    return(
        <ResourceEditWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={"/api/products"} 
        resource={"product"} 
        handleData={handleData}>
            <ProductCreateEditForm 
            editMode={true} 
            formData={formData} 
            inputErrors={inputErrors} 
            formResetClicked={formResetClicked} 
            setFormData={setFormData}/>
        </ResourceEditWrapper>    
    )
}