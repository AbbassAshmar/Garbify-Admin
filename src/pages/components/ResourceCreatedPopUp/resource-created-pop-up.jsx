import styled from "styled-components";
import ReactDOM from 'react-dom';
import {useNavigate} from "react-router-dom";
import useClickOutside from "../../../hooks/use-click-outside";
import { useRef } from "react";

const BGWrapper = styled.div`
background-color: rgba(0,0,0,0.25);
display: flex;
align-items: center;
justify-content: center;
position: fixed;
z-index:200;
height:100vh;
top:0;
width:100%;
`

const Container = styled.div`
display: flex;
flex-direction: column;
padding:2rem;
gap:2rem;
align-items: flex-start;
border-radius: 6px;
background-color:white;
`

const Header = styled.div`
justify-content: flex-start;
align-items: center;
gap:1rem;
display: flex;
`
const SuccessWord = styled.h5`
font-weight:600;
color:var(--main-color);
font-size:var(--heading-5);
`
const TextMessage = styled.p`
font-size:var(--body);
color : #A8AAAE;
font-weight:500;
max-width: 350px;
`
const ButtonsContainer = styled.div`
justify-content: flex-start;
align-items: center;
gap:1rem;
display: flex;
`
const ViewCategoriesButton = styled.button`
font-size:var(--body);
font-weight:600;
background-color: var(--main-color);
padding:.5rem 1rem;
color:white;
border-radius: 4px;
border:none;
cursor: pointer;
transition: background-color .3s;
&:hover{
    background-color:#009BCC;
}
`
const ContinueButton = styled.button`
border:none;
cursor: pointer;
font-size:var(--body);
font-weight:600;
background-color: var(--secondary-color);
padding:.5rem 1rem;
color:#A8AAAE;
border-radius: 4px;
transition: background-color .3s;
&:hover{
    background-color: #dddddd;
}
`

export default function ResourceCreatedPopUP({show, setShow, message, redirect, button}){
    const navigate = useNavigate();
    const popUpRef = useRef();

    function handleClosePopUp(){
        setShow(true);
    }

    function handleViewCategoriesButtonClick(e){
        navigate(redirect);
    }

    useClickOutside([popUpRef],show,()=>{
        setShow(false);
    })

    return(
        <>
            {ReactDOM.createPortal(
                <BGWrapper>
                    <Container ref={popUpRef}>
                        <Header>
                            <CheckCircle />
                            <SuccessWord>Success</SuccessWord>
                        </Header>
                        <TextMessage>{message}</TextMessage>
                        <ButtonsContainer>
                            <ViewCategoriesButton onClick={handleViewCategoriesButtonClick}>{button}</ViewCategoriesButton>
                            <ContinueButton onClick={handleClosePopUp}>Continue</ContinueButton>
                        </ButtonsContainer>
                    </Container>
                </BGWrapper>,document.body
            )}
        </>
    )
}

const CheckCircle = ({size=60, color="#00C2FF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);