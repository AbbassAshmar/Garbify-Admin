import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSendRequest from "../../hooks/use-send-request";
import useUserState from "../../hooks/use-user-state";
import ResourceEditWrapper from "../../components/ResourceEditWrapper/resource-edit-wrapper";
import ResourceError from "../../components/ResourceError/resource-error";
import DefaultPageHeader from "../../components/DefaultPageHeader/default-page-header";
import processCategoryData from "../../helpers/process-category-data";
import CategoryCreateEditForm from "../../components/CategoryCreateEditForm/category-create-edit-form";

const initialFormData = {
    name : "",
    display_name: "",
    description: "",
    parent_id : "",
    image : {url : "" , file : ""}
}

export default function EditCategry(){
    const {id} = useParams();

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [formData, setFormData] = useState(initialFormData);
    const [originalCategory, setOriginalCategory] = useState(initialFormData);
    const [formResetClicked, setFormResetClicked] = useState(false);

    const [showErrorPage, setShowErrorPage] = useState("");
    const [inputErrors,setInputErrors] = useState({fields : [] , messages : {}});

    useEffect(() => {
        if (formResetClicked) 
        setFormData({ ...initialFormData});
    }, [formResetClicked]);

    useEffect(()=>{
        if (id) fetchUserForEdit();
    }, [id])

    async function fetchUserForEdit(){
        const URL = `/api/categories/${id}`;
        const {request,response} = await sendRequest(URL);
        handleResponse(request, response);
    }

    function handleResponse(request, response){
        if (!request){
            setShowErrorPage("Servers are down at the moment. Try again later.");
            return;
        }

        if (request.status == 200){
            let category = response.data.category;
            let data = transformCategoryToFormData(category);
            setFormData(prev => ({...prev, ...data}));
            setOriginalCategory(prev => ({...prev, ...data}));
            setShowErrorPage("");
        }

        else if (request.status == 404){
            setShowErrorPage(`The Category you are looking for does not exist !`);
        }

        else {
            setShowErrorPage(`An Unexpected Error happened...Try again later.`);
        }
    }

    function transformCategoryToFormData(category){
        let data = {
            name : category?.name || '',
            description : category?.description || '',
            display_name : category?.display_name || '',
            image : {file : "", url : category?.image_url || ''},
            parent_id :  category?.parent_id == null ? -1 : (category?.parent_id || ''),
        };

        return data;
    }

    function handleData(formEvent) {
        return processCategoryData(formEvent,formData, true, originalCategory);
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
        endpointURL={`/api/categories/${id}`} 
        resource={"category"} 
        handleData={handleData}>
            <CategoryCreateEditForm 
            isEditing={true}
            inputErrors={inputErrors} 
            formData={formData} 
            setFormData={setFormData}/>
        </ResourceEditWrapper>    
    )
}