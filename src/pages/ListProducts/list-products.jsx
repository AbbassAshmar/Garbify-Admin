import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductCardHorizontal from "../../components/ProductCardHorizontal.jsx/product-card-horizontal";
import { Products } from "../../dummy_data";
import { useState } from "react";
import useUserState from "../../hooks/use-user-state";
import useSendRequest from "../../hooks/use-send-request";
import useDeleteResource from "../../hooks/use-delete-resource";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import ResourceTableServerSide from "../../components/ResourceTableServerSide/resource-table-server-side";

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
width:100%;
`
const TableCell = styled.td`
text-align: left;
padding:1.5rem .5rem;
font-weight:500;
color:#5D5F60;
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
const Category = styled.div`
color:grey;
font-weight:500;
border-radius: 4px;
width:fit-content;
padding:.25rem .5rem;
font-size:var(--small-1);
background-color:var(--secondary-color);  
`

const TABLE_HEADERS = ["Product" ,"Category", "Total sales", "Quantity", "Sold", "Action"];
const COLUMNS_WIDTHS = ["35%","16.25%","16.25%", "16.25%", "16.25%", "70px"];
const sortingDictionary = {
    "Product" : "name",
    "Total sales" : "total_sales",
    "Quantity" : "quantity",
    "Sold" : "quantity_sold"
}

export default function ListProducts(){
    const [products, setProducts] = useState([]);

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
    const {handleDeleteResource} = useDeleteResource(sendRequest,setProducts,products,"/api/products");

    async function deleteProduct(productID){
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

        handleDeleteResource(productID, onSuccess, onError);
    }
    
    function handleDeleteButtonClick(productID){
        deleteProduct(productID);
    }

    function renderProductRow(product){
        return(
            <TableRow key={product.id}>
                <TableCell>
                    <ProductCardHorizontal name={product.name} image={product.thumbnail?.url} price={product.price} />
                </TableCell>
                <TableCell><Category>{product?.category?.category}</Category></TableCell>
                <TableCell>{product.total_sales}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.quantity_sold}</TableCell>
                <TableCell style={{textAlign:'start'}}>
                    <DeleteButton onClick={(e)=>handleDeleteButtonClick(product.id)}><i className="fa-regular fa-trash-can"/></DeleteButton>
                    <EditButton to={"/products/edit/" + product.id}><i className="fa-regular fa-pen-to-square"/></EditButton>
                </TableCell>
            </TableRow>
        )
    }

    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp} />
            <ResourceTableServerSide 
            resourceName={"products"}
            endpointURL={"/api/products"}
            columnsWidths={COLUMNS_WIDTHS}
            headers={TABLE_HEADERS}
            renderRow={renderProductRow}
            resource={products}
            setResource={setProducts}
            sortingDictionary={sortingDictionary}/>
        </>
    )
}