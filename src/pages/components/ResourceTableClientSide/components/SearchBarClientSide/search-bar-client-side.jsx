import styled from "styled-components";
import { useState } from "react";

const SearchBarContainer = styled.form`
position:relative;
width:30%;
`
const SearchInput = styled.input`
width:100%;
font-weight:400;
border-radius:6px;
transition:border .3s;
font-size: var(--small-1);
padding:.5rem 2.5rem .5rem 1rem;
border:2px solid var(--secondary-color);
&::placeholder{
    font-weight:400;
    color:#A8AAAE;
}
&:focus {
    outline: none;
    border:2px solid var(--main-color);
}
`
const SearchIcon = styled.i`
right:1rem;
top:.6rem;
color:grey;
position:absolute;
font-size: var(--small-1);
margin-top: 1px;
${SearchInput}:focus + &{
    color:var(--main-color);
}
`

export default function SearchBarClientSide({setSearchValue,setPageNumber}){

    function handleSearchInputChange(e){
        setPageNumber(1);
        setSearchValue(e.currentTarget.value);
    }


    return(
        <SearchBarContainer onSubmit={(e)=>e.preventDefault()}> 
            <SearchInput onChange={handleSearchInputChange} name="q" type="text" placeholder="Search..."/>
            <SearchIcon className="fa-solid fa-magnifying-glass" />
        </SearchBarContainer>
    )
}