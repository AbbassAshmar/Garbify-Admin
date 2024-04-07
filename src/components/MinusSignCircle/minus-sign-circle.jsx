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
background-color: red;

&:hover{
    background:darkred;
}
`
const Plus = styled.i`
font-size: 13px;
margin-top:1.5px;
`


export default function MinusSignCircle({onClick,style}){
    return(
        <PlusContainer onClick={onClick} style={style}>
            <Plus className="fa-solid fa-minus"/>
        </PlusContainer>
    )
}

