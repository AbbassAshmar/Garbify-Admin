import styled from "styled-components";
import { Link } from "react-router-dom";
import ResourceTable from "../components/ResourceTable/resource-table";
import ProductCardHorizontal from "../../components/ProductCardHorizontal.jsx/product-card-horizontal";
import { Products } from "../../dummy_data";
import { useState } from "react";

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
width:100%;
`
const TableCell = styled.td`
text-align: left;
padding:1.5rem .5rem;
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

const TABLE_HEADERS = ["Product" , "Total sales", "Quantity", "Sold", "Action"];
const COLUMNS_WIDTHS = ["35%","27%", "19%", "19%", "70px"];

export default function ListProducts(){
    const [products, setProducts] = useState([]);
    
    function compareName(a,b){
        return (a.name[0] < b.name[0]) ? -1 : (a.name[0] > b.name[0]) ? 1 : 0;
    }

    function compareTotalSales(a,b){
        return (a.total_sales < b.total_sales) ? -1 : (a.total_sales > b.total_sales) ? 1 : 0;
    }

    function compareQuantitySold(a,b){
        return (a.quantity_sold < b.quantity_sold) ? -1 : (a.quantity_sold > b.quantity_sold) ? 1 : 0;
    }

    function compareQuantity(a,b){
        return (a.quantity < b.quantity) ? -1 : (a.quantity > b.quantity)  ? 1 :0;
    }

    const sortingMethods ={
        "" : (a,b)=> 0,
        "Product" : compareName,
        "Total sales" : compareTotalSales,
        "Quantity"  : compareQuantity,
        "Quantity Sold" : compareQuantitySold,
    }

    function handleDeleteButtonClick(productID){

    }

    function productRender(product){
        return(
            <TableRow key={product.id}>
                <TableCell>
                    <ProductCardHorizontal name={product.name} image={product.thumbnail.url} price={product.price} />
                </TableCell>
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
        <ResourceTable 
        resourceName={"products"}
        endpointURL={"/api/products"}
        columnsWidths={COLUMNS_WIDTHS}
        headers={TABLE_HEADERS}
        renderRow={productRender}
        sortingMethods={sortingMethods} 
        dummyData={Products}
        resource={products}
        setResource={setProducts}/>

    )
}