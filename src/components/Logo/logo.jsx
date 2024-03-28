import styled from "styled-components";
import logo from "../../assets/logo.png";

const Logoo = styled.img`
width:120px;
cursor:pointer;
margin:0;

@media screen and (max-width:800px){
    width:100px;
}

@media screen and (max-width:400px){
    width:90px;
}
`

export default function Logo(){
    return (
        <Logoo src={logo}/>
    )
}