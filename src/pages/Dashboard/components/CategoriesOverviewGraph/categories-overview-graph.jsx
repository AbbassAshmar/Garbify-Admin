import styled from "styled-components";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import TitleAndSubTitle from "../TitleAndSubTitle/title-and-subtitle";

const Container = styled.div`
gap:2rem;
width: 100%;
padding:2rem;
display: flex;
flex-direction:column;
background-color: white;
border-radius: 6px;
box-shadow: 0px 0px 15px rgba(0,0,0,.14) ;
`
const Content = styled.div`
gap:2rem;
display: flex;
align-items: center;
`
const GraphContainer = styled.div`
width:55%;
`
const LegendContainer = styled.div`
flex:1;
gap:1rem;
display: flex;
flex-direction: column;
`

const data = {
    labels: ['Men', 'Women', 'Children'],
    datasets: [
      {
        data: [3000, 5000, 2000], // Example sales data for each category
        backgroundColor: ['red', 'blue', 'purple'], // Colors for each category
        hoverBackgroundColor: ['red', 'blue', 'purple'], // Hover colors for each category
      },
    ],
}

const options = {
    responsive:true,
    cutout: 80,
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function CategoriesOverviewGraph(){
    return (
        <Container>
            <TitleAndSubTitle title={"Categories overview"} subTitle={"Per year"} />
            <Content>
                <GraphContainer>
                    <Doughnut data={data} options={options}/>
                </GraphContainer>
                <LegendContainer>
                    <LegendBox name={"women"} value={"153$"} percentageChange={"+45%"}/>
                    <LegendBox name={"men"} value={"453$"} percentageChange={"-45%"}/>
                    <LegendBox name={"children"} value={"4453$"} percentageChange={"+35%"}/>
                </LegendContainer>
            </Content>
        </Container>
    )
}


const LegendBoxContainer = styled.div`
background-color:#F1F4F9;
padding:.5rem 1rem;
width:100%;
display:flex;
flex-direction: column;
align-items: flex-start;
font-size:var(--small-1);
gap:2px;
border-radius:6px;
`
const LegendKey = styled.div`
gap:.5rem;
display: flex;
align-items: center;
`
const ColoredCircle = styled.div`
border-radius: 50%;
width:5px;
height:5px;
background-color: red;
`
const LegendValue = styled.div`
font-weight:600;
display: flex;
gap:.5rem;
`
const PercentageChange = styled.p`
color:green;
`
function LegendBox({name , value , percentageChange, color}){
    return (
        <LegendBoxContainer>
            <LegendKey>
                <ColoredCircle />       
                <p>{name}</p>              
            </LegendKey>
            <LegendValue>
                <p>{value}</p>
                <PercentageChange>{percentageChange}</PercentageChange>
            </LegendValue>
        </LegendBoxContainer>
    )
}