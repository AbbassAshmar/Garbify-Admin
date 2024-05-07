import styled from "styled-components";
import StatisticsBoxes from "./components/StatisticsBoxes/statistics-boxes";
import SalesGraph from "./components/SalesGraph/sales-graph";
import TrafficLineGraph from "./components/TrafficLineGraph/traffic-line-graph";
import ProductsSoldBarGraph from "./components/ProductsSoldBarGraph/products-sold-bar-graph";
import VisitorsBarsGraph from "./components/VisitorsBarsGraph/visitors-bars-graph";
import ProductsPerformanceTable from "./components/ProductsPerformanceTable/products-performance-table";
import CategoriesOverviewGraph from "./components/CategoriesOverviewGraph/categories-overview-graph";
import SalesOverviewGraph from "./components/SalesOverviewGraph/sales-overview-graph";

const Container = styled.div`
width:100%;
padding:2rem;
overflow:hidden;
display:flex;
gap:2rem;
flex-direction:column;
background-color:var(--secondary-color);
`
const ExtraGraphs = styled.div`
gap:2rem;
width: 100%;
display:flex;
align-items: stretch;
@media screen and (max-width:1360px) {
    flex-direction: column;
}
`
const TrafficProductsContainer = styled.div`
flex:1;
gap:2rem;
display:flex;
justify-content:space-between;
`
const TableOverviewGraphs = styled.div`
width: 100%;
display: flex;
gap:2rem;

@media screen and (max-width:1400px){
    flex-direction: column;
}
`
const ProductsPerformanceTableContainer = styled.div`
flex:1.6;
`
const OverviewGraphsContainer = styled.div`
flex:1;
gap:2rem;
display: flex;
flex-direction: column;
@media screen and (max-width:1400px){
    flex-direction: row;
    align-items: stretch;
}
`
export default function Dashboard(){
    return(
        <Container>
            <div>
                <StatisticsBoxes />
                <SalesGraph />
            </div>
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

            <TableOverviewGraphs>
                <ProductsPerformanceTableContainer>
                    <ProductsPerformanceTable />
                </ProductsPerformanceTableContainer>
                <OverviewGraphsContainer>
                    <div style={{flex:'1'}}>
                        <CategoriesOverviewGraph />
                    </div>
                    <div style={{flex:'1'}}>
                        <SalesOverviewGraph />
                    </div>
                </OverviewGraphsContainer>
            </TableOverviewGraphs>
        </Container>
    )
}