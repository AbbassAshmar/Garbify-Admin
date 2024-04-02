
import styled from "styled-components";
import IncreaseIcon from "../../../../../components/IncreaseIcon/increase-icon";
import DecreaseIcon from "../../../../../components/DecreaseIcon/decrease-icon";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto' 

const Container = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
background:white;
padding:2rem;
gap:2rem;
`

const StatIconContainer = styled.div`
display:flex;
align-items:flex-starts;
flex-direction:column;
gap:1rem;
`
const IconContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:40px;
height:40px;
background:rgba(255,0,0,0.2);
border-radius: 50%;
`
const Icon = styled.i`
color:rgba(255,0,0,01);
font-size:1rem;
`
const Stats = styled.div`
display:flex;
align-items:flex-starts;
flex-direction:column;
gap:.5rem;
font-weight:600;
text-wrap:nowrap;
`
const Value = styled.p`

`
const Name = styled.p`
color:#A8AAAE;
`
const LineContainer = styled.div`
display:flex;
height:100%;
width:100%;
flex-direction:column;
justify-content:space-between;
`
const ValueStatus = styled.div`
display:flex;
align-items:center;
gap:.25rem;
align-self:flex-end;
`
const ChangeQuantity = styled.div`
font-weight:600;
`

const LineWrapper = styled.div`
width:100px;
height:50px;
transform:translateY(10px);
`

const chartData = {
    labels: [ 'April', 'May', 'June', 'July'],
    datasets: [
        {
            data: [ 81, 56, 55, 40],
            fill: false,
            borderColor: 'red',
            tension: 0.4,
        },
    ],
};

const chartOptions = {
    scales: {
        x: {display: false},
        y: {display: false},
    },
    plugins: {
        legend:{display: false},
    },
};

export default function StatisticsBox(){
    return (
        <Container>
            <StatIconContainer>
                <IconContainer>
                    <Icon className="fa-solid fa-dollar-sign"/>
                </IconContainer>
                <Stats>
                    <Value>504.32$</Value>
                    <Name>Today's Sales</Name>
                </Stats>        
            </StatIconContainer>
            <LineContainer>
                <ValueStatus>
                    <IncreaseIcon />
                    <ChangeQuantity>+32%</ChangeQuantity>
                </ValueStatus>
                <LineWrapper>
                    <Line data={chartData} options={chartOptions} />
                </LineWrapper>
            </LineContainer>
        </Container>
    )
}