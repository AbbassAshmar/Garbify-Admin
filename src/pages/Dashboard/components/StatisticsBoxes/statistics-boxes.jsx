import StatisticsBox from "./components/statistics-box";
import styled from "styled-components";

const Container = styled.div`
gap:2rem;
width:100%;
min-width:0;
display:flex;
overflow:auto;
max-width:100%;
overflow-y:hidden;
transform: translateY(-33px);
`

const Boxes = styled.div`
display:flex;
gap:2rem;
width:100%;
overflow:auto;
min-width:0;
max-width:100%;
padding: 15px 15px 15px 15px;
transform: translateY(16px);
`

export default function StatisticsBoxes(){
    return(
        <Container>
            <Boxes>
                <StatisticsBox value={'3454$'} name={"Today's revenue"} iconClass={"fa-solid fa-dollar-sign"} color={"102,255,64"} endpoint={"/revenue/variablity"}/>
                <StatisticsBox value={"53"} name={"Today's profit"} iconClass={"fa-solid fa-boxes-stacked"} color={"0,194,255"} endpoint={"/profit/variablity"}/>
                <StatisticsBox value={"34"} name={"Today's clients"} iconClass={"fa-solid fa-user-plus"} color={"173,90,255"} endpoint={"/clients/variablity"}/>
                <StatisticsBox value={"36"} name={"Today's orders"} iconClass={"fa-solid fa-briefcase"} color={"247,251,66"} endpoint={"/orders/variablity"}/>
            </Boxes>
        </Container>
    )
}