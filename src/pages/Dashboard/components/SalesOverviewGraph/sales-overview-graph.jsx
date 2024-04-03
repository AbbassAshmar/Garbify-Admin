import styled from "styled-components";
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import TitleAndSubTitle from "../TitleAndSubTitle/title-and-subtitle";

const Container = styled.div`
gap:2rem;
width: 100%;
height:100%;
padding:2rem;
display: flex;
flex-direction:column;
background-color: white;
border-radius: 6px;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`
const Content = styled.div`
gap:4rem;
display: flex;
align-items: center;
`
const GraphContainer = styled.div`
width:55%;
`
const LegendContainer = styled.div`
gap:1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`

const data = {
    labels: [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
}

const options = {
    responsive:true,
    cutout: 20,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        r: {
          ticks: {
            display: false // Remove vertical numbers
          },
          grid: {
            display: false // Removes the circulair lines
          }
        }
    }
};

export default function SalesOverviewGraph(){
    return (
        <Container>
            <TitleAndSubTitle title={"Sales overview"} subTitle={"Per season"} />
            <Content>
                <GraphContainer>
                    <PolarArea data={data} options={options}/>
                </GraphContainer>
                <LegendContainer>
                    <LegendBox name={"fall"} value={"3425$"} color={"green"}/>
                    <LegendBox name={"automn"} value={"3425$"} color={'purple'}/>
                    <LegendBox name={"summer"} value={"3425$"} color={"blue"}/>
                    <LegendBox name={"winter"} value={"3425$"} color={"red"}/>
                </LegendContainer>
            </Content>
        </Container>
    )
}


const LegendBoxContainer = styled.div`
gap:.5rem;
display:flex;
align-items: center;
font-size:var(--small-1);
`
// const ColoredCircle = styled.div`
// width:30px;
// height:30px;
// border-radius: 6px;
// background-color: ${({$color})=>$color};
// `
const Diamond = styled.i`
font-size:1.4rem;
color: ${({$color})=>$color};
`
const LegendText = styled.div`
display: flex;
flex-direction: column;
`
const LegendKey = styled.p`
font-weight:600;
`
const LegendValue = styled.p`
font-weight:600;
color:#A8AAAE;
`
function LegendBox({name, value, color}){
    return (
        <LegendBoxContainer>
            <Diamond $color={color} className="fa-solid fa-diamond" />
            <LegendText>
                <LegendKey>{name}</LegendKey>
                <LegendValue>{value}</LegendValue>
            </LegendText>
        </LegendBoxContainer>
    )
}