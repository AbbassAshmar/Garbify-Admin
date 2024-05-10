import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SuccessOrErrorPopUp from "../../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import SearchBar from "../../CategoriesTable/components/SearchBar/search-bar";
import DefaultPageHeader from "../DefaultPageHeader/default-page-header";
import useUserState from "../../../hooks/use-user-state";
import useSendRequest from "../../../hooks/use-send-request";
import { Products } from "../../../dummy_data";

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
cursor: pointer;

&:nth-child(5){
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
cursor: pointer;
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


export default function ResourceTable({resourceName, endpointURL, headers, columnsWidths, renderRow, sortingMethods, dummyData, resource, setResource}){
    const [sortBy, setSortBy] = useState(['','']);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchValue,setSearchValue] = useState("");

    const userState = useUserState();
    const {sendRequest, serverError} = useSendRequest(userState);
    const [resultPopUp, setResultPopUp] = useState({show:false,status:"",message:""});

    useEffect(()=>{
        fetchResource();
    },[])

    const filteredResource = resource.filter(element => {
        const elementName = element.name.toLowerCase();
        const searchValueLowerCase = searchValue.toLowerCase();

        return [...searchValueLowerCase].every(letter => elementName.includes(letter));
    }).sort(compare(sortBy[0], sortBy[1]));

    const CATEGORIES_PER_PAGE = 10;
    const TOTAL_PAGES = Math.ceil(filteredResource.length / CATEGORIES_PER_PAGE);;
    const CATEGORIES_START_INDEX = CATEGORIES_PER_PAGE*(pageNumber-1);
    const CATEGORIES_END_INDEX = CATEGORIES_START_INDEX + CATEGORIES_PER_PAGE;
    
    async function fetchResource(){
        const {request, response} = await sendRequest(endpointURL);

        if (request?.status == 200){
            setResource(response.data[resourceName]);
        }

        if (request && !request.ok) {
            setResultPopUp({
                show: true,
                status: 'Error',
                message: response.error.message,
            });
        }

        // if failure or server down, add the removed category back
        if (!request || !request.ok){
            setResource(dummyData);
        }
    }

    function handleSortByClick(header){
        if (header == sortBy[0]){
            setSortBy([header, (sortBy[1] == "ASC" ? "DESC" : "ASC")]);
        }else{
            setSortBy([header, "ASC"]);
        }
    }

    function handleShowPreviousPage(e){
        if (pageNumber > 1)
        setPageNumber(pageNumber-1)
    }

    function handleShowNextPage(e){
        if (pageNumber < TOTAL_PAGES)
        setPageNumber(pageNumber+1)
    }

    function comparisonFactor(factor){
        let factors = sortingMethods || { "" : (a,b) => 0};
        return factors[factor];
    }

    function compare(property, direction){
        let sortDirection = direction === "ASC" ? 1 : -1;

        return (a,b) =>{
            let result = comparisonFactor(property);
            return result(a,b) * sortDirection;
        }
    }

    return(
        <>
            <SuccessOrErrorPopUp serverError={serverError} outerSettings={resultPopUp} setOuterSettings={setResultPopUp}/>
            <DefaultPageHeader title={`All ${resourceName}`}>
                <Content>   
                    <ContentHeader>
                        <SearchBar setPageNumber={setPageNumber} searchValue={searchValue} setSearchValue={setSearchValue} />
                        <AddCategoryButton to={`/${resourceName}/add`}><span style={{fontSize:"1.5rem"}}>+</span> Add {resourceName}</AddCategoryButton>
                    </ContentHeader>
                    <ContentBody>
                        <Table>
                        <colgroup>
                            {columnsWidths.map((width, index) => (
                                <col key={index} style={{width:width}} />
                            ))}
                        </colgroup>
                        <TableHeaders>
                            <TableRow>
                                {headers.map((header,index) =>(
                                    <TableHeader onClick={(e)=>handleSortByClick(header)} key={index}>
                                        <TableHeaderContent>
                                            <p style={{lineHeight:"1rem"}}>{header}</p>
                                            <SortIcon 
                                            $rotate={sortBy[0] === header ? (sortBy[1] === "ASC" ? "0" : "180deg") : "0"}
                                            $color={sortBy[0] === header ? "black":"var(--secondary-color)"} 
                                            className="fa-solid fa-sort-up"/>                                       
                                        </TableHeaderContent>
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHeaders>
                        <tbody>
                            {filteredResource?.slice(CATEGORIES_START_INDEX,CATEGORIES_END_INDEX).map(renderRow)}
                        </tbody>
                        </Table>
                    </ContentBody>
                    <ContentFooter>
                        <PaginationContainer>
                            {pageNumber > 1 && <PageBox onClick={handleShowPreviousPage}><i className="fa-solid fa-angle-left"/></PageBox> }
                            {pageNumber > 1 && <PageBox onClick={handleShowPreviousPage}>{pageNumber - 1}</PageBox>}
                            <PageBox style={{background:"var(--main-color)"}}>{pageNumber}</PageBox>
                            {pageNumber < TOTAL_PAGES && <PageBox onClick={handleShowNextPage}>{pageNumber + 1}</PageBox>}
                            {pageNumber < TOTAL_PAGES && <PageBox onClick={handleShowNextPage}><i className="fa-solid fa-angle-right"/></PageBox> }
                        </PaginationContainer>
                    </ContentFooter>
                </Content>
            </DefaultPageHeader>
        </>
    )

}