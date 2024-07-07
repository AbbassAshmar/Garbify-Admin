import styled from "styled-components";
import { useEffect, useState } from "react";
import MinusSignCircle from "../../../../../../../../components/MinusSignCircle/minus-sign-circle";
import PlusSignCircle from "../../../../../../../../components/PlusSignCircle/plus-sign-circle";

// tableHeadings array ex : ['weight', 'chest']
// tableSizes array ex : ['small', 'medium','large']
// sizesData is sent to the backend (list of tableSizes objects)

export default function SizesTable({formResetClicked, mainMeasurementUnit,tableSizes,sizesData,setSizesData,tableHeadings,setTableHeadings}){
    const [isInputFocused, setInputFocused] = useState('');
    const [showTable,setShowTable] = useState(false);
    const [buttonError,setButtonError] = useState('');

    useEffect(()=>{
        if (formResetClicked){
            setShowTable(false)
            setButtonError('')
        }
    },[formResetClicked])

    useEffect(()=>{
        if (!tableSizes.length) 
        setShowTable(false);
    },[tableSizes])

    useEffect(()=>{
        if (!showTable){
            setTimeout(()=>{
                setTableHeadings(['']);
                setSizesData(sizesData.map((size)=>(
                    {
                        ...size,
                        attributes : [{
                            value:'',
                            measurement_unit:''
                        }]
                    }
                )))
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
        setSizesData(sizesData.map((size)=>(
            {
                ...size,
                attributes : [
                    ...size.attributes,
                    {
                        value:'',
                        measurement_unit : '',
                    }
                ]
            }
        )))

        setTableHeadings([...tableHeadings,""])
    }

    function handleMinusSignClick(){
        if (tableHeadings.length == 1) return;
        setTableHeadings(tableHeadings.slice(0, -1));

        const updatedSizesData = sizesData.map((size) => {
            const newSize = { ...size };
            newSize.attributes = newSize.attributes.slice(0, -1);
            return newSize;
        });
        
        setSizesData(updatedSizesData);
    }

    function handleSizesTableButtonClick(){
        if (!mainMeasurementUnit || !tableSizes.length) {
            setButtonError('please choose your sizes and a sizes measurement unit.')
            return 
        }
        setButtonError("");
        setShowTable(!showTable);
    }

    ///improve using debouncing
    function handleHeadingInputChange(e,index){
        setTableHeadings(tableHeadings.map((head,i)=>{
            if (i == index) head = e.currentTarget.value;
            return head;
        }))

        let temp = [...sizesData];
        for(let size of temp){
            let attributes = [...size.attributes]
            attributes[index].measurement_unit =e.currentTarget.value;
            size.attributes =attributes;
        }
        setSizesData(temp);
    }
    
    function handleCellInputChange(e,sizeIndex,attributeIndex){
        const temp = [...sizesData];
        
        const attributes = [...temp[sizeIndex].attributes];
        attributes[attributeIndex].value = e.currentTarget.value;
        temp[sizeIndex] = { ...temp[sizeIndex], attributes };
        
        setSizesData(temp);
    }


    return(
        <Container>
            <TableWrapper $padding={showTable?"2rem" : "0"}>
            <TableContainer $show={showTable} $maxHeight={showTable?"70vh" : "0"}>
                <Table>
                    <thead>
                        <TRow>
                            <THeading>{mainMeasurementUnit || 'sizing*'}</THeading>
                            {tableHeadings && tableHeadings.map((head,index)=>(
                                <THeading $isFocused={isInputFocused==mainMeasurementUnit+index} key={index}>
                                    <DataInput 
                                    onChange={(e)=>handleHeadingInputChange(e,index)}
                                    value={head}
                                    type="text" placeholder="sizing"
                                    $isFocused={isInputFocused==mainMeasurementUnit+index} 
                                    onFocus={(e)=>handleTableInputsFocus(mainMeasurementUnit+index)}
                                    onBlur={handleTableInputsBlur}   
                                    style={{fontSize:"var(--body)",fontWeight:"500"}}
                                    />
                                </THeading>
                            ))}
                        </TRow>
                    </thead>
                    <tbody>
                        {tableSizes.map((size,sizeIndex)=>(
                            <TRow key={size}>
                                <TData>{size}</TData>
                                {tableHeadings && tableHeadings.map((_,attributeIndex)=>(
                                    <TData $isFocused={isInputFocused==size+attributeIndex} key={attributeIndex}>
                                        <DataInput
                                        onChange={(e)=>handleCellInputChange(e,sizeIndex,attributeIndex)}  
                                        value={sizesData[sizeIndex].attributes[attributeIndex].value}      
                                        type="text" placeholder="value"
                                        $isFocused={isInputFocused==size+attributeIndex} 
                                        onBlur={handleTableInputsBlur} 
                                        onFocus={(e)=>handleTableInputsFocus(size+attributeIndex)}
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