import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useGetCategories from "../../hooks/use-get-categories";
import DefaultPageHeader from "../../components/DefaultPageHeader/default-page-header";

const Content = styled.div`
width: 100%;
overflow: auto;
border-radius: 6px;
background-color: white;
padding-top:2rem;
padding-bottom: 2rem;
`
const TreeContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: fit-content;
align-items: center;
`
const Root = styled.div`
border-radius: 50%;
width:110px;
display: flex;
align-items: center;
justify-content: center;
font-size: var(--body);
font-weight:600;
padding:1rem;
background:var(--main-color);
height: 110px;
`
const UL = styled.ul`
display: flex;
width: fit-content;
position: relative;
padding-top: 3rem;
&::before{
content: '';
position: absolute;
top: 0;
right: calc(-3px + 50%);
border-left: 5px solid black;
width: 0;
height: ${({$borderHeight})=>$borderHeight};
transition: all var(--transition);
}
`
const Li = styled.li`
position: relative;
list-style-type: none;
text-align:center;
min-width: 150px;

&::before{
content:"";
top: -26px;
box-sizing: border-box;
height: 26px;
position: absolute;
border-radius:${({$borderRadius})=>$borderRadius};
border-left: ${({$borderLeft})=> $borderLeft};
border-right: ${({$borderRight})=> $borderRight};

left: ${({$left})=> $left};
right: ${({$right})=> $right};
width: ${({$width})=> $width};

border-top:${({$borderTop})=> $borderTop};
transition: all var(--transition);
}
`
const Node = styled.div`
min-width: 50px;
background-color: var(--main-color);
font-weight:600;
font-size:var(--body);
width: fit-content;
width: 80px;
margin: auto;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
`

export default function ListCategories(){
	const liRefs = useRef({});
	const [liWidths,setLiWidths] = useState({});
	const [categories] = useGetCategories("nested");

	useEffect(()=>{
		for (const refId in liRefs.current) {
			setLiWidths(prevWidths => ({
				...prevWidths,
				[refId]: width(liRefs.current[refId])
			}))
		};
	},[liRefs,liRefs.current,categories])
	
	const borderLeftRight = (index, length)=>{
		if (length <= 1) return "0";
		if (index == 0) return {$borderLeft:'5px solid black'};
		return {$borderRight:'5px solid black'};
	}
	
	const borderTop = (index,length) => {
		if (length == 1) return "0";
		if (index ==0 || index == length -1) return "5px solid black";;
		return "0";
	}

	const position = (index, length)=> {
		if (index == 0) return {$left : "calc(-3px + 50%)", $right: "unset"};
		if (index == length-1) return {$right:"calc(-3px + 50%)",$left: "unset"};
		return  {$right:"calc(-3px + 50%)", $left: "unset"};
	}
	
	const width = (ref) => {
		if (!ref) return 0;
		let liWidth = ref.offsetWidth;
		let ulWidth = ref.parentNode.offsetWidth;
		return ulWidth - (ulWidth/2) - (liWidth/2) + 3
	}

	const borderRadius = (index, length)=>{
		if (index == 0) return "6px 0 0 0";
		if (index == length-1) return "0 6px 0 0";
		return "0";
	}	
	
    const renderCategory = (category,index,length) => (
        <Li ref={ref => liRefs.current[category.id] = ref} $width={`${liWidths[category.id]}px`} key={category.id} $borderTop={borderTop(index,length)} {...borderLeftRight(index,length)} {...position(index,length)} $borderRadius={borderRadius(index,length)}>
            <Node>{category.category}</Node>
            {category.children.length > 0 && (
                <UL $borderHeight={category.children.length == 1 ? "3rem": "22px"}>
                    {category.children.map((child,index) => renderCategory(child,index,category.children.length))}
                </UL>
            )}
        </Li>
    );
    
    const renderCategories = (categories) => (
        <UL $borderHeight={categories.length == 1 ? "3rem": "22px"}>
            {categories.map((category,index) => renderCategory(category,index,categories.length))}
        </UL>
    );
    
    return (
        <DefaultPageHeader title="All Categories Tree">
            <Content>
                <TreeContainer>
                    <Root>Categories</Root>
                    {renderCategories(categories)}
                </TreeContainer>
            </Content>
        </DefaultPageHeader>    
    )
}

