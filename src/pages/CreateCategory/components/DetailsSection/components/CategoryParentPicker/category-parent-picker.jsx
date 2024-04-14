import { useEffect, useState } from "react";
import styled from "styled-components";

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
max-width:250px;
`
const Content = styled.div`
gap:1rem;
display: flex;
flex-direction:column;
`
const CurrentPath = styled.p`
font-weight:500;
color : #A8AAAE;
font-size:var(--body);
`
const CategoriesList = styled.div`
gap:1rem;
padding:2rem;
display: flex;
flex-direction:column;
align-items: flex-start;
border:2px solid var(--secondary-color);
`
const BackButton = styled.button`
border: none;
font-weight:500;
cursor: pointer;
background-color: white;
`
const CategoryContainer = styled.button`
width: 100%;
display: flex;
cursor: pointer;
border-radius: 4px;
align-items: center;
padding: .25rem .5rem;
justify-content: space-between;
background-color: var(--secondary-color);
`
const AddHereButton = styled.button`
width:100%;
display: flex;
cursor: pointer;
border-radius:6px;
align-items: center;
background-color: white;
border:2px solid #D0D3D8;
justify-content: space-between;
padding:.25rem;
`
export default function CategoryParentPicker(){
    const [isChecked, setIsChecked] = useState(false);
    const [categories,setCategories] = useState(Categories.categories);
    const [currentCategories,setCurrentCategories] = useState(Categories.categories);

    const [categoriesHistory,setCategoriesHistory] = useState([]);

    useEffect(()=>{console.log(currentCategories)},[currentCategories])

    function updateCurrentCategories(category){
        //add to history the old state
        setCategoriesHistory([...categories, currentCategories]);
        // update currentCategories to children of category having id = categoryID
        setCurrentCategories(category.children)

    }

    function backButtonClick(){
        let newCategoriesHistory = [...categoriesHistory];
        let latestInHistory = newCategoriesHistory.pop(-1)
        setCurrentCategories(latestInHistory);
        setCategoriesHistory(newCategoriesHistory);
    }

    return(
        <Container>
            <TextContainer>
                <Title>ParentCategory</Title>
                <Subtitle>Decide the categorie’s position in the heirarchy</Subtitle>
            </TextContainer>
            <Content>
                <CurrentPath>/ men / women</CurrentPath>
                <CategoriesList>
                    <BackButton onClick={backButtonClick} type='button'>- back</BackButton>
                    {currentCategories.length && currentCategories.map(category=>(
                        <CategoryContainer type="button" onClick={e=>updateCurrentCategories(category)}>
                            <div style={{display:'flex',gap:'.5rem', alignItems:"center"}}>
                                <p>{category.name}</p>
                                <p>({category.children.length} subcategories)</p>
                            </div>
                            <i className="fa-solid fa-angle-right"/>
                        </CategoryContainer>
                    ))}
                    <AddHereButton type="button">
                        <div style={{display:'flex', gap:".5rem"}}>
                            <i className="fa-solid fa-plus"/>
                            <p>Add here</p>
                        </div>
                        <div style={{width:'22px', height:'22px', borderRadius:"4px",border:'2px solid black'}}>
                            {isChecked && (
                                <i className="fa-solid fa-check" />
                            )}
                        </div>
                    </AddHereButton>
                </CategoriesList>
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
  