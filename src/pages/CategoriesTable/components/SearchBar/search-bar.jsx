import styled from "styled-components";
import {useSearchParams} from "react-router-dom";

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

export default function SearchBar(){
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target); 
        setSearchParams({q:data.get("q")})
    }

    return(
        <SearchBarContainer onSubmit={handleSubmit}> 
            <SearchInput name="q" type="text" placeholder="search..."/>
            <SearchIcon className="fa-solid fa-magnifying-glass" />
        </SearchBarContainer>
    )
}