import Navbar from "../../components/Navbar/navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBarNavigation from "../../components/SideBarNavigation/side-bar-navigation";
import { useState } from "react";

const Container = styled.div`
display:flex;
flex-direction:column;
width:100%;
overflow:hidden;
`
const Body = styled.div`
display:flex;
`
const SideBarNavigationContainer = styled.div`
flex:${({$flex})=> $flex};
overflow:clip;
transition:flex .3s;
`
const OutletContainer = styled.div`
flex:5;
overflow:hidden;
`

export default function Default(){
    const [showSideBarNavigation, setShowSideBarNavigation] = useState(true);
    return(
        <Container>
            <Navbar setShowSideBarNavigation={setShowSideBarNavigation} showSideBarNavigation={showSideBarNavigation}/>
            <Body>
                <SideBarNavigationContainer $flex={showSideBarNavigation? "1.3":"0"}>
                    <SideBarNavigation />
                </SideBarNavigationContainer>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </Body>
        </Container>
    )
}