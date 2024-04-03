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
const TableOverviewGraphs = styled.div`
width: 100%;
`
const ProductsPerformanceTableContainer = styled.div`
flex:1;
`
const OverviewGraphsContainer = styled.div`
flex:1;
gap:2rem;
display: flex;
flex-direction: column;
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
            <TableOverviewGraphs>
                <ProductsPerformanceTableContainer>
                    <ProductsPerformanceTable />
                </ProductsPerformanceTableContainer>
                <OverviewGraphsContainer>
                    <CategoriesOverviewGraph />
                    <SalesOverviewGraph />
                </OverviewGraphsContainer>
            </TableOverviewGraphs>
        </Container>
    )
}