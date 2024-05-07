import styled from "styled-components";


const Container = styled.div`
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

const HeaderButtons = styled.div`
display: flex;
gap:1rem;
`

export default function DefaultPageHeader({children, title, renderButtons}){
    return(
        <Container>
            <Header>
                <HeaderText>
                    <PageTitle>{title}</PageTitle>
                    <PagePath>{location.pathname.split("/").join(" / ")}</PagePath>
                </HeaderText>
                <HeaderButtons>
                    {renderButtons && renderButtons()}
                </HeaderButtons>
            </Header>
            {children}
        </Container>
    )
}