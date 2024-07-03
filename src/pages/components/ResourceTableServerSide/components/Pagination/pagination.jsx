import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const PaginationContainer = styled.div`
gap:1rem;
display: flex;
`
const PageBox = styled.button`
height:32px;
width:32px;
background-color: var(--secondary-color);
display: flex;
align-items: center;
justify-content: center;
font-size: var(--body);
font-weight: 500;
border:none;
border-radius:4px;
cursor: pointer;
transition:background-color .3s;
&:hover{
    background-color: var(--secondary-text);
}
`

export default function Pagination({totalPages}){
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] =useState(searchParams.get("page")?parseInt(searchParams.get("page")):1)

    useEffect(()=>{
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);  
    },[pageNumber])

    useEffect(()=>{
        let page = parseInt(searchParams.get('page'));
        if (page && pageNumber != page) setPageNumber(page);
    },[searchParams])

    function handleShowPreviousPage(e){
        if (pageNumber > 1)
        setPageNumber(pageNumber-1);
    }

    function handleShowNextPage(e){
        if (pageNumber < totalPages)
        setPageNumber(pageNumber+1);
    }


    return(
        <PaginationContainer>
            {pageNumber > 1 && <PageBox onClick={handleShowPreviousPage}><i className="fa-solid fa-angle-left"/></PageBox> }
            {pageNumber > 1 && <PageBox onClick={handleShowPreviousPage}>{pageNumber - 1}</PageBox>}
            <PageBox style={{background:"var(--main-color)"}}>{pageNumber}</PageBox>
            {pageNumber < totalPages && <PageBox onClick={handleShowNextPage}>{pageNumber + 1}</PageBox>}
            {pageNumber < totalPages && <PageBox onClick={handleShowNextPage}><i className="fa-solid fa-angle-right"/></PageBox> }
        </PaginationContainer>
    )
}