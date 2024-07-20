import styled from "styled-components";
import { useEffect, useState } from "react";
import MinusSignCircle from "../../../../../../../../components/MinusSignCircle/minus-sign-circle";
import PlusSignCircle from "../../../../../../../../components/PlusSignCircle/plus-sign-circle";

export default function SizesTable({formResetClicked,tableHeadings,setTableHeadings, formData, setFormData}){
    const [isInputFocused, setInputFocused] = useState('');
    const [showTable,setShowTable] = useState(true);
    const [buttonError,setButtonError] = useState('');

    useEffect(()=>{
        if (formResetClicked){
            setShowTable(false)
            setButtonError('')
        }
    },[formResetClicked])

    useEffect(()=>{
        if (!formData.sizes.length) 
        setShowTable(false);
    },[JSON.stringify(formData.sizes)])

    useEffect(()=>{
        if (formData.sizes_data[0]?.alternative_sizes.length) 
        setShowTable(true);
    },[JSON.stringify(formData.sizes_data)])
    
    useEffect(()=>{
        if (!showTable){
            setTimeout(()=>{
                setTableHeadings([]);
                setFormData(prev => ({
                    ...prev, 
                    sizes_data : prev.sizes_data.map(size => ({
                        ...size,
                        alternative_sizes : []
                    }))
                }))
            },300);
        }
    },[showTable])

    const handleTableInputsFocus = (str) => {
        setInputFocused(str);
    };
    
    const handleTableInputsBlur = () => {
        setInputFocused(-1);
    };
    
    function handlePlusSignClick(){
        setTableHeadings([...tableHeadings,""])
        setFormData(prev => ({
            ...prev, 
            sizes_data : prev.sizes_data.map(size => ({
                ...size,
                alternative_sizes : [
                    ...size.alternative_sizes,
                    {size : '' , unit : ''}
                ]
            }))
        }))
    }

    function handleMinusSignClick(){
        if (tableHeadings.length == 1) return;
        setTableHeadings(tableHeadings.slice(0, -1));

        const updatedSizesData = formData.sizes_data.map(size => {
            const newSize = { ...size };
            newSize.alternative_sizes = newSize.alternative_sizes.slice(0, -1);
            return newSize;
        });

        setFormData(prev => ({...prev, sizes_data : updatedSizesData}));
    }

    function handleSizesTableButtonClick(){
        if (!formData.sizes_unit || !formData.sizes.length) {
            setButtonError('please choose your sizes and a sizes measurement unit.')
            return 
        }

        if (!showTable){
            setShowTable(true);
            setTableHeadings([""]);
            setFormData(prev => ({
                ...prev, 
                sizes_data : prev.sizes_data.map(size => ({
                    ...size,
                    alternative_sizes : [{size:"",unit:""}]
                }))
            }))
        }else{
            setShowTable(false);
        }

        setButtonError("");
    }

    function handleHeadingInputChange(e,index){
        setTableHeadings(tableHeadings.map((head,i)=>{
            if (i == index) head = e.currentTarget.value;
            return head;
        }))

        let temp = [...formData.sizes_data];
        for(let size of temp){
            let alternative_sizes = [...size.alternative_sizes]
            alternative_sizes[index].unit =e.currentTarget.value;
            size.alternative_sizes =alternative_sizes;
        }

        setFormData(prev => ({...prev, sizes_data : temp}));
    }
    
    function handleCellInputChange(e,sizeIndex,alternativeIndex){
        const temp = [...formData.sizes_data];
        
        const alternative_sizes = [...temp[sizeIndex].alternative_sizes];
        alternative_sizes[alternativeIndex].size = e.currentTarget.value;
        temp[sizeIndex] = {...temp[sizeIndex], alternative_sizes };
        
        setFormData(prev => ({...prev, sizes_data : temp}));
    }


    return(
        <Container>
            <TableWrapper $padding={showTable?"2rem" : "0"}>
            <TableContainer $show={showTable} $maxHeight={showTable?"70vh" : "0"}>
                <Table>
                    <thead>
                        <TRow>
                            <THeading>{formData.sizes_unit || 'sizing*'}</THeading>
                            {tableHeadings.length > 0 && tableHeadings.map((head,index)=>(
                                <THeading $isFocused={isInputFocused==formData.sizes_unit+index} key={index}>
                                    <DataInput 
                                    onChange={(e)=>handleHeadingInputChange(e,index)}
                                    value={head}
                                    type="text" placeholder="sizing"
                                    $isFocused={isInputFocused==formData.sizes_unit+index} 
                                    onFocus={(e)=>handleTableInputsFocus(formData.sizes_unit+index)}
                                    onBlur={handleTableInputsBlur}   
                                    style={{fontSize:"var(--body)",fontWeight:"500"}}
                                    />
                                </THeading>
                            ))}
                        </TRow>
                    </thead>
                    <tbody>
                        {formData.sizes.map((size,sizeIndex)=>(
                            <TRow key={size}>
                                <TData>{size}</TData>
                                {tableHeadings.length > 0 && tableHeadings.map((_,alternativeIndex)=>(
                                    <TData $isFocused={isInputFocused==size+alternativeIndex} key={alternativeIndex}>
                                        <DataInput
                                        onChange={(e)=>handleCellInputChange(e,sizeIndex,alternativeIndex)}  
                                        value={(formData.sizes_data[sizeIndex].alternative_sizes[alternativeIndex]?.size || "")}      
                                        type="text" placeholder="value"
                                        $isFocused={isInputFocused==size+alternativeIndex} 
                                        onBlur={handleTableInputsBlur} 
                                        onFocus={(e)=>handleTableInputsFocus(size+alternativeIndex)}
                                        />
                                    </TData>
                                ))}
                            </TRow>
                        ))}
                    </tbody>
                </Table>
                <PlusMinusSigns>
                    <PlusSignCircle onClick={handlePlusSignClick} />
                    <MinusSignCircle onClick={handleMinusSignClick} />
                </PlusMinusSigns>
            </TableContainer>
            </TableWrapper>
            <div style={{display:'flex',flexDirection:"column",gap:".5rem",color:'red',fontWeight:"500"}}>
                <SizesTableButton type="button" onClick={handleSizesTableButtonClick}>
                    {showTable ? "remove sizes table" : "Add sizes table"}
                </SizesTableButton>
                {buttonError && <p>{buttonError}</p>}
            </div>
        </Container>
    )
}

