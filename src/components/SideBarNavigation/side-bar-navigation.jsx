import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
const Container = styled.div`
width:100%;
background:black;
max-height:calc(100vh - 70px);
overflow:auto;
position:sticky;
top:70px;
`
const Content = styled.div`
padding:2rem;
width:100%;
display:flex;
background:white;

flex-direction:column;
align-items:flex-start;
gap:2rem;
`
const MainPages = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
gap:1rem;
`
const Dashboard = styled(Link)`
display:flex;
gap:.5rem;
text-decoration:none;
color:black;
font-size:var(--small-1);
font-weight:500;
align-items:center;
transition:color .3s;
&:hover{
    color:var(--main-color);
}
`
const AllPages = styled.div`
gap:1rem;
width:100%;
display:flex;
flex-direction:column;
align-items:flex-start;
`

const PagesTitle =styled.p`
font-size:var(--small-1);
font-weight:600;
color:#C0C3C7;

`
const AllPagesWrapper = styled.div`
width:100%;
`

const PagesBlocks = styled.div`
width:100%;

`

const PagesBlockTitleContainer = styled.div`
display:flex;
cursor:pointer;
justify-content:space-between;
align-items:center;
width:100%;
padding: 6px 8px;
border-radius:4px;
text-decoration:none;
position:relative;
background:${({$selected})=> ($selected ?'rgba(0,194,255,.2)' : 'white')};
color:${({$selected})=> ($selected ?'var(--main-color)' : 'black')};

&:before{
    content:"";
    background:var(--main-color);
    width:5px;
    border-radius:3px;
    height:100%;
    position:absolute;
    left:-2rem;
    top:0;
    display:${({$selected})=> ($selected ?'block' : 'none')};

}
`

const PagesBlockTitle = styled.p`
display:flex;
gap:.5rem;
width:100%;
text-decoration:none;
font-size:var(--small-1);
font-weight:500;
align-items:center;
`
const PagesLinksContainer = styled.div`
display:flex;
flex-direction:column;
gap:.5rem;
padding: 1rem 0;
`
const PageLink = styled(Link)`
text-decoration:none;
color:black;
font-weight:600;
font-size:var(--small-1);
display:flex;
gap:.5rem;
align-items:center;
justify-content:flex-start;
padding-left:1.5rem;
color:${({$color})=>$color};
&:hover{
    color:var(--main-color);
}
`

const pagesLinks = [
    {
        name:"Users",
        icon:<i className="fa-regular fa-user"/>,
        links:[
            {
                name:"All users",
                to:"/users"
            },
            {
                name:"Add user",
                to:"/users/add"
            }
        ]
    },
    {
        name:"Products",
        icon:<i className="fa-solid fa-cart-shopping"/>,
        links:[
            {
                name:"Products list",
                to:"/products"
            },
            {
                name:"Add product",
                to:"/products/add"
            }
        ]
    },
    {
        name:"Orders",
        icon:<i className="fa-solid fa-box"/>,
        links:[
            {
                name:"Orders list",
                to:"/orders"
            },
        ]
    },
    {
        name:"Categories",
        icon:<i className="fa-solid fa-layer-group"/>,
        links:[
            {
                name:"Category list",
                to:"/categories"
            },
            {
                name:"Add category",
                to:"/categories/add"
            },
        ]
    }

];
export default function SideBarNavigation(){
    const [expanded, setExpanded] = useState();
    const location = useLocation()
    
    useEffect(()=>{
        for(const page of pagesLinks){
            for(const link of page.links) {
                if (link.to == location.pathname) setExpanded(page);
            }
        }
    },[location])


    return(
        <Container>
            <Content>
                <MainPages>
                    <PagesTitle>Main pages</PagesTitle>
                    <Dashboard>
                        <i className="fa-solid fa-gauge" />
                        <p>Dashboard</p>
                    </Dashboard>
                </MainPages>
                <AllPages>
                    <PagesTitle>All pages</PagesTitle>
                    <AllPagesWrapper>
                        {
                            pagesLinks && pagesLinks.map((page)=>{
                                return (
                                <PagesBlocks>
                                    <PagesBlockTitleContainer onClick={()=> {setExpanded(page)}} $selected={expanded==page}> 
                                        <PagesBlockTitle>
                                            {page.icon}
                                            <p>{page.name}</p>
                                        </PagesBlockTitle>
                                        <i style={{color:"inherit"}} className="fa-solid fa-angle-up"/>
                                    </PagesBlockTitleContainer>
                                    <PagesLinksContainer $selected={expanded==page}>
                                        {
                                            page?.links && page.links.map((link)=>(
                                                <PageLink to={link.to} $color={location.pathname == link.to ? "var(--main-color)":"#A8AAAE"}>
                                                    <i style={{fontSize:"4px"}} className="fa-solid fa-circle"/> 
                                                    <p>{link.name}</p>
                                                </PageLink>
                                            ))
                                        }
                                    </PagesLinksContainer>
                                </PagesBlocks>)
                            })
                        }
                    </AllPagesWrapper>
                </AllPages>
            </Content>
        </Container>
    )
}