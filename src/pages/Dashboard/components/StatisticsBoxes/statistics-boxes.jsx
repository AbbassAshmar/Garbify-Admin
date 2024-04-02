import StatisticsBox from "./components/statistics-box";
import styled from "styled-components";

const Container = styled.div`
display:flex;
gap:2rem;
width:100%;
overflow:auto;
min-width:0;
max-width:100%;
padding-bottom:20px;
`

export default function StatisticsBoxes(){
    return(
        <Container>
            <StatisticsBox />
            <StatisticsBox />
            <StatisticsBox />
            <StatisticsBox />
            <StatisticsBox />
        </Container>
    )
}