import styled from "styled-components";
import { Link } from "react-router-dom";
import { Orders } from "../../dummy_data";
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
const OrderStatus = styled.div`
font-weight:600;
border-radius: 4px;
width:fit-content;
padding:.25rem .5rem;
font-size:var(--small-1);
color:${({$color})=>$color};
background-color:${({$background})=>$background};
`

const TABLE_HEADERS = ["Order ID" ,"Customer", "Status", "Total Price", "Items", "Ordered at", "Action"];
const COLUMNS_WIDTHS = ["15%","20%","17%","17%", "14%", "17%", "70px"];
const sortingDictionary = {
    "Product" : "name",
    "Total sales" : "total_sales",
    "Quantity" : "quantity",
    "Sold" : "quantity_sold"
};


//first status
    //paid : after clients pays 
//second status 
    //Awaiting Shipment  : seller accepts the order and now it's awaiting to be picked up by the shipper 
    //declined : seller decided not to sell his item and cancelled order , money is returned to the customer
//third status 
    //shipping : order picked by shipper and on it's way to the customer
// fourth status 
    //completed: order has been picked by the customer from the shipper 

//on hold : some problem happend when shipping / or with seller and is being solved
//canceled : before shipping status (third), customer can cancel order and get his money back
//partially canceled : before shipping status (third) , customer can cancel one or more of the products and get his money back



const ORDER_STATUS_COLORS={
    "Paid" : "0, 194, 255",
    "Awaiting shipment": "255, 255, 0",
    "Declined":"202,8,8",
    "Shipping":"255, 165, 0",
    "Completed":"40, 199, 111",
    "On hold":"117, 119, 121",
    "Canceled": "242, 38, 19",
    "Partially canceled" : "214, 32, 78",
}

export default function OrdersTable(){
    const [orders, setOrders] = useState([]);

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
    const {handleDeleteResource} = useDeleteResource(sendRequest,setOrders,orders,"/api/orders");

    async function deleteProduct(orderID){
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

        handleDeleteResource(orderID, onSuccess, onError);
    }
    
    function handleDeleteButtonClick(orderID){
        deleteProduct(orderID);
    }

    function renderOrderRow(order){
        return(
            <TableRow key={order.id}>
                <TableCell style={{color:'black'}}>#{order.id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>
                    <OrderStatus $color={`rgba(${ORDER_STATUS_COLORS[order.status]},1)`} $background={`rgba(${ORDER_STATUS_COLORS[order.status]},0.15)`}>
                        {order.status}
                    </OrderStatus>
                </TableCell>
                <TableCell>{order.amount_total}$</TableCell>
                <TableCell>{order.order_details.length}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell style={{textAlign:'start'}}>
                    <DeleteButton onClick={(e)=>handleDeleteButtonClick(order.id)}><i className="fa-regular fa-trash-can"/></DeleteButton>
                    <EditButton to={"/orders/edit/" + order.id}><i className="fa-regular fa-pen-to-square"/></EditButton>
                </TableCell>
            </TableRow>
        )
    }

    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp} />
            <ResourceTableServerSide 
            resourceName={"orders"}
            endpointURL={"/api/orders"}
            columnsWidths={COLUMNS_WIDTHS}
            headers={TABLE_HEADERS}
            renderRow={renderOrderRow}
            dummyData={Orders}
            resource={orders}
            setResource={setOrders}
            sortingDictionary={sortingDictionary}/>
        </>
    )
}