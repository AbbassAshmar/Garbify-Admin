import { Line } from 'react-chartjs-2';
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
border-radius: 6px;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`

const LineContainer = styled.div`
    
    
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
  labels: [5, 10, 15, 20, 25, 30],
  datasets: [
    {
      label: 'Traffic',
      data: [50, 60, 70, 65, 75, 80], // Sample data
      fill: false,
      borderColor:'rgba(0,194,255,1)',
      tension: 0.3 ,
    }
  ]
};

const options = {
    maintainAspectRatio: false,
    scales: {
        x:{
            grid:{
                drawBorder: false, 
                lineWidth:4,
                color:'#F1F4F9',
            },
            border:{
                display:false,
                dash: [30, 30],
            }, 
            ticks: {
                display: false,
            },
        },
        y:{
            display:false,
        }
    },
    elements: {
        line: {
            borderWidth: 3, 
            tension: 0.3
        }
    },
    plugins: {
        legend: {
            display: false, // Hide legend
        },
    },
};

export default function TrafficLineGraph(){
    return (
        <Container>
            <TitleAndSubTitle title={"Traffic"} subTitle={"Last month"}/>
            <LineContainer>
                <Line data={data} options={options} />
            </LineContainer>
            <DetailsContainer>
                <TrafficNumber>130k</TrafficNumber>
                <ValueDirection>
                    <IncreaseIcon />
                    <ChangeValue>+32%</ChangeValue>
                </ValueDirection>
            </DetailsContainer>
        </Container>
    );
};


