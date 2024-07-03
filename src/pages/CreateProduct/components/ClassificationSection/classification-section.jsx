import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../../../components/Input/input";
import { TextInputField } from "../../../../components/Input/input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

const SelectField = styled.select`
width:100%;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid var(--secondary-color);
border-radius:3px;
outline: none;
transition: border .3s;
cursor:pointer;
&:focus {
    border:2px solid var(--main-color);
}
`
const TagsInputContainer = styled.div`
cursor: text;
display: block;
flex-wrap: wrap;
width:100%;
min-height: 60px;
padding:0 0 1rem 1rem;
border-radius:6px;
transition: border .3s;
border: 3px solid ${({ $isFocused }) => ($isFocused ? 'var(--main-color)': 'var(--secondary-color)')};
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

export default function ClassificationSection({formResetClicked, errors}){
    const tagsInputFieldRef = useRef();
    const [isInputFocused, setInputFocused] = useState(false);

    const [tags,setTags] = useState(['shoes','sport']);
    const [tagsInputValue, setTagsInputValue] = useState("");

    useEffect(()=>{
        if (formResetClicked){
            setTags(['shoes','sport']);
            setTagsInputValue("");
        }
    },[formResetClicked])

    function handleTagsInputContainerClick(){
        setInputFocused(true);
        tagsInputFieldRef.current.focus();
    }

    function handleTagClick(tag){
        setTags(tags.filter((t)=> t != tag));
    }

    function handleTagsInputChange(e){
        setInputFocused(true);
        setTagsInputValue(e.currentTarget.value);
    }

    function handleAddTag(tag){
        if (tags.includes(tag)) return 
        if (!tag) return 

        setTags([...tags, tag]);
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
    
    return (
        <FormDefaultSection title={'Classification'}>
            <Input label={"type"} title={"Type"} subtitle={TYPE_SUBTITLE} errors={errors?.messages['type']}>
                <TextInputField name="type" id="type" type="text" placeholder="product type"/>
            </Input>
            <Input label={"category"} title={"Category"} errors={errors?.messages['category']}>
                <SelectField name="category" id="category">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </SelectField>
            </Input>
            <Input label={"tags"} title={"Tags"} subtitle={TAGS_SUBTITLE} errors={errors?.messages['tags']}>
                <TagsInputContainer $isFocused={isInputFocused} onClick={handleTagsInputContainerClick}>
                    {tags && tags.map((tag)=>(
                        <TagContainer key={tag}>
                            <Tag onClick={(e)=>handleTagClick(tag)}>
                                <p>{tag}</p>
                                <i style={{color:"#8D8E92"}} className="fa-solid fa-xmark" />
                                <input type="hidden" name="tags[]" value={tag} />
                            </Tag>
                        </TagContainer>
                    ))}
                    <TagInput onChange={handleTagsInputChange} value={tagsInputValue} onBlur={handleTagsInputBlur} onKeyDown={handleKeyDown} ref={tagsInputFieldRef}/>
                </TagsInputContainer>
            </Input>
        </FormDefaultSection>
    )
}