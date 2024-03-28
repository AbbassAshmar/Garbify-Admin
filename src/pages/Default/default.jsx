import Navbar from "../../components/Navbar/navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`

`

export default function Default(){
    return(
        <Container>
            <Navbar>
                <Outlet />
            </Navbar>
        </Container>
    )
}