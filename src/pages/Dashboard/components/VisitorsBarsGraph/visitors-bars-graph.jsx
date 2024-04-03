import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import TitleAndSubTitle from "../TitleAndSubTitle/title-and-subtitle";

const Container = styled.div`
display:flex;
flex-direction:column;
padding:2rem;
background:white;
gap:2rem;
width: 100%;
height:100%;
justify-content: space-between;
border-radius: 6px;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`

const Content = styled.div`
display:flex;
align-items: stretch;
justify-content: space-between;
gap:1rem;
`
const TextContainer = styled.div`
flex:1;
display:flex;
flex-direction: column;
justify-content: flex-end;
gap:2rem;
`


const DetailsContainer = styled.div`

`

const ClientsCount = styled.h3`
font-weight:600;
font-size:var(--heading-3);
`
const TimePeriod = styled.p`
font-size:var(--body);
font-weight:600;
color:#A8AAAE;
`
const SummaryContainer = styled.div`
display: flex;
margin-bottom: 1rem;
gap:1rem;
flex-wrap:wrap;
`
const BarGraphContainr = styled.div`
flex:1.4;
`

const data = {
    labels: ['10 Jan', '11 Jan', '12 Jan', '13 Jan', '14 Jan', '15 Jan'],
    datasets: [
        {
            label: 'New Registers',
            data: [30, 40, 50, 45, 55, 60],
            backgroundColor: 'rgba(0,194,255,1)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1 
        },
        {
            label: 'New Customers',
            data: [25, 35, 45, 40, 50, 55],
            backgroundColor: 'rgba(173,90,255,1)', 
            borderColor: 'rgba(153, 102, 255, 1)', 
            borderWidth: 1
        }
    ]
};
  
const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {display: false},
        x: {
            display: true, 
            grid: {display: false }
        }
    }
};
  
export default function VisitorsBarsGraph(){
    return(
        <Container>
            <TitleAndSubTitle title={"Visitors report"} subTitle={"Daily statistics"}/>
            <Content>
                <TextContainer>
                    <DetailsContainer>
                        <ClientsCount>+300</ClientsCount>
                        <TimePeriod>clients last 10 days</TimePeriod>
                    </DetailsContainer>
                    <SummaryContainer>
                        <StatisticSummary iconClass={"fa-solid fa-user-plus"} iconRgb={'173,90,255'} name={"registered"} value={'45%'}/>
                        <StatisticSummary iconClass={"fa-solid fa-cart-arrow-down"} iconRgb={'0,194,255'} name={"ordered"} value={'23%'}/>
                    </SummaryContainer>
                </TextContainer>
                <BarGraphContainr>
                    <Bar data={data} options={options}/>
                </BarGraphContainr>
            </Content>
        </Container>
    )
}


const StatisticSummaryContainer = styled.div`
gap:1rem;
display:flex;
align-items:flex-end;
`

const SummaryIconContainer = styled.div`
width:30px;
height:30px;
display:flex;
align-items: center;
justify-content: center;
border-radius: 4px;
background-color:${({$backgroundColor}) => $backgroundColor};
`

const SummaryIcon = styled.i`
color:${({$color}) => $color};
`

const SummaryNameValue = styled.div`
display: flex;
flex-direction: column;
align-items:flex-start;
`

const SummaryName = styled.p`
color: #A8AAAE;
font-size:var(--small-1);
font-weight:600;
`

const SummaryValue = styled.p`
color: black;
font-size:var(--small-1);
font-weight:600;
`
function StatisticSummary({iconClass,iconRgb,name,value}){
    return(
        <StatisticSummaryContainer>
            <SummaryIconContainer $backgroundColor={`rgba(${iconRgb},0.4)`}>
                <SummaryIcon className={iconClass} $color={`rgba(${iconRgb},1)`}/>
            </SummaryIconContainer>
            <SummaryNameValue>
                <SummaryName>{name}</SummaryName>
                <SummaryValue>{value}</SummaryValue>
            </SummaryNameValue>
        </StatisticSummaryContainer>
    )
}