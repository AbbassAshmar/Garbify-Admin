import styled from "styled-components";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar , Line} from "react-chartjs-2";
import TitleAndSubTitle from "../TitleAndSubTitle/title-and-subtitle";

const Container = styled.div`
width:100%;
padding:2rem;
background-color:white;
display:flex;
flex-direction:column;
align-items:flex-start;
gap:2rem;
`
const GraphContainer = styled.div`
width:100%;
position: relative;
min-height:70vh;
`

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
    {
        label: 'Total Profit',
        data: [200, 400, 800, 1000, 800, 100], 
        backgroundColor: 'rgba(0,194,255,.2)', 
        borderColor: 'rgba(0,194,255,1)',
        borderWidth: 2,
        type: 'line', 
        fill: true, 
    },
    {
        label: 'Total Expenses',
        borderWidth: 2,

        data: [300, 500, 400, 1000, 640, 500], 
        borderColor: 'rgba(173,90,255,1)', 
        backgroundColor: 'rgba(173,90,255,0.2)', 
        type: 'line',
        fill:true
    }
    ]
};

const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable aspect ratio maintenance    
    scales: {
        x: {
            grid: {
                display:false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display:false
            }
        }
    },
    elements: {
        line: {
            cubicInterpolationMode: 'monotone' // Smooth curves for lines
        }
    }
};

export default function SalesGraph(){
    return(
        <Container>
            <TitleAndSubTitle title={'Sales'} subTitle={"Last year"} />
            <GraphContainer>
                <Bar data={data} options={options} />
            </GraphContainer>
        </Container>
    )
}