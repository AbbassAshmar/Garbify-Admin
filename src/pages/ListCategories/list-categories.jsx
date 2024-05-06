import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.form`
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
width: 100%;
overflow: auto;
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
/* border:1px solid red; */
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
  const [categories , setCategories] = useState(Categories.categories);

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

	useEffect(()=>{
		for (const refId in liRefs.current) {
			setLiWidths(prevWidths => ({
				...prevWidths,
				[refId]: width(liRefs.current[refId])
			}))
		};
	},[liRefs,liRefs.current])
	
    const renderCategory = (category,index,length) => (
        <Li ref={ref => liRefs.current[category.id] = ref} $width={`${liWidths[category.id]}px`} key={category.id} $borderTop={borderTop(index,length)} {...borderLeftRight(index,length)} {...position(index,length)} $borderRadius={borderRadius(index,length)}>
            <Node>{category.name}</Node>
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
        <Container>
            <Header>
                <HeaderText>
                    <PageTitle>All Categories</PageTitle>
                    <PagePath>{location.pathname.split("/").join(" / ")}</PagePath>
                </HeaderText>
            </Header>
            <Content>
                <TreeContainer>
                    <Root>Categories</Root>
                    {renderCategories(categories)}
                </TreeContainer>
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
            id: 2645,
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
          },
          {
            id: 256,
            name: "Sports",
            parent_id: 1,
            children: [
              {
                id: 23,
                name: "Shoes",
                parent_id: 2,
                children: [
                  {
                    id: 564,
                    name: "Brand",
                    parent_id: 3,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 54,
            name: "Sports",
            parent_id: 1,
            children: [
              {
                id: 7653,
                name: "Shoes",
                parent_id: 2,
                children: [
                  {
                    id: 4564,
                    name: "Brand",
                    parent_id: 3,
                    children: []
                  },
				  {
                    id: 4024,
                    name: "Fuck",
                    parent_id: 3,
                    children: []
                  },
				  {
                    id: 40243,
                    name: "My",
                    parent_id: 3,
                    children: []
                  },
				  {
                    id: 40213,
                    name: "Life",
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
            id: 656,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 758,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 68,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 25,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 6,
            name: "Sports",
            parent_id: 52,
            children: [
              {
                id: 947,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 80,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 554,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 306,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 700,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 800,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 722,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 822,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 565,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 633,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 733,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 855,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 77,
                name: "Shoes",
                parent_id: 68,
                children: [
                  {
                    id: 85,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2865,
        name: "Women",
        parent_id: null,
        children: [
          {
            id: 6856,
            name: "Sports",
            parent_id: 5,
            children: [
              {
                id: 343,
                name: "Shoes",
                parent_id: 63,
                children: [
                  {
                    id: 868,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 786,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 948,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 759,
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
              },
              {
                id: 247,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 2348,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 437,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 438,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 27,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 658,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 987,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 98,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 479,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 8976,
                    name: "Brand",
                    parent_id: 7,
                    children: []
                  }
                ]
              },
              {
                id: 7976,
                name: "Shoes",
                parent_id: 6,
                children: [
                  {
                    id: 864,
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
  