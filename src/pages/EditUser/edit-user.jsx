import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSendRequest from "../../hooks/use-send-request";
import useUserState from "../../hooks/use-user-state";
import ResourceEditWrapper from "../../components/ResourceEditWrapper/resource-edit-wrapper";
import ResourceError from "../../components/ResourceError/resource-error";
import DefaultPageHeader from "../../components/DefaultPageHeader/default-page-header";
import processUserData from "../../helpers/process-user-data";
import UserCreateEditForm from "../../components/UserCreateEditForm/user-create-edit-form";

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

    const [showErrorPage, setShowErrorPage] = useState("");

    useEffect(() => {
        if (formResetClicked) 
        setFormData({ ...initialFormData});
    }, [formResetClicked]);

    useEffect(()=>{
        if (id) fetchUserForEdit();
    }, [id])

    async function fetchUserForEdit(){
        const URL = `/api/users/${id}`;
        const {request,response} = await sendRequest(URL);
        handleResponse(request, response);
    }

    function handleResponse(request, response){
        if (!request){
            setShowErrorPage("Servers are down at the moment. Try again later.");
            return;
        }

        if (request.status == 200){
            let user = response.data.user;
            let data = transferUserToFormData(user);
            setFormData(prev => ({...prev, ...data}));
            setShowErrorPage("");
        }

        else if (request.status == 403){
            setShowErrorPage(`You are not allowed to edit this user's information !`);
        }

        else if (request.status == 404){
            setShowErrorPage(`The User you are looking for does not exist !`);
        }

        else {
            setShowErrorPage(`An Unexpected Error happened...Try again later.`);
        }
    }

    function transferUserToFormData(user){
        let data = {
            name : user.name || '',
            email : user.email || '',
            profile_picture : {file : "", url : user.profile_picture.images_url || ''},
            password :  user.password || '',
            confirm_password :  user.confirm_password || '',
        };

        return data;
    }

    function handleData(formEvent) {
        return processUserData(formEvent,formData,true);
    }

    if (showErrorPage != ""){
        return (
            <DefaultPageHeader title={"Edit User"}>
                <ResourceError message={showErrorPage} />
            </DefaultPageHeader>
        )

    }

    return(
        <ResourceEditWrapper 
        setInputErrors={setInputErrors}
        setFormResetClicked={setFormResetClicked} 
        formResetClicked={formResetClicked} 
        endpointURL={`/api/users/${id}`} 
        resource={"user"} 
        handleData={handleData}>
            <UserCreateEditForm 
            editMode={true} 
            formData={formData} 
            inputErrors={inputErrors} 
            formResetClicked={formResetClicked} 
            setFormData={setFormData}/>
        </ResourceEditWrapper>    
    )
}