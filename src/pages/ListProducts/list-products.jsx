import styled from "styled-components";
import DefaultPageHeader from "../DefaultPageHeader/default-page-header";


const Container = styled.form`
gap:2rem;
padding:2rem;
display: flex;
flex-direction:column;
background-color: #F1F4F9;
`
const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: flex-start;
`
const HeaderText = styled.div`
display: flex;
flex-direction: column;
gap:.5rem;
`
const PageTitle = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`

const PagePath = styled.p`
font-size:var(--body);
font-weight: 600;
color : #A8AAAE;
`

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