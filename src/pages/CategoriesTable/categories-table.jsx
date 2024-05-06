import styled from "styled-components";
import SearchBar from "./components/SearchBar/search-bar";
import { useEffect, useState } from "react";
import CategoryCardHorizontal from "./components/CategoryCardHorizontal/category-card-horizontal";
import { FlatCategories } from "../../dummy_data";
import {Link} from "react-router-dom";

const Container = styled.div`
gap:2rem;
padding:2rem;
display: flex;
flex-direction:column;
background-color: #F1F4F9;
`
const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: flex-start;
`
const HeaderText = styled.div`
display: flex;
flex-direction: column;
gap:.5rem;
`
const PageTitle = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`

const PagePath = styled.p`
font-size:var(--body);
font-weight: 600;
color : #A8AAAE;
`

const Content = styled.div`
gap:2rem;
width: 100%;
padding:2rem;
display: flex;
overflow: auto;
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

const TableContainer = styled.div`
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
const TableCell = styled.td`
text-align: left;
padding:1.5rem .5rem;
`
const SubcategoriesCell = styled.div`
padding-right:1rem;
`
const Subcategory = styled.div`
display: inline-block;
margin:1rem 1rem 0 0;
padding:.25rem .5rem;
background-color: var(--secondary-color);
font-weight:400;
color:var(--secondary-text);
border-radius: 4px;
font-size: var(--small-1);
`
const AllButton = styled.button`
display:inline;
cursor:pointer;
background-color:white;
border:none;
color:var(--main-color);
font-size:var(--small-1);
font-weight:500;
`
const ActionButton = styled.button`
border:none;
background-color: white;
font-size:var(--body);
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


const TABLE_HEADERS = ["Category","Sub categories","Total sales","Total products","Actions"];

export default function CategoriesTable(){
    const [children, setChildren] = useState({});
    const [categories, setCategories] = useState(FlatCategories);

    const [sortBy, setSortBy] = useState(['','']);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchValue,setSearchValue] = useState("");

    const CATEGORIES_PER_PAGE = 10;

    useEffect(()=>{
        let childrenObj= {};
        for (let category of categories) {
            childrenObj[category.id] = category.children.slice(0, 3);
        }
        setChildren(childrenObj);
    },[categories])
    
    let filteredCategories = categories.filter(category => {
        const categoryName = category.name.toLowerCase();
        const searchValueLowerCase = searchValue.toLowerCase();

        return [...searchValueLowerCase].every(letter => categoryName.includes(letter));
    }).sort(compare(sortBy[0], sortBy[1]));

    let TOTAL_PAGES = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);;
    let CATEGORIES_START_INDEX = CATEGORIES_PER_PAGE*(pageNumber-1);
    let CATEGORIES_END_INDEX = CATEGORIES_START_INDEX + CATEGORIES_PER_PAGE;
    
    function compareChildren(a,b){
        return (a.children.length < b.children.length) ? -1 : (a.children.length > b.children.length) ? 1 : 0;
    }
    
    function compareName(a,b){
        return (a.name[0] < b.name[0]) ? -1 : (a.name[0] > b.name[0]) ? 1 : 0;
    }

    function compareTotalSales(a,b){
        return (a.total_sales < b.total_sales) ? -1 : (a.total_sales > b.total_sales) ? 1 : 0;
    }

    function compareTotalProducts(a,b){
        return (a.total_products < b.total_products) ? -1 : (a.total_products > b.total_products) ? 1 : 0;
    }

    function comparisonFactor(factor){
        let factors = {
            "" : (a,b)=> 0,
            "Category" : compareName,
            "Total sales" : compareTotalSales,
            "Sub categories"  : compareChildren,
            "Total products" : compareTotalProducts,
        }
        
        return factors[factor];
    }

    function compare(property, direction){
        let sortDirection = direction === "ASC" ? 1 : -1;

        return (a,b) =>{
            let result = comparisonFactor(property);
            return result(a,b) * sortDirection;
        }
    }

    function handleExtendChildren(id,childrenArray){
        setChildren({...children, [id]:childrenArray});
    }

    function handleSortBy(header){
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
    
    return(
        <Container>
            <Header>
                <HeaderText>
                    <PageTitle>All Categories</PageTitle>
                    <PagePath>{location.pathname.split("/").join(" / ")}</PagePath>
                </HeaderText>
            </Header>
            <Content>   
                <ContentHeader>
                    <SearchBar setPageNumber={setPageNumber} searchValue={searchValue} setSearchValue={setSearchValue} />
                    <AddCategoryButton to={"/categories/add"}><span style={{fontSize:"1.5rem"}}>+</span> Add category</AddCategoryButton>
                </ContentHeader>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col style={{width:"35%"}}/>
                            <col style={{width:"27%"}} />
                            <col style={{width:"19%"}} />
                            <col style={{width:"19%"}} />
                            <col style={{width:"70px"}} />
                        </colgroup>
                        <TableHeaders>
                            <TableRow>
                                {TABLE_HEADERS.map((header,index) =>(
                                    <TableHeader onClick={(e)=>handleSortBy(header)} key={index}>
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
                            {filteredCategories?.slice(CATEGORIES_START_INDEX,CATEGORIES_END_INDEX).map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <CategoryCardHorizontal name={category.name} image={category.image} description={category.description} />
                                    </TableCell>
                                    <TableCell>
                                        <SubcategoriesCell>
                                            {children[category.id] && children[category.id].map((child)=>(
                                                <Subcategory key={child + category.id}>{child}</Subcategory>
                                            ))}
                                            {children[category.id] && category.children.length >3 && category.children.length != children[category.id].length &&(
                                                <AllButton onClick={(e)=> handleExtendChildren(category.id,category.children)} style={{color:"var(--main-color)", fontWeight:"500"}}>
                                                    all...
                                                </AllButton>
                                            )}
                                        </SubcategoriesCell>
                                    </TableCell>
                                    <TableCell>{category.total_sales}</TableCell>
                                    <TableCell>{category.total_products}</TableCell>
                                    <TableCell style={{textAlign:'start'}}>
                                        <ActionButton style={{marginRight:"10px"}}><i className="fa-regular fa-trash-can"/></ActionButton>
                                        <ActionButton><i className="fa-regular fa-pen-to-square"/></ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
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
        </Container>
    )
}

