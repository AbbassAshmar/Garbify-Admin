import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../../../../../components/Input/input";
import { TextInputField } from "../../../../../../components/Input/input";
import SizesTable from "./components/SizesTable/sizes-table";

const SizesInputContainer = styled.div`
gap:1rem;
display: flex;
flex-direction:column;
padding:1rem; 
border-radius:6px;
border: 2px solid ${({$error}) => $error ? "red" : "var(--secondary-color)"};
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


export default function SizesInput({formResetClicked, errors,setFormData, formData}){
    const [sizeInputValue,setSizeInputValue] = useState("");    
    const [tableHeadings, setTableHeadings] = useState(['']);
  
    useEffect(()=>{
        if (formResetClicked){
            setTableHeadings(['']);
            setSizeInputValue('');
        }
    },[formResetClicked])

    function handleSizesUnitInputChange(e){
        setFormData(prev => ({...prev, sizes_measurement_unit : e.target.value}))
    }

    function handleDeleteSize(size){
        setFormData(prev => ({
            ...prev, 
            sizes : prev.sizes.filter(_size => _size !== size),
            sizes_data : prev.sizes_data.filter(_size => _size.value != size)
        }))
    }

    function handleSizeClick(size){
        handleDeleteSize(size);
    }

    function handleAddSize(size){
        size = size.trim();
        if (!size) return;
        if (formData.sizes.includes(size)) return;

        setFormData(prev => ({
            ...prev, 
            sizes : [...prev.sizes, size],
            sizes_data: [...prev.sizes_data,{
                value:size,
                measurement_unit:prev.sizes_measurement_unit,
                attributes : tableHeadings.map((head)=>({
                    value:'',
                    measurement_unit:head
                }))
            }
        ]}))
    }

    function handleKeyDown(e){
        if (e.key ==="Enter"){
            e.preventDefault();
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

    function handleSizesUnitInputKeyDown(e){
        if (e.key === "Enter"){
            e.preventDefault();
        }
    }

    return(
        <>
            <Input label={"sizes_measurement_unit"} title={'Sizes measurement unit'} errors={errors?.messages['sizes_measurement_unit']}>
                <TextInputField $error={errors?.messages['sizes_measurement_unit']} onKeyDown={handleSizesUnitInputKeyDown} onChange={handleSizesUnitInputChange} value={formData.sizes_measurement_unit} id="sizes_measurement_unit" type='text' placeholder="ex. inches" />   
            </Input>

            <Input label={"sizes"} title={'Sizes'} errors={errors?.messages['sizes']}>
                <SizesInputContainer $error={errors?.messages['sizes']}>
                    <div style={{display:'flex',gap:'1rem'}}>
                        <TextInputField value={sizeInputValue} onChange={(e)=> setSizeInputValue(e.target.value)} id="sizes" placeholder="enter a size" onBlur={handleBlur} onKeyDown={handleKeyDown}/>
                        <AddSizeButton type="button" onClick={handleAddSizeButtonClick}>Add</AddSizeButton>
                    </div>
                    <SizesListContainer>
                        {formData.sizes && formData.sizes.map(size => (
                            <Size key={size} onClick={(e)=>handleSizeClick(size)}>
                                <p>{size}</p>
                                <i style={{color:"#8D8E92"}} className="fa-solid fa-xmark" />
                                <input type="hidden" name="sizes[]" value={size} />
                            </Size>
                        ))}
                    </SizesListContainer>
                </SizesInputContainer>  
            </Input>

            <SizesTable formData={formData} setFormData={setFormData} formResetClicked={formResetClicked} setTableHeadings={setTableHeadings} tableHeadings={tableHeadings}/>
        </>
    )
}



