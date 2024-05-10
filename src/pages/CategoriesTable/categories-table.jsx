import styled from "styled-components";
import SearchBar from "./components/SearchBar/search-bar";
import { useEffect, useState } from "react";
import CategoryCardHorizontal from "./components/CategoryCardHorizontal/category-card-horizontal";
import { FlatCategories } from "../../dummy_data";
import {Link} from "react-router-dom";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import useUserState from "../../hooks/use-user-state";
import useSendRequest from "../../hooks/use-send-request";
import DefaultPageHeader from "../components/DefaultPageHeader/default-page-header";
import ResourceTable from "../components/ResourceTable/resource-table";
import useDeleteResource from "../../hooks/use-delete-resource";

const Content = styled.div`
gap:2rem;
width: 100%;
padding:2rem;
display: flex;
overflow: auto;
border-radius: 6px;
align-items: flex-start;
flex-direction: column;
background-color: white;
`

const ContentHeader = styled.div`
width: 100%;
display: flex;
align-items: stretch;
justify-content: space-between;
`

const AddCategoryButton = styled(Link)`
border:2px solid var(--main-color);
color:var(--main-color);
font-weight:600;
font-size:var(--body);
text-decoration:none;
padding:0 1rem;
border-radius: 4px;
background-color: white;
display: flex;
align-items: center;
gap: .5rem;
cursor: pointer;
transition:background-color .3s, color .3s;
&:hover{
    background-color: var(--main-color);
    color:white;
}
`

const ContentBody = styled.div`
overflow: auto;
width:100%;
`
////// table ---------------------------

const Table = styled.table`
border-collapse: collapse;
table-layout: fixed;
border-spacing: 0 0 0 2rem;
width:100%;
min-width: 850px;
overflow: hidden;
`

const TableHeaders = styled.thead`
border-bottom: 2px solid #F1F4F9;
width:100%;
`;

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
width:100%;
`;

const SortIcon = styled.i`
color:${({$color})=>$color};
transform:translateY(3px);
rotate:${({$rotate})=>$rotate};
transition:rotate .3s, color .3s;
`

const TableHeader = styled.th`
padding:1rem 1rem 2rem 0;
text-align: left;
cursor: pointer;

&:nth-child(5){
    padding:1rem 0 2rem 0;
}

&:hover ${SortIcon}{
    color:black;
}
`
const TableHeaderContent = styled.div`
gap:8px;
display: flex;
align-items: center;
cursor: pointer;
&:hover ${SortIcon}{
    color:black;
}
`
const TableCell = styled.td`
text-align: left;
padding:1.5rem .5rem;
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

// Content footer 

const ContentFooter = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
`
const PaginationContainer = styled.div`
gap:1rem;
display: flex;
`
const PageBox = styled.button`
height:32px;
width:32px;
background-color: var(--secondary-color);
display: flex;
align-items: center;
justify-content: center;
font-size: var(--body);
font-weight: 500;
border:none;
border-radius:4px;
cursor: pointer;
transition:background-color .3s;
&:hover{
    background-color: var(--secondary-text);
}
`


const TABLE_HEADERS = ["Category","Sub categories","Total sales","Total products","Actions"];
const COLUMNS_WIDTHS = ["35%","27%", "19%", "19%", "70px"];

export default function CategoriesTable(){
    const [children, setChildren] = useState({});
    const [categories, setCategories] = useState(FlatCategories);

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
    
    function compareChildren(a,b){
        return (a.children.length < b.children.length) ? -1 : (a.children.length > b.children.length) ? 1 : 0;
    }
    
    function compareName(a,b){
        return (a.name[0] < b.name[0]) ? -1 : (a.name[0] > b.name[0]) ? 1 : 0;
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

    const {handleDeleteResource} = useDeleteResource(sendRequest,setCategories,categories,"/api/categories");

    async function handleDeleteCategory(categoryID){
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
                message: response.error.message,
            });
        }

        handleDeleteResource(categoryID, onSuccess, onError);
    }
    
    function handleDeleteButtonClick(categoryID){
        handleDeleteCategory(categoryID);
    }

    function renderCategoryRow(category){
        return (
            <TableRow key={category.id}>
                <TableCell>
                    <CategoryCardHorizontal name={category.name} image={category.image} description={category.description} />
                </TableCell>
                <TableCell>
                    <SubcategoriesCell>
                        {children[category.id] && children[category.id].map((child)=>(
                            <Subcategory key={child + category.id}>{child}</Subcategory>
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
            <ResourceTable 
                renderRow={renderCategoryRow}
                endpointURL={"/categories/flat"}
                resourceName={"categories"}
                headers={TABLE_HEADERS}
                columnsWidths={COLUMNS_WIDTHS}
                sortingMethods={sortingMethods}
                dummyData={FlatCategories}
                resource={categories}
                setResource={setCategories}
            />
        </>
    )
}

