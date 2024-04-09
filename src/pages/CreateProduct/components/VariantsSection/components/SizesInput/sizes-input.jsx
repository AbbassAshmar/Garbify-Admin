import styled from "styled-components";
import { useState } from "react";
import SizesTable from "./components/SizesTable/sizes-table";

// a column is added (a heading is added to tableHeadings) ...
// a row is added (a size is added to sizes)  ...
// a row is deleted ...
// value of a cell is changed (value of (size,heading) is changed)
// a column is changed (value of heading is changed)


export default function SizesInput({errors,formData}){
    const [sizeInputValue,setSizeInputValue] = useState("");
    
    const [sizesUnit,setSizesUnit] = useState('');
    const [sizes,setSizes] = useState([])

    const [tableHeadings, setTableHeadings] = useState(['']);
    const [sizesData,setSizesData] = useState([])  

    function handleSizesUnitInputChange(e){
        setSizesUnit(e.currentTarget.value)
    }

    function handleDeleteSize(size){
        setSizes(sizes.filter((_size)=> _size !== size));
        setSizesData(sizesData.filter((_size)=> _size.value != size));
    }

    function handleSizeClick(size){
        handleDeleteSize(size);
    }

    function handleAddSize(size){
        size = size.trim();
        if (!size) return;

        if (!sizes.includes(size)){
            setSizes([...sizes,size])

            setSizesData([...sizesData,{
                value:size,
                measurement_unit:sizesUnit,
                attributes : tableHeadings.map((head)=>({
                    value:'',
                    measurement_unit:head
                }))
            }])
        }
    }

    function handleKeyDown(e){
        if (e.key ==="Enter"){
            handleAddSize(sizeInputValue)
            setSizeInputValue("")
        }
    }

    function handleBlur(e){
        handleAddSize(sizeInputValue)
        setSizeInputValue("")
    }
    
    function handleAddSizeButtonClick(){
        handleAddSize(sizeInputValue);
        setSizeInputValue("")
    }

    return(
        <>
            <InputContainer>
                <InputTitle htmlFor="sizes_unit">Sizes unit</InputTitle>
                <InputField onChange={handleSizesUnitInputChange} value={sizesUnit} name="sizes_unit" id="sizes_unit" type='text' placeholder="ex. inches" />   
                {errors?.messages['sizes_unit'] && <ErrorMessage>{errors?.messages['sizes_unit']}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
                <InputTitle htmlFor="sizes">Sizes</InputTitle>
                <SizesInputContainer>
                    <div style={{display:'flex',gap:'1rem'}}>
                        <InputField value={sizeInputValue} onChange={(e)=> setSizeInputValue(e.target.value)} id="sizes" name="sizes" placeholder="enter a size" onBlur={handleBlur} onKeyDown={handleKeyDown}/>
                        <AddSizeButton type="button" onClick={handleAddSizeButtonClick}>Add</AddSizeButton>
                    </div>
                    <SizesListContainer>
                        {sizes && sizes.map((size)=>(
                            <Size key={size} onClick={(e)=>handleSizeClick(size)}>
                                <p>{size}</p>
                                <i style={{color:"#8D8E92"}} className="fa-solid fa-xmark" />
                                <input type="hidden" name="sizes[]" value={size} />
                            </Size>
                        ))}
                    </SizesListContainer>
                </SizesInputContainer>  
                {errors?.messages['sizes'] && <ErrorMessage>{errors?.messages['sizes']}</ErrorMessage>}        
            </InputContainer>
            <SizesTable mainMeasurementUnit={sizesUnit} tableSizes={sizes} setTableHeadings={setTableHeadings} tableHeadings={tableHeadings} sizesData={sizesData} setSizesData={setSizesData}/>
        </>
    )
}

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
const ErrorMessage = styled.p`
color:red;
font-weight:600; 
font-size:var(--small-1);
`
const SizesInputContainer = styled.div`
gap:1rem;
display: flex;
flex-direction:column;
padding:1rem; 
border-radius:6px;
border: 3px solid var(--secondary-color);
`
const AddSizeButton = styled.button`
border:none;
padding:0 1rem;
font-weight:500;
cursor: pointer;
border-radius: 4px;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);

&:hover{
    background-color:#009BCC;
}
`
const SizesListContainer = styled.div`
gap:1rem;
display: flex;
flex-wrap: wrap;
min-height:65px;
max-height: 160px;
overflow-y:auto;
align-items: flex-start;
justify-content: flex-start;
`
const Size = styled.div`
gap:4px;
display: flex;
font-weight:500;
cursor: pointer;
padding:4px 8px;
border-radius:4px;
align-items: center;
justify-content: center;
font-size:var(--small-1);
background-color: var(--secondary-color);
&:hover{
    background-color: #c0c3c7;
}
`


