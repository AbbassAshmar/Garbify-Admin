import styled from "styled-components";
import StatisticsBoxes from "./components/StatisticsBoxes/statistics-boxes";
import SalesGraph from "./components/SalesGraph/sales-graph";
import TrafficLineGraph from "./components/TrafficLineGraph/traffic-line-graph";
import ProductsSoldBarGraph from "./components/ProductsSoldBarGraph/products-sold-bar-graph";
import VisitorsBarsGraph from "./components/VisitorsBarsGraph/visitors-bars-graph";

const Container = styled.div`
background-color:var(--seconday-color);
width:100%;
padding:2rem;
overflow:hidden;
display:flex;
flex-direction:column;
gap:2rem;
`
const ExtraGraphs = styled.div`
width: 100%;
display:flex;
gap:2rem;
align-items: stretch;
@media screen and (max-width:1360px) {
    flex-direction: column;
}
`
const TrafficProductsContainer = styled.div`
display:flex;
overflow:hidden;
justify-content:space-between;
gap:2rem;
flex:1;
`
export default function Dashboard(){
    return(
        <Container>
            <StatisticsBoxes />
            <SalesGraph />
            <ExtraGraphs>
                <div style={{flex:'1'}}>
                    <VisitorsBarsGraph />
                </div>

                <TrafficProductsContainer>
                    <div style={{flex:"1",minWidth:'0'}}>
                        <TrafficLineGraph />
                    </div>
                    <div style={{flex:"1",minWidth:'0'}}>
                        <ProductsSoldBarGraph />
                    </div>
                </TrafficProductsContainer>
                
            </ExtraGraphs>
        </Container>
    )
}