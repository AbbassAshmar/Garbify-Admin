import styled from "styled-components";
import DefaultPageHeader from "../components/DefaultPageHeader/default-page-header";


const Content = styled.div`
width: 100%;
overflow: auto;
border-radius: 6px;
background-color: white;
padding-top:2rem;
padding-bottom: 2rem;
`


export default function ListProducts(){
    return(
        <DefaultPageHeader title={"All Products"}>

        </DefaultPageHeader>
    )
}