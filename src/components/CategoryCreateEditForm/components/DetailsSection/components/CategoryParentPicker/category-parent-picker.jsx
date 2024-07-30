import { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../../../../../../components/Input/input";
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
export default function CategoryParentPicker({errors,formData, setFormData, isEditing}){
    const [categories, setCategories] = useGetCategories("nested");

	const [currentPath, setCurrentPath] = useState(['categories']);
	const [selectedPath,setSelectedPath] = useState('');

	const [currentCategory,setCurrentCategory] = useState({display_name:"categories", id : -1, children: []});
  	const [categoriesHistory,setCategoriesHistory] = useState([]);

    useEffect(()=>{
        if (isEditing){
            removeSelectedCategoryFromCategories({id : -1, children : categories});
        }
    },[categories])

    useEffect(()=>{
        if (formData['parent_id'] != '' && isEditing){
            findSelectedPath();
        }
    },[formData, categories])

    useEffect(()=>{
        if (currentCategory?.display_name == "categories" && currentCategory?.children?.length == 0)
        setCurrentCategory((prev) => ({...prev,children:categories}));
    },[categories])

    function removeSelectedCategoryFromCategories(currentCategory){
        currentCategory.children.forEach(child =>{
            if (child.id == formData.id){
                
                currentCategory = {
                    ...currentCategory, 
                    children : currentCategory.children.filter(_child => (
                        child.id !=_child.id
                    ))
                }

                setCategories([
                    ...categories.filter(_child => _child.id != currentCategory.id), 
                    currentCategory
                ])
            }
        })
    }

    function findSelectedPath(){
        function helper(category, path, history){
            if (!category) return;

            if (category.id == formData.parent_id){
                path = [...path, category.display_name];
                setCurrentPath(path);
                setSelectedPath(`/ ${path.join(" / ")}`);
                setCurrentCategory(category);
                setCategoriesHistory(history);
                return;
            }

            category.children?.forEach(child => {
                helper(child, [...path, category.display_name], [...history, category])
            })
        }

        const _categories = {display_name:"categories", id : -1, children: categories}
        helper(_categories, [], []);
    }

    function updatecurrentCategory(category){
        //add to history the old state
        setCategoriesHistory([...categoriesHistory, currentCategory]);
        // update currentCategory to children of category having id = categoryID
        setCurrentCategory(category)
		// update the path
		setCurrentPath([...currentPath,category.display_name]);
  	}

    function backButtonClick(){
        if (!categoriesHistory.length) return;

        let newCategoriesHistory = [...categoriesHistory];
        let latestInHistory = newCategoriesHistory.pop(-1)

        setCurrentCategory(latestInHistory);
        setCategoriesHistory(newCategoriesHistory);
		setCurrentPath((prev) => prev.slice(0,-1))
    }

	function handleAddHereButtonClick(){
		setFormData(prev => ({...prev, parent_id : currentCategory.id}));
		setSelectedPath(`/ ${currentPath.join(" / ")}`);
	}

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
                    {currentCategory.children.length > 0 && currentCategory.children.map(category=>(
                        <CategoryContainer key={category.id} type="button" onClick={e=>updatecurrentCategory(category)}>
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
                        <CheckBox $checked={formData.parent_id == currentCategory.id}>
                            {formData.parent_id == currentCategory.id && <i style={{fontSize:"14px", color:'var(--main-color)'}} className="fa-solid fa-check" />}
                        </CheckBox>
                    </AddHereButton>
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

