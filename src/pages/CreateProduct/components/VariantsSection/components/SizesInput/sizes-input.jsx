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


export default function SizesInput({formResetClicked, errors,setFormData}){
    const [sizeInputValue,setSizeInputValue] = useState("");
    
    const [sizesUnit,setSizesUnit] = useState('');
    const [sizes,setSizes] = useState([])

    const [tableHeadings, setTableHeadings] = useState(['']);
    const [sizesData,setSizesData] = useState([])  

    useEffect(()=>{
        if (formResetClicked){
            setSizesData([]);
            setTableHeadings(['']);
            setSizesUnit('');
            setSizes([])
            setSizeInputValue('');
        }
    },[formResetClicked])
   
    useEffect(()=>{
        setFormData((prev) => ({
            ...prev,
            sizes_data:sizesData,
        }))
    }, [sizesData])

    useEffect(()=>{
        setSizesData(sizesData.map(size=>{
            size.measurement_unit = sizesUnit;
            return size;
        }))
    }, [sizesUnit])


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
        if (sizes.includes(size)) return;

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
                <TextInputField $error={errors?.messages['sizes_measurement_unit']} onKeyDown={handleSizesUnitInputKeyDown} onChange={handleSizesUnitInputChange} value={sizesUnit} name="sizes_measurement_unit" id="sizes_measurement_unit" type='text' placeholder="ex. inches" />   
            </Input>

            <Input label={"sizes"} title={'Sizes'} errors={errors?.messages['sizes']}>
                <SizesInputContainer $error={errors?.messages['sizes']}>
                    <div style={{display:'flex',gap:'1rem'}}>
                        <TextInputField value={sizeInputValue} onChange={(e)=> setSizeInputValue(e.target.value)} id="sizes" placeholder="enter a size" onBlur={handleBlur} onKeyDown={handleKeyDown}/>
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
            </Input>

            <SizesTable formResetClicked={formResetClicked} mainMeasurementUnit={sizesUnit} tableSizes={sizes} setTableHeadings={setTableHeadings} tableHeadings={tableHeadings} sizesData={sizesData} setSizesData={setSizesData}/>
        </>
    )
}



