import styled from "styled-components";


const PlusContainer = styled.div`
width:23px;
height:23px;
display: flex;
min-width: 23px;
cursor: pointer;
min-height: 23px;
border-radius:50%;
align-items: center;
justify-content: center;
background-color: var(--main-color);

&:hover{
    background:#009BCC;
}
`
const Plus = styled.i`
font-size: 13px;
`


export default function PlusSignCircle({onClick,style}){
    return(
        <PlusContainer onClick={onClick} style={style}>
            <Plus className="fa-solid fa-plus"/>
        </PlusContainer>
    )
}

