import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.section`
flex:1;
gap:2rem;
padding:2rem;
display: flex;
border-radius: 6px;
min-width: 0;
flex-direction: column;
background-color: white;
box-shadow: 0px 0px 15px rgba(0,0,0,.11) ;
`
const Title = styled.h5`
font-size:var(--heading-5);
font-weight: 600;
`
const Content = styled.div`
gap:2rem;
display: flex;
flex-direction:column;
`
const InputContainer = styled.div`
display: flex;
flex-direction:column;
gap:1rem;
`
const InputTitle = styled.label`
font-size:var(--body);
font-weight:600;
`
const InputField = styled.input`
width:100%;
padding:.5rem;
font-weight:500;
font-size:var(--body);
border: 2px solid var(--secondary-color);
border-radius:3px;
outline: none;
transition: border .3s;
&:focus {
    border:2px solid var(--main-color);
}
&::placeholder{
    font-weight:400;
    color:#A8AAAE;
}
`
const InputSubtitle= styled.p`
font-size:var(--small-1);
font-weight:600;
color:#A8AAAE;
`

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

export default function ClassificationSection(){
    const [isInputFocused, setInputFocused] = useState(false);

    const [tagsInputValue, setTagsInputValue] = useState("");
    const tagsInputFieldRef = useRef();
    const [tags,setTags] = useState(['shoes', 'nice', 'eat','drink','fuckk','howdy']);

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
            handleAddTag(tagsInputValue);
            setTagsInputValue("");
        }
    }
    
    return (
        <Container>
            <Title>Classification</Title>
            <Content>
                <InputContainer>
                    <div style={{display:"flex",flexDirection:"column",gap:'.5rem'}}>
                        <InputTitle htmlFor="type">Type</InputTitle>
                        <InputSubtitle>{TYPE_SUBTITLE}</InputSubtitle>
                    </div>
                    <InputField name="type" id="type" type="text" placeholder="product type"/>
                </InputContainer>

                <InputContainer>
                    <InputTitle htmlFor="category">Category</InputTitle>
                    <SelectField name="category" id="category">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </SelectField>
                </InputContainer>

                <InputContainer>
                    <div style={{display:"flex",flexDirection:"column",gap:'.5rem'}}>
                        <InputTitle htmlFor="tags">Tags</InputTitle>
                        <InputSubtitle>{TAGS_SUBTITLE}</InputSubtitle>
                    </div>  
                    <TagsInputContainer $isFocused={isInputFocused} onClick={handleTagsInputContainerClick}>
                        {tags && tags.map((tag)=>(
                            <TagContainer key={tag}>
                                <Tag onClick={(e)=>handleTagClick(tag)}>
                                    <p>{tag}</p>
                                    <i style={{color:"#8D8E92"}} className="fa-solid fa-xmark" />
                                    <input type="hidden" name="sizes[]" value={tag} />
                                </Tag>
                            </TagContainer>
                        ))}
                        <TagInput onChange={handleTagsInputChange} value={tagsInputValue} onBlur={handleTagsInputBlur} onKeyDown={handleKeyDown} ref={tagsInputFieldRef}/>
                    </TagsInputContainer>              
                </InputContainer>

            </Content>
        </Container>
    )
}