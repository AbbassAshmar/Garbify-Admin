import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import styled from 'styled-components';
import IncreaseIcon from '../../../../components/IncreaseIcon/increase-icon';
import DecreaseIcon from '../../../../components/DecreaseIcon/decrease-icon';
import TitleAndSubTitle from "../TitleAndSubTitle/title-and-subtitle";

const Container = styled.div`
background:white;
padding:2rem;
display:flex;
flex-direction: column;
gap:2rem;
width: 100%;
height:100%;
justify-content: space-between;
`

const BarContainer = styled.div`
`
const DetailsContainer = styled.div`
display: flex;
align-items: center;
gap:1rem;
`
const TrafficNumber = styled.p`
font-weight:600;
`
const ValueDirection= styled.div`
display: flex;
align-items: center;
gap:.5rem;
`
const ChangeValue = styled.p`
font-weight:600;
color:var(--main-color);
`

const data = {
    labels: [5, 10, 15, 20, 25],
    datasets: [
        {
            label: 'Products sold',
            data: [50, 60, 70, 65, 75], 
            backgroundColor:'rgba(0,194,255,1)',
        }
    ]
};

const options = {
    barPercentage: 0.4,  
    aspectRatio : 1/.6 ,
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false,
    scales: {
        x:{display:false},
        y:{display:false}
    },
    plugins: {
        legend: {display: false},
    },
};

export default function ProductsSoldBarGraph(){
    return (
        <Container>
            <TitleAndSubTitle title={"Products sold"} subTitle={"Last month"} />
            <BarContainer>
                <Bar data={data} options={options} />
            </BarContainer>
            <DetailsContainer>
                <TrafficNumber>20</TrafficNumber>
                <ValueDirection>
                    <DecreaseIcon />
                    <ChangeValue>-10%</ChangeValue>
                </ValueDirection>
            </DetailsContainer>
        </Container>
    );
};


