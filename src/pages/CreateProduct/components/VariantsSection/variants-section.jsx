import { useEffect, useState } from "react";
import styled from "styled-components";
import ColorsInput from "./components/ColorsInput/colors-input";
import SizesInput from "./components/SizesInput/sizes-input";
import SizesTable from "./components/SizesInput/components/SizesTable/sizes-table";

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


export default function VariantsSection({errors,formData, colors, setColors}){

    return (
        <Container>
            <Title>Variants</Title>
            <Content>
                <ColorsInput colors={colors} setColors={setColors} errors={errors} formData={formData} />
                <SizesInput errors={errors} formData={formData} />
            </Content>
        </Container>
    )
}

