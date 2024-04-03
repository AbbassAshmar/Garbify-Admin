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
`
////// table ---------------------------
const Table = styled.table`
border-collapse: collapse;
table-layout: fixed 
`;


const TableHead = styled.thead`
  border-bottom: 2px solid #F1F4F9;
`;

const TableRow = styled.tr`
  border-bottom: 2px solid #F1F4F9;
  padding-bottom:2rem;;
`;

const TableHeader = styled.th`
  padding:0 1rem 1rem 0;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  
`;

const LineGraphContainer = styled.div`
  width: 10vw;
`;

const productsData = [
  {
    name : 'Product A',
    image : blueHoody,
    sold : 13,
    revenue : '$342',
    progress : 62,
    price: 3253,
    performance : [292,222,211,394,124,343] // sold last three months
  },
  {
    name : 'Product B',
    image : cartoonShirt,
    sold : 132,
    revenue : '$432',
    price: 453,
    progress : 32,
    performance : [292,222,211,394,124,343] // sold last three months
  },
  {
    name : 'Product C',
    image : blueHoody,
    sold : 132,
    revenue : '$122',
    price: 34,
    progress : 32,
    performance : [292,222,211,394,124,343] // sold last three months
  },
  {
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
            <TableHead>
                <TableRow>
					<TableHeader>Products</TableHeader>
					<TableHeader>Performance</TableHeader>
					<TableHeader>Sold</TableHeader>
					<TableHeader>Revenue</TableHeader>
					<TableHeader>Progress</TableHeader>
                </TableRow>
            </TableHead>
            <tbody>
                {productsData.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell style={{width:"20%",padding:"1rem 1rem 2rem 0"}}>
                          <ProductCardHorizontal name={product.name} image={product.image} price={product.price} />
                        </TableCell>
                        <TableCell style={{width:"13%",padding:"0 4rem 0 0"}}>
                            <LineGraphContainer>
                                <Line data={{ labels: ['jan', 'feb', 'mar','apr','jun','jul'], datasets: [{ label:"performance",data: product.performance, fill: false, borderColor: 'green' }] }} options={chartOptions} />
                            </LineGraphContainer>
                        </TableCell>
                        <TableCell style={{padding:"0"}}>{product.sold}</TableCell>
                        <TableCell>{product.revenue}</TableCell>
                        <TableCell>{product.progress}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    </Container>
  );
};