const Container = styled.div`
display:flex;
flex-direction:column;
`
const SizesTableButton = styled.button`
border:none;
padding:.5rem 2rem;
font-weight:500;
cursor: pointer;
border-radius: 4px;
font-size:var(--body);
transition: background-color .3s;
background-color: var(--main-color);
color: white;
width: fit-content;
&:hover{
    background-color:#009BCC;
}
`
const TableWrapper =styled.div`
width :100%;
height: 100%;
overflow: hidden;
max-height: calc(70vh - 50px);
transition:padding .3s;
padding-bottom: ${({$padding}) => $padding};
`
const TableContainer = styled.div`
gap: 2rem;
width :calc(100% + 50px) ;
height :calc(100% + 50px) ;
display: flex;
justify-content: flex-start;
align-items: flex-start;
transition:max-height .3s, padding .3s;
overflow:${({$show})=>($show?'auto':'hidden')};
max-height:${({$show})=>($show?'70vh':'0')};
padding:${({$show})=>($show?'0 50px 50px 0':'0')};
`
const Table = styled.table`
border-collapse: collapse;
width: 100%;
height: 100%;
`
const TRow = styled.tr`

`
const THeading = styled.th`
border: 3px solid var(--secondary-color);
text-align: left;
padding: 1rem;
font-weight:500;
transition:background-color .3s;
background-color: ${({$isFocused})=>($isFocused?'var(--secondary-color)':'white')};
`
const TData = styled.td`
border: 3px solid var(--secondary-color);
text-align: left;
padding: 1rem;
font-weight:500;
transition:background-color .3s;
background-color: ${({$isFocused})=>($isFocused?'var(--secondary-color)':'white')};
`

const DataInput = styled.input`
width: 100%;
height:100%;
min-width: 90px;
border:none;
outline: none;
transition:background-color .3s;
background-color: ${({$isFocused})=>($isFocused?'var(--secondary-color)':'white')};
`


const PlusMinusSigns = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
align-self:center;
justify-content: center;
`