import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../../../components/Input/input";
import { TextInputField } from "../../../../components/Input/input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";
import CategoryInput from "./components/CategoryInput/category-input";


const TagsInputContainer = styled.div`
cursor: text;
display: block;
flex-wrap: wrap;
width:100%;
min-height: 60px;
padding:0 0 1rem 1rem;
border-radius:6px;
transition: border .3s;
border: 3px solid ${({ $error, $isFocused }) => ($error ? 'red' : $isFocused ? 'var(--main-color)': 'var(--secondary-color)')};
`
const TagContainer = styled.span`
display: inline-block;
margin:1rem 1rem 0 0;
`
const TagInput = styled.input`
width:auto;
display:inline-block;
margin:1rem 0 0 0;
border:none;
font-size:1rem;
outline: none;
`
const Tag = styled.span`
gap:4px;
display: flex;
font-weight:500;
cursor: pointer;
padding:4px 8px;
gap:1rem;
border-radius:4px;
align-items: center;
justify-content: center;
font-size:var(--small-1);
background-color: var(--secondary-color);
&:hover{
    background-color: #c0c3c7;
}
`

const TYPE_SUBTITLE= "a hint to classify the product example 'long sleeves shirt'";
const TAGS_SUBTITLE = "tags help us categories your product";

export default function ClassificationSection({formResetClicked, errors, setFormData, formData}){
    const tagsInputFieldRef = useRef();
    
    const [isInputFocused, setInputFocused] = useState(false);
    const [tagsInputValue, setTagsInputValue] = useState("");

    useEffect(()=>{
        if (formResetClicked){
            setTagsInputValue("");
        }
    },[formResetClicked])

    function handleTagsInputContainerClick(){
        setInputFocused(true);
        tagsInputFieldRef.current.focus();
    }

    function handleTagClick(tag){
        setFormData(prev => ({...prev, tags : prev.tags.filter((t)=> t != tag)}));
    }

    function handleTagsInputChange(e){
        setInputFocused(true);
        setTagsInputValue(e.currentTarget.value);
    }

    function handleAddTag(tag){
        if (formData.tags.includes(tag)) return 
        if (!tag) return 

        setFormData(prev => ({...prev, tags : [...prev.tags, tag]}));
    }

    function handleTagsInputBlur(e){
        setInputFocused(false);
        handleAddTag(tagsInputValue);
        setTagsInputValue("");
    }

    function handleKeyDown(e){
        if (e.key === "Enter"){
            e.preventDefault();
            handleAddTag(tagsInputValue);
            setTagsInputValue("");
        }
    }

    function handleInputValueChange(e,name){
        setFormData((prev) => ({...prev, [name] : e.target.value}));
    }

    
    return (
        <FormDefaultSection title={'Classification'}>
            <Input label={"type"} title={"Type"} subtitle={TYPE_SUBTITLE} errors={errors?.messages['type']}>
                <TextInputField value={formData.type} onChange={e=>handleInputValueChange(e,'type')} $error={errors?.messages['type']} id="type" type="text" placeholder="product type"/>
            </Input>

            <CategoryInput formData={formData} setFormData={setFormData} errors={errors}/>

            <Input label={"tags"} title={"Tags"} subtitle={TAGS_SUBTITLE} errors={errors?.messages['tags']}>
                <TagsInputContainer $error={errors?.messages['tags']}  $isFocused={isInputFocused} onClick={handleTagsInputContainerClick}>
                    {formData.tags && formData.tags.map((tag)=>(
                        <TagContainer key={tag}>
                            <Tag onClick={(e)=>handleTagClick(tag)}>
                                <p>{tag}</p>
                                <i style={{color:"#8D8E92"}} className="fa-solid fa-xmark" />
                            </Tag>
                        </TagContainer>
                    ))}
                    <TagInput 
                    value={tagsInputValue} 
                    ref={tagsInputFieldRef}
                    onChange={handleTagsInputChange} 
                    onBlur={handleTagsInputBlur} 
                    onKeyDown={handleKeyDown}/>
                </TagsInputContainer>
            </Input>
        </FormDefaultSection>
    )
}