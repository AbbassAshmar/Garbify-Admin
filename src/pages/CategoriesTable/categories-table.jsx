import styled from "styled-components";
import { useEffect, useState } from "react";
import CategoryCardHorizontal from "./components/CategoryCardHorizontal/category-card-horizontal";
import { FlatCategories } from "../../dummy_data";
import {Link} from "react-router-dom";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import useUserState from "../../hooks/use-user-state";
import useSendRequest from "../../hooks/use-send-request";
import ResourceTableClientSide from "../components/ResourceTableClientSide/resource-table-client-side";
import useDeleteResource from "../../hooks/use-delete-resource";
import useGetCategories from "../../hooks/use-get-categories";

////// table ---------------------------

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
width:100%;
`;

const TableCell = styled.td`
text-align: left;
padding:1.5rem .5rem;
font-weight:500;
color:#5D5F60;
`
const SubcategoriesCell = styled.div`
padding-right:1rem;
`
const Subcategory = styled.div`
display: inline-block;
margin:1rem 1rem 0 0;
padding:.25rem .5rem;
background-color: var(--secondary-color);
font-weight:400;
color:var(--secondary-text);
border-radius: 4px;
font-size: var(--small-1);
`
const AllButton = styled.button`
display:inline;
cursor:pointer;
background-color:white;
border:none;
color:var(--main-color);
font-size:var(--small-1);
font-weight:500;
`
const DeleteButton = styled.button`
border:none;
margin-right:10px;
background-color: white;
font-size:var(--body);
cursor: pointer;
`
const EditButton = styled(Link)`
border:none;
background-color: white;
font-size:var(--body);
color:black;
cursor: pointer;
`

const TABLE_HEADERS = ["Category","Sub categories","Total sales","Total products","Actions"];
const COLUMNS_WIDTHS = ["35%","27%", "19%", "19%", "70px"];

export default function CategoriesTable(){
    const [children, setChildren] = useState({});
    const [categories,setCategories] = useGetCategories("flat");

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
    const {handleDeleteResource} = useDeleteResource(sendRequest,setCategories,categories,"/api/categories");

    useEffect(()=>{
        let childrenObj= {};
        for (let category of categories) {
            childrenObj[category.id] = category.children.slice(0, 3);
        }
        setChildren(childrenObj);
    },[categories])

    function compareChildren(a,b){
        return (a.children.length < b.children.length) ? -1 : (a.children.length > b.children.length) ? 1 : 0;
    }
    
    function compareName(a,b){
        return (a.display_name[0] < b.display_name[0]) ? -1 : (a.display_name[0] > b.display_name[0]) ? 1 : 0;
    }

    function compareTotalSales(a,b){
        return (a.total_sales < b.total_sales) ? -1 : (a.total_sales > b.total_sales) ? 1 : 0;
    }

    function compareTotalProducts(a,b){
        return (a.total_products < b.total_products) ? -1 : (a.total_products > b.total_products) ? 1 : 0;
    }

    const sortingMethods ={
        "" : (a,b)=> 0,
        "Category" : compareName,
        "Total sales" : compareTotalSales,
        "Sub categories"  : compareChildren,
        "Total products" : compareTotalProducts,
    }
   
    function handleExtendChildren(id,childrenArray){
        setChildren({...children, [id]:childrenArray});
    }

    async function deleteCategory(categoryID){
        const onSuccess = ()=>{
            setResultPopUp({
                show: true,
                status: 'Success',
                message: response.metadata.message,
            });
        }
        
        const onError = ()=>{
            setResultPopUp({
                show: true,
                status: 'Error',
                message: response?.error?.message || "something bad happended !",
            });
        }

        handleDeleteResource(categoryID, onSuccess, onError);
    }
    
    function handleDeleteButtonClick(categoryID){
        deleteCategory(categoryID);
    }

    function renderCategoryRow(category){
        return (
            <TableRow key={category.id}>
                <TableCell>
                    <CategoryCardHorizontal name={category.display_name} image={category.image_url} description={category.description} />
                </TableCell>
                <TableCell>
                    <SubcategoriesCell>
                        {children[category.id] && children[category.id].map((child)=>(
                            <Subcategory key={child.id}>{child.category}</Subcategory>
                        ))}
                        {children[category.id] && category.children.length >3 && category.children.length != children[category.id].length &&(
                            <AllButton onClick={(e)=> handleExtendChildren(category.id,category.children)} style={{color:"var(--main-color)", fontWeight:"500"}}>
                                all...
                            </AllButton>
                        )}
                    </SubcategoriesCell>
                </TableCell>
                <TableCell>{category.total_sales}</TableCell>
                <TableCell>{category.total_products}</TableCell>
                <TableCell style={{textAlign:'start'}}>
                    <DeleteButton onClick={(e)=>handleDeleteButtonClick(category.id)}><i className="fa-regular fa-trash-can"/></DeleteButton>
                    <EditButton to={"/categories/edit/" + category.id}><i className="fa-regular fa-pen-to-square"/></EditButton>
                </TableCell>
            </TableRow>
        )
    }

    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp} />
            <ResourceTableClientSide 
                renderRow={renderCategoryRow}
                resourceName={"categories"}
                nameField = {"category"}
                headers={TABLE_HEADERS}
                columnsWidths={COLUMNS_WIDTHS}
                sortingMethods={sortingMethods}
                resource={categories}
            />
        </>
    )
}

