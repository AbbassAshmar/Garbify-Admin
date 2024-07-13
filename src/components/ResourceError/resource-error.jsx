import styled from "styled-components"
import Input from "../Input/input"
import FormDefaultSection from "../FormDefaultSection/form-default-section"


const Container = styled.div`
font-size: var(--heading-5);
font-weight : 600;
`

export default function ResourceDoesNotExist({message}){
    return ( 
        <FormDefaultSection style={{flex:"unset"}} title="Error" subtitle="Oops...Unexpected error.">
            <Container>
                {message}
            </Container>
        </FormDefaultSection>
        
    )
}