import styled from "styled-components";
import IncreaseIcon from "../../../../../components/IncreaseIcon/increase-icon";
import DecreaseIcon from "../../../../../components/DecreaseIcon/decrease-icon";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto' 
import { useEffect, useState } from "react";

import useUserState from "../../../../../hooks/use-user-state";
import useSendRequest from "../../../../../hooks/use-send-request";

const Container = styled.div`
gap:2rem;
display:flex;
padding:2rem;
background:white;
align-items:center;
border-radius: 6px;
justify-content:space-between;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`
const StatIconContainer = styled.div`
gap:1rem;
display:flex;
align-items:flex-starts;
flex-direction:column;
`
const IconContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:40px;
height:40px;
background:${({$color})=>$color};
border-radius: 50%;
`
const Icon = styled.i`
color:${({$color})=>$color};
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

const PercentageChange = styled.div`
font-weight:600;
display:flex;
align-items:center;
gap:.25rem;
align-self:flex-end;
`

const LineWrapper = styled.div`
width:100px;
height:50px;
transform:translateY(10px);
`

//  /revenue/variablity?timeSpan=month, timeSpan=day, timeSpan=year, 

// /profit/variability

// /orders/variablity

// /clients/variability



const chartOptions = {
    scales: {
        x: {display: false},
        y: {display: false},
    },
    plugins: {
        legend:{display: false},
    },
};

export default function StatisticsBox({value, name, iconClass, color, endpoint}){
    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [variability, setVariability] = useState([89,120,89,111]);
    const [percentageChange, setPercentageChange] = useState(0);


    async function getVariability(){
        const {request, response} = await sendRequest(endpoint);

        if (request?.status == 200){
            const variabilityArr= response.data.variability;
            setVariability(variabilityArr);

            if (variabilityArr.length == 0){
                setVariability(0)
            }
            
            if (variabilityArr.length == 1){
                setVariability(variabilityArr[0])
            }

            if (variabilityArr.length >= 2){
                const precentChange = ((variabilityArr[-1] - variabilityArr[-2]) /variabilityArr[-2])* 100;
                setPercentageChange(precentChange)
            }
        }
    }

    useEffect(()=>{
        getVariability();
    },[])


    const chartData = {
        labels: [ 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: variability,
                fill: false,
                borderColor: `rgb(${color})`,
                tension: 0.4,
            },
        ],
    };


    const renderPercentageChange = ()=>{
        if (percentageChange < 0){
            return (
                <>
                    <DecreaseIcon /> 
                    <p>{`-${percentageChange}%`}</p>
                </>
            )
        }

        return (
            <>
                <IncreaseIcon />
                <p>{`+${percentageChange}%`}</p>
            </>
        )
    }

    return (
        <Container>
            <StatIconContainer>
                <IconContainer $color={`rgba(${color},0.2)`}>
                    <Icon $color={`rgba(${color},1)`} className={iconClass}/>
                </IconContainer>
                <Stats>
                    <Value>{value}</Value>
                    <Name>{name}</Name>
                </Stats>        
            </StatIconContainer>
            <LineContainer>
                <PercentageChange>
                    {renderPercentageChange()}
                </PercentageChange>
                <LineWrapper>
                    <Line  data={chartData} options={chartOptions} />
                </LineWrapper>
            </LineContainer>
        </Container>
    )
}