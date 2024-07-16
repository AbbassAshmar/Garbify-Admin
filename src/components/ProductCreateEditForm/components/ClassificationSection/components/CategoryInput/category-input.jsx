import styled from "styled-components"
import Input from "../../../../../../components/Input/input";
import { useEffect, useState } from "react";
import {CategoriesPickerContainer, BackButton, CategoryContainer ,CategoryName ,SubcategoriesCount, BackButtonAndPath,CurrentPathText, SelectedPathContainer, SelectedPathText} from "../../../../../CategoryCreateEditForm/components/DetailsSection/components/CategoryParentPicker/category-parent-picker";
import {Link} from "react-router-dom";
import useGetCategories from "../../../../../../hooks/use-get-categories";

const CategoryContainerNoHover = styled(CategoryContainer)`
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
transition: background-color .3s;
&:hover{
    background-color: rgba(0,194,255,.35);
}
`
const AngleBox = styled(CheckBox)`
background-color: transparent;
border:none;
&:hover{
    background-color: #d8dbe0;
}
`
export default function CategoryInput({errors, formData, setFormData}){
    const [categories] = useGetCategories("nested");
    const [history, setHistory] = useState([]);

	const [currentCategory,setCurrentCategory] = useState({name:"categories", id : -1, children: []});
    const [currentPath, setCurrentPath] = useState(["categories"]);
    const [selectedCategoryPath, setSelectedCategoryPath] = useState("");

    useEffect(()=>{
        setCurrentCategory((prev) => ({...prev, children:categories}))
    }, [categories])

    function updateCurrentCategory(category){
        setHistory([...history, currentCategory]);
        setCurrentCategory(category);
        setCurrentPath([...currentPath, category.display_name])
    }

    function selectCategory(category){
        setFormData(prev => ({...prev, category_id : category.id}));
        setSelectedCategoryPath([...currentPath, category.display_name]);
    }

    function backButtonClick(){
        if (!history.length) return;

        let newCategoriesHistory = [...history];
        let latestInHistory = newCategoriesHistory.pop(-1)

        setCurrentCategory(latestInHistory);
        setHistory(newCategoriesHistory);
		setCurrentPath((prev) => prev.slice(0,-1))
    }

    if (categories.length == 0) 
    return(
        <Input label={"category"} title={"Category"} errors={errors?.messages['category_id']}>
            <div style={{fontWeight:'500', color:"#A8AAAE"}}>
                <p style={{marginRight:'.5rem',display:"inline"}}>No categories to pick from.</p>
                <Link to="/categories/add" style={{textDecoration:"none",color:"var(--main-color)"}}>create now</Link>
            </div>
        </Input>
    )

    return (
        <Input label={"category"} title={"Category"} errors={errors?.messages['category_id']}>
            <CategoriesPickerContainer $error={errors?.messages['category_id']?true:false} style={{maxHeight:'50vh'}}>
                <BackButtonAndPath>
                    <BackButton disabled={!history.length} onClick={backButtonClick} type='button'>
                        <i style={{lineHeight:"16px"}} className="fa-solid fa-angle-left"/>
                        <span style={{lineHeight:"16px"}}>Back</span>
                    </BackButton>  
                    <CurrentPathText>/ {currentPath.join(" / ")}</CurrentPathText>
                </BackButtonAndPath>
                {currentCategory.children.length > 0 && currentCategory.children.map(category=>(
                    <CategoryContainerNoHover key={category.id} type="button">
                        <div style={{display:'flex',gap:'1rem', alignItems:"center"}}>
                            <CategoryName>{category.display_name}</CategoryName>
                            <SubcategoriesCount>({category.children.length} subcategories)</SubcategoriesCount>
                        </div>
                        <div style={{display:'flex',gap:'.25rem', alignItems:"center"}}>
                            <CheckBox onClick={()=>selectCategory(category)} $checked={category.id == formData.category_id}>
                                {category.id == formData.category_id && <i style={{fontSize:"14px", color:'var(--main-color)'}} className="fa-solid fa-check" />}
                            </CheckBox>
                            {category.children.length > 0 &&(
                                <AngleBox onClick={()=>updateCurrentCategory(category)}>
                                    <i className="fa-solid fa-angle-right"/>
                                </AngleBox>
                            )}
                        </div>
                    </CategoryContainerNoHover>
                ))}      
            </CategoriesPickerContainer>
            <SelectedPathContainer>
                <p>Selected Category</p>
                <SelectedPathText>
                    {selectedCategoryPath.length > 0 ? 
                        `/ ${selectedCategoryPath.join(" / ")}` : 
                        'not chosen yet'
                    }
                </SelectedPathText>
            </SelectedPathContainer>
        </Input>
    )
}