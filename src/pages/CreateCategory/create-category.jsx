import styled from "styled-components";
import MediaSection from "./components/MediaSection/media-section";
import DetailsSection from "./components/DetailsSection/details-section";

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

const HeaderButtons = styled.div`
display: flex;
gap:1rem;
`

const AddCategoryButton = styled.button`
border:none;
color:white;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);

&:hover{
    background-color:#009BCC;
}
`
const DiscardChangesButton = styled.button`
border:none;
color: #bebebe;
cursor:pointer;
font-weight:500;
border-radius:6px;
padding:.5rem 1.5rem;
font-size:var(--body);
transition: background .3s;
background-color: #f1f1f1;
&:hover{
    background-color: #dddddd;
}
`
const Content = styled.main`
gap:max(13%, 7rem);
padding:2rem;
display: flex;
border-radius: 6px;
background-color: white;
justify-content: space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`
export default function CreateCategory(){

    function handleFormSubmit(){
        e.preventDefault();
    }

    return(
        <Container onSubmit={handleFormSubmit}>
            <Header>
                <HeaderText>
                    <PageTitle>Add Category</PageTitle>
                    <PagePath>{location.pathname.split("/").join(" / ")}</PagePath>
                </HeaderText>
                <HeaderButtons>
                    <DiscardChangesButton>Discard</DiscardChangesButton>
                    <AddCategoryButton type="submit">Add category</AddCategoryButton>
                </HeaderButtons>
            </Header>
            <Content>   
                <MediaSection />
                <DetailsSection />
            </Content>
        </Container>
    )
}