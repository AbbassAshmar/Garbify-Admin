import styled from "styled-components";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import TitleAndSubTitle from "../TitleAndSubTitle/title-and-subtitle";

import cartoonShirt from "../../../../assets/cartoonShirt.jpg";
import blueHoody from "../../../../assets/blueHoody.png";
import ProductCardHorizontal from "./components/ProductCardHorizontal.jsx/product-card-horizontal";

const Container = styled.div`
gap:3rem;
padding:2rem;
display:flex;
flex-direction: column;
background-color: white;
border-radius: 6px;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`
const TitleMonthContainer = styled.div`
width:100%;
display: flex;
align-items: center;
justify-content: space-between;
`
const MonthButton = styled.button`
display: flex;
align-items: flex-end;
gap:.5rem;
background-color: #F1F4F9;
padding:.3rem 1rem;
border:none;
color:#A8AAAE;
font-weight:600;
font-size:1rem;
border-radius: 3px;
`
////// table ---------------------------
const Table = styled.table`
border-collapse: collapse;
table-layout: fixed;
`

const TableHeaders = styled.thead`
border-bottom: 2px solid #F1F4F9;
`

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
`

const TableHeader = styled.th`
padding:0 1rem 1.5rem 0;
text-align: left;
`

const TableCell = styled.td`
text-align: left;
padding:1.5rem .5rem;
`

const LineGraphContainer = styled.div`
width: 10vw;
`

const productsData = [
  {
    id:4,
    name : 'Product A',
    image : blueHoody,
    sold : 13,
    revenue : '$342',
    progress : 62,
    price: 3253,
    performance : [292,222,211,394,124,343] // sold last three months
  },
  {
    id:5,
    name : 'Product B',
    image : cartoonShirt,
    sold : 132,
    revenue : '$432',
    price: 453,
    progress : 32,
    performance : [292,222,211,394,124,343] // sold last three months
  },
  {
    id:8,
    name : 'Product C',
    image : blueHoody,
    sold : 132,
    revenue : '$122',
    price: 34,
    progress : 32,
    performance : [292,222,211,394,124,343] // sold last three months
  },
  {
    id:9,
    name : 'Product D',
    image : cartoonShirt,
    sold : 211,
    revenue : '$2123',
    price: 323,
    progress : 84,
    performance : [12,22,32,10,9,0] // sold last three months
  },
]

const chartOptions = {
	aspectRatio: 1/.4 ,
	responsive: true, // Make the chart responsive
	elements: {
	line: {
		borderWidth: 3, 
		tension: 0.4
	}
	},
	plugins: {
		legend: {display: false},
	},
	scales: {
		x: {display: false},
		y: {display: false},
	}
};

export default function ProductsPerformanceTable() {
  return (
    <Container>
        <TitleMonthContainer>
            <TitleAndSubTitle title={"Products perfromance"}/>
            <MonthButton>
                <p>April</p> 
                <i className="fa-solid fa-angle-down"/>
            </MonthButton>
        </TitleMonthContainer>
        <Table>
            <TableHeaders>
                <TableRow>
                  <TableHeader>Products</TableHeader>
                  <TableHeader>Revenue</TableHeader>
                  <TableHeader>Sold</TableHeader>
                  <TableHeader>Progress</TableHeader>
                  <TableHeader>Performance</TableHeader>
                </TableRow>
            </TableHeaders>
            <tbody>
                {productsData.map((product, index) => (
                    <TableRow key={product.id}>
                        <TableCell style={{width:"25%"}}>
                          <ProductCardHorizontal name={product.name} image={product.image} price={product.price} />
                        </TableCell>
                        <TableCell style={{width:"18%"}}>{product.revenue}</TableCell>
                        <TableCell style={{width:"18%"}}>{product.sold}</TableCell>
                        <TableCell style={{width:"18%"}}>{product.progress}</TableCell>
                        <TableCell style={{width:"13%",padding:"0 4rem 0 0"}}>
                            <LineGraphContainer>
                                <Line data={{ labels: ['jan', 'feb', 'mar','apr','jun','jul'], datasets: [{ label:"performance",data: product.performance, fill: false, borderColor: 'green' }] }} options={chartOptions} />
                            </LineGraphContainer>
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    </Container>
  );
};

