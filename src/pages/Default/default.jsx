import Navbar from "../../components/Navbar/navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBarNavigation from "../../components/SideBarNavigation/side-bar-navigation";

const Container = styled.div`
display:flex;
flex-direction:column;
`
const Body = styled.div`
display:flex;
`
const SideBarNavigationContainer = styled.div`
flex:1;
`
const OutletContainer = styled.div`
flex:5;

`

export default function Default(){
    return(
        <Container>
            <Navbar />
            <Body>
                <SideBarNavigationContainer>
                    <SideBarNavigation />
                </SideBarNavigationContainer>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </Body>
        </Container>
    )
}