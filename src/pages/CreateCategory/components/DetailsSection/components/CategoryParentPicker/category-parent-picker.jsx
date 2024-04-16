import { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../../../../../../components/Input/input";

const Container = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`
const TextContainer = styled.div`
gap:.5rem;
display: flex;
flex-direction: column;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Subtitle = styled.p`
color : #A8AAAE;
font-weight:500;
font-size:var(--body);
max-width:270px;
`
const Content = styled.div`
gap:1rem;
display: flex;
flex-direction:column;
`
const CurrentPath = styled.p`
font-weight:500;
color : #A8AAAE;
font-size:var(--small-1);
`
const CategoriesList = styled.div`
gap:1.25rem;
padding:1.25rem;
display: flex;
flex-direction:column;
border-radius: 6px;
align-items: flex-start;
border:2px solid var(--secondary-color);
`
const BackButton = styled.button`
gap:.25rem;
border: none;
display: flex;
cursor: pointer;
font-weight:500;
align-items: center;
font-size:var(--body);
background-color: white;
`
const CategoryContainer = styled.button`
width: 100%;
border:none;
display: flex;
cursor: pointer;
border-radius: 4px;
align-items: center;
padding: .5rem 1rem;
justify-content: space-between;
transition: background-color .3s;
background-color: var(--secondary-color);
&:hover{
	background-color: #d8dbe0;
}
`
const CategoryName = styled.p`
font-size:var(--body);
font-weight:500;
`
const SubcategoriesCount = styled.p`
color:#B2B4B8;
font-weight:500;
font-size:var(--small-1);
`
const AddHereButton = styled.button`
width:100%;
display: flex;
cursor: pointer;
border-radius:6px;
font-size:var(--body);
font-weight:500;
align-items: center;
background-color: white;
border:2px solid #d8dbe0;
justify-content: space-between;
padding: .5rem .6rem .5rem 1rem;
transition: background-color .3s;
&:hover{
	background-color: var(--secondary-color);
}
`
const CheckBox = styled.div`
width:22px;
height:22px;
display: flex;
align-items: center;
justify-content: center;
border-radius:4px;
background-color: ${({$checked})=> ($checked? 'rgba(0,194,255,.35)':"white")};
border: ${({$checked})=> ($checked? '' : '2px solid #d8dbe0')};
`
const SelectedParentsContainer = styled.div`
gap:.5rem;
display: flex;
font-weight:600;
font-size:var(--body);
flex-direction: column;
padding-top:1rem;
`
const SelectedParents = styled.div`
font-weight:500;
color : #A8AAAE;
font-size:var(--small-1);
width: fit-content;
border-bottom: 2px solid var(--secondary-color);
`
export default function CategoryParentPicker({formResetClicked, errors}){
	const [path, setPath] = useState(['categories']);
	const [selectedPath,setSelectedPath] = useState('');

	const [currentCategories,setCurrentCategories] = useState({name:"categories", id : -1, children: Categories.categories});
    const [categoriesHistory,setCategoriesHistory] = useState([]);

	// sent with the create request 
	const [categoryParentID, setCategoryParentID] = useState(""); 
	
	useEffect(()=>{
		if (formResetClicked)
		setCategoryParentID("");
	}, [formResetClicked])

    function updateCurrentCategories(category){
        //add to history the old state
        setCategoriesHistory([...categoriesHistory, currentCategories]);
        // update currentCategories to children of category having id = categoryID
        setCurrentCategories(category)
		// update the path
		setPath([...path,category.name]);
    }

    function backButtonClick(){
        if (!categoriesHistory.length) return;
        let newCategoriesHistory = [...categoriesHistory];
        let latestInHistory = newCategoriesHistory.pop(-1)
        setCurrentCategories(latestInHistory);
        setCategoriesHistory(newCategoriesHistory);
		setPath(path.slice(0,-1))
    }

	function handleAddHereButtonClick(){
		setCategoryParentID(currentCategories.id);
		setSelectedPath(`/ ${path.join(" / ")}`);
	}

    return(
        <Container>
            <TextContainer>
                <Title>Parent Category</Title>
                <Subtitle>Decide the categorie’s position in the heirarchy</Subtitle>
            </TextContainer>
            <Content>
                <CurrentPath>/ {path.join(" / ")}</CurrentPath>
                <CategoriesList>
                    <BackButton disabled={!categoriesHistory.length} onClick={backButtonClick} type='button'>
						<i style={{lineHeight:"16px"}} className="fa-solid fa-angle-left"/>
						<span style={{lineHeight:"16px"}}>Back</span>
                    </BackButton>
                    {currentCategories.children.length > 0 && currentCategories.children.map(category=>(
                        <CategoryContainer key={category.id} type="button" onClick={e=>updateCurrentCategories(category)}>
                            <div style={{display:'flex',gap:'1rem', alignItems:"center"}}>
                                <CategoryName>{category.name}</CategoryName>
                                <SubcategoriesCount>({category.children.length} subcategories)</SubcategoriesCount>
                            </div>
                            {category.children.length > 0 && <i className="fa-solid fa-angle-right"/>}
                        </CategoryContainer>
                    ))}
                    <AddHereButton onClick={handleAddHereButtonClick} type="button">
                        <div style={{display:'flex', gap:".5rem"}}>
                            <i style={{lineHeight:"16px"}} className="fa-solid fa-plus"/>
                            <p style={{lineHeight:"16px"}}>Add here</p>
                        </div>
                        <CheckBox $checked={categoryParentID == currentCategories.id}>
                            {categoryParentID == currentCategories.id && <i style={{fontSize:"14px", color:'var(--main-color)'}} className="fa-solid fa-check" />}
                        </CheckBox>
                    </AddHereButton>
					<input name="parent_id" type="hidden" value={categoryParentID} style={{width:'.2px', position:"absolute"}} />
                </CategoriesList>
				{errors?.messages['parent_id'] && <ErrorMessage>{errors.messages['parent_id']}</ErrorMessage>}
				<SelectedParentsContainer>
					<p>Selected parents</p>
					<SelectedParents>
						{selectedPath || 'not chosen yet'}
					</SelectedParents>
				</SelectedParentsContainer>
            </Content>
        </Container>
    )
}

const Categories ={
    categories: [
      {
        id: 1,
        name: "Men",
        parent_id: null,
        children: [
          {
            id: 2,
            name: "Sports",
            parent_id: 1,
            children: [
              {
                id: 3,
                name: "Shoes",
                parent_id: 2,
                children: [
                  {
                    id: 4,
                    name: "Brand",
                    parent_id: 3,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 6,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 7,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 8,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
}
  