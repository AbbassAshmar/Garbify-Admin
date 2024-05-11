

import styled from "styled-components";
import { Link } from "react-router-dom";
import ResourceTable from "../components/ResourceTable/resource-table";
import ProductCardHorizontal from "../../components/ProductCardHorizontal.jsx/product-card-horizontal";
import { Products, Users } from "../../dummy_data";
import { useEffect, useState } from "react";
import UserCardHorizontal from "../../components/UserCardHorizontal/user-card-horizontal";
import useUserState from "../../hooks/use-user-state";
import useSendRequest from "../../hooks/use-send-request";
import useDeleteResource from "../../hooks/use-delete-resource";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
width:100%;
`
const TableCell = styled.td`
text-align: left;
padding:1.5rem 1rem 1.5rem 0;
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
const UserRole = styled.div`
width: fit-content;
border-radius: 4px;
background-color: ${({$color})=> $color};
padding:.25rem .5rem;
font-weight:500;
`
const TABLE_HEADERS = ["User" , "Joined at", "Total orders", "Total spent", "Role", "Action"];
const COLUMNS_WIDTHS = ["35%","16.25%","16.25%", "16.25%", "16.25%", "70px"];

const rolesColors = {
    Admin : "var(--main-color)",
    Client : "#22DD22"
}

export default function UsersTable(){
    const [users, setUsers] = useState([]);
    
    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});
    const {handleDeleteResource} = useDeleteResource(sendRequest,setUsers,users,"/api/users");

    function compareName(a,b){
        return (a.name[0] < b.name[0]) ? -1 : (a.name[0] > b.name[0]) ? 1 : 0;
    }

    function compareJoinedAt(a,b){
        let DateA = new Date(a.created_at);
        let DateB = new Date(b.created_at);

        return (DateA < DateB) ? -1 : (DateA > DateB) ? 1 : 0;
    }

    function compareTotalSpent(a,b){
        return (a.total_spent < b.total_spent) ? -1 : (a.total_spent > b.total_spent) ? 1 : 0;
    }

    function compareTotalOrders(a,b){
        return (a.total_orders < b.total_orders) ? -1 : (a.total_orders > b.total_orders)  ? 1 :0;
    }

    function compareRole(a,b){
        return (a.role[0] < b.role[0]) ? -1 : (a.role[0] > b.role[0]) ? 1 : 0;
    }

    const sortingMethods ={
        "" : (a,b)=> 0,
        "User" : compareName,
        "Joined at" : compareJoinedAt,
        "Total orders"  : compareTotalOrders,
        "Total spent" : compareTotalSpent,
        "Role" : compareRole,
    }

    async function deleteUser(userID){
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

        handleDeleteResource(userID, onSuccess, onError);
    }
    
    function handleDeleteButtonClick(userID){
        deleteUser(userID);
    }

    function renderUserRow(user){
        return(
            <TableRow key={user.id}>
                <TableCell>
                    <UserCardHorizontal name={user.name} profile_picture={user.profile_picture.url} email={user.email} />
                </TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>{user.total_orders}</TableCell>
                <TableCell>{user.total_spent}$</TableCell>
                <TableCell>
                    <UserRole $color={rolesColors[user.role]}>{user.role}</UserRole>
                </TableCell>
                <TableCell style={{textAlign:'start'}}>
                    <DeleteButton onClick={(e)=>handleDeleteButtonClick(user.id)}><i className="fa-regular fa-trash-can"/></DeleteButton>
                    <EditButton to={"/users/edit/" + user.id}><i className="fa-regular fa-pen-to-square"/></EditButton>
                </TableCell>
            </TableRow>
        )
    }

    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp} />
            <ResourceTable 
            resourceName={"users"}
            endpointURL={"/api/users"}
            columnsWidths={COLUMNS_WIDTHS}
            headers={TABLE_HEADERS}
            renderRow={renderUserRow}
            sortingMethods={sortingMethods} 
            dummyData={Users}
            resource={users}
            setResource={setUsers}/>
        </>
    )
}