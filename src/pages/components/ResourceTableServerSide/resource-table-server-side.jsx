import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SuccessOrErrorPopUp from "../../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import DefaultPageHeader from "../DefaultPageHeader/default-page-header";
import useUserState from "../../../hooks/use-user-state";
import useSendRequest from "../../../hooks/use-send-request";
import SearchBarServerSide from "./components/SearchBarServerSide/search-bar-server-side";
import Pagination from "./components/Pagination/pagination";

const Content = styled.div`
gap:2rem;
width: 100%;
padding:2rem;
display: flex;
overflow: auto;
border-radius: 6px;
align-items: flex-start;
flex-direction: column;
background-color: white;
`

const ContentHeader = styled.div`
width: 100%;
display: flex;
align-items: stretch;
justify-content: space-between;
`

const AddCategoryButton = styled(Link)`
border:2px solid var(--main-color);
color:var(--main-color);
font-weight:600;
font-size:var(--body);
text-decoration:none;
padding:0 1rem;
border-radius: 4px;
background-color: white;
display: flex;
align-items: center;
gap: .5rem;
cursor: pointer;
transition:background-color .3s, color .3s;
&:hover{
    background-color: var(--main-color);
    color:white;
}
`

const ContentBody = styled.div`
overflow: auto;
width:100%;
`
////// table ---------------------------

const Table = styled.table`
border-collapse: collapse;
table-layout: fixed;
border-spacing: 0 0 0 2rem;
width:100%;
min-width: 850px;
overflow: hidden;
`

const TableHeaders = styled.thead`
border-bottom: 2px solid #F1F4F9;
width:100%;
`;

const TableRow = styled.tr`
border-bottom: 2px solid #F1F4F9;
padding:2rem 0;
width:100%;
`;

const SortIcon = styled.i`
color:${({$color})=>$color};
transform:translateY(3px);
rotate:${({$rotate})=>$rotate};
transition:rotate .3s, color .3s;
`

const TableHeader = styled.th`
padding:1rem 1rem 2rem 0;
text-align: left;
cursor: ${({$cursor}) => $cursor};

&:last-child(5){
    padding:1rem 0 2rem 0;
}

&:hover ${SortIcon}{
    color:black;
}
`
const TableHeaderContent = styled.div`
gap:8px;
display: flex;
align-items: center;
/* cursor: pointer; */
&:hover ${SortIcon}{
    color:black;
}
`

// Content footer 

const ContentFooter = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
`

export default function ResourceTableServerSide({resourceName, endpointURL, headers, columnsWidths, renderRow, sortingDictionary, resource, setResource}){
    const [sortBy, setSortBy] = useState(['','']);
    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);

    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(2);

    useEffect(()=>{
        fetchResource(endpointURL);
    },[searchParams])

    useEffect(()=>{
        if (sortBy[0]){
            searchParams.set("sort",`${sortingDictionary[sortBy[0]]} ${sortBy[1]}`);
            searchParams.set("page", 1);
            setSearchParams(searchParams);
        }
    },[sortBy])

    function constructURL(endpointURL, searchParams){
        let newEndpointURL = endpointURL;
        let queryStrings = "?";

        if (!searchParams.get("page")){
            queryStrings += "page=1&";
        }

        for (let key of searchParams.entries()){
            queryStrings += `${encodeURIComponent(key[0])}=${encodeURIComponent(key[1])}&`;
        }

        newEndpointURL += queryStrings.slice(0,-1);
        return newEndpointURL;
    }

    async function fetchResource(endpointURL){
        const {request, response} = await sendRequest(constructURL(endpointURL,searchParams));

        if (request?.status == 200){
            setResource(response.data[resourceName]);
            setTotalPages(response.metadata.pages_count);
        }

        if (request && !request.ok) {
            setResultPopUp({
                show: true,
                status: 'Error',
                message: response?.error?.message || "Something bad happened !",
            });
        }
    }

    function handleSortByClick(header){
        if (!sortingDictionary[header]) return;
        if (header == sortBy[0]){
            setSortBy([header, (sortBy[1] == "ASC" ? "DESC" : "ASC")]);
        }else{
            setSortBy([header, "ASC"]);
        }
    }
    
    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp}/>
            <DefaultPageHeader title={`All ${resourceName}`}>
                <Content>   
                    <ContentHeader>
                        <SearchBarServerSide />
                        <AddCategoryButton to={`/${resourceName}/add`}><span style={{fontSize:"1.5rem"}}>+</span> Add {resourceName}</AddCategoryButton>
                    </ContentHeader>
                    <ContentBody>
                        <Table>
                        <colgroup>
                            {columnsWidths.map((width, index) => (
                                <col key={index} style={{width:width,minWidth:"0"}} />
                            ))}
                        </colgroup>
                        <TableHeaders>
                            <TableRow>
                                {headers.map((header,index) =>(
                                    <TableHeader $cursor={header in sortingDictionary ? "pointer" : "text"} onClick={(e)=>handleSortByClick(header)} key={index}>
                                        <TableHeaderContent>
                                            <p style={{lineHeight:"1rem"}}>{header}</p>
                                            {header in sortingDictionary && <SortIcon 
                                            $rotate={sortBy[0] === header ? (sortBy[1] === "ASC" ? "0" : "180deg") : "0"}
                                            $color={sortBy[0] === header ? "black":"var(--secondary-color)"} 
                                            className="fa-solid fa-sort-up"/>}                                    
                                        </TableHeaderContent>
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHeaders>
                        <tbody>
                            {resource.length > 0 && resource.map(renderRow)}
                        </tbody>
                        </Table>
                    </ContentBody>
                    <ContentFooter>
                        <Pagination totalPages={totalPages}/>
                    </ContentFooter>
                </Content>
            </DefaultPageHeader>
        </>
    )

}