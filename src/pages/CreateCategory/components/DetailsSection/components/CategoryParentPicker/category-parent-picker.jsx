import { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../../../../../../components/Input/input";
import { NestedCategories } from "../../../../../../dummy_data";
import useGetCategories from "../../../../../../hooks/use-get-categories";

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

export const CategoriesPickerContainer = styled.div`
gap:1.25rem;
padding:0 1.25rem 1.25rem 1.25rem;
display: flex;
flex-direction:column;
border-radius: 6px;
align-items: flex-start;
border:2px solid ${({$error}) => $error ? 'red' : 'var(--secondary-color)'};
max-height: 80vh;
overflow-y: auto;
`
export const BackButtonAndPath = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
padding-top:1.25rem;
padding-bottom: .5rem;
gap:.5rem;
flex-wrap: wrap;
position: sticky;
top:0;
background-color: white;
width: 100%;
`
export const CurrentPathText = styled.p`
font-weight:500;
color : #A8AAAE;
font-size:var(--small-1);
`
export const BackButton = styled.button`
gap:.25rem;
border: none;
display: flex;
cursor: pointer;
font-weight:500;
align-items: center;
font-size:var(--body);
background-color: white;
`
export const CategoryContainer = styled.button`
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
export const CategoryName = styled.p`
font-size:var(--body);
font-weight:500;
`
export const SubcategoriesCount = styled.p`
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
export const SelectedPathContainer = styled.div`
gap:.5rem;
display: flex;
font-weight:600;
font-size:var(--body);
flex-direction: column;
padding-top:1rem;
`
export const SelectedPathText = styled.div`
font-weight:500;
color : #A8AAAE;
font-size:var(--small-1);
width: fit-content;
border-bottom: 2px solid var(--secondary-color);
`
export default function CategoryParentPicker({formResetClicked, errors}){
    const [categories, setCategories] = useGetCategories("nested");
	const [categoryParentID, setCategoryParentID] = useState(""); 

	const [currentPath, setCurrentPath] = useState(['categories']);
	const [selectedPath,setSelectedPath] = useState('');

	const [currentCategories,setCurrentCategories] = useState({display_name:"categories", id : -1, children: []});
  	const [categoriesHistory,setCategoriesHistory] = useState([]);

	useEffect(()=>{
        setCurrentCategories((prev) => ({...prev,children:categories}));
    },[categories])

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
		setCurrentPath([...currentPath,category.display_name]);
  	}

    function backButtonClick(){
        if (!categoriesHistory.length) return;

        let newCategoriesHistory = [...categoriesHistory];
        let latestInHistory = newCategoriesHistory.pop(-1)

        setCurrentCategories(latestInHistory);
        setCategoriesHistory(newCategoriesHistory);
		setCurrentPath((prev) => prev.slice(0,-1))
    }

	function handleAddHereButtonClick(){
		setCategoryParentID(currentCategories.id);
		setSelectedPath(`/ ${currentPath.join(" / ")}`);
	}

    useEffect(()=>{
        console.log(currentCategories)
    },[currentCategories])

    return(
        <Container>
            <TextContainer>
                <Title>Parent Category</Title>
                <Subtitle>Decide the categorie’s position in the heirarchy</Subtitle>
            </TextContainer>
            <Content>
                <CategoriesPickerContainer>
					<BackButtonAndPath>
						<BackButton disabled={!categoriesHistory.length} onClick={backButtonClick} type='button'>
							<i style={{lineHeight:"16px"}} className="fa-solid fa-angle-left"/>
							<span style={{lineHeight:"16px"}}>Back</span>
						</BackButton>
						<CurrentPathText>/ {currentPath.join(" / ")}</CurrentPathText>
					</BackButtonAndPath>
                    {currentCategories.children.length > 0 && currentCategories.children.map(category=>(
                        <CategoryContainer key={category.id} type="button" onClick={e=>updateCurrentCategories(category)}>
                            <div style={{display:'flex',gap:'1rem', alignItems:"center"}}>
                                <CategoryName>{category.display_name}</CategoryName>
                                <SubcategoriesCount>({category.children?.length} subcategories)</SubcategoriesCount>
                            </div>
                            <i className="fa-solid fa-angle-right"/>
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
                </CategoriesPickerContainer>
				{errors?.messages['parent_id'] && <ErrorMessage>{errors.messages['parent_id']}</ErrorMessage>}
				<SelectedPathContainer>
					<p>Selected parents</p>
					<SelectedPathText>
						{selectedPath || 'not chosen yet'}
					</SelectedPathText>
				</SelectedPathContainer>
            </Content>
        </Container>
    )
}

