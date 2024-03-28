import styled from "styled-components";
import Logo from "../Logo/logo";

const Container = styled.div`
display:flex;
justify-content:space-between;
position:sticky;
top:0;
width:100%;
padding: 1rem 2rem;
background:white;
`

const LogoContainer =  styled.div`

`
const ProfileNotificationContainer = styled.div`

`
const Notifaction= styled.div`

`
const UserProfile = styled.div`

`
const ProfilePicture = styled.img`

`
const UserInfo = styled.div`

`
const UserName = styled.p`

`
const UserRole = styled.p`

`
export default function Navbar(){
    return (
        <Container>
            <LogoContainer>
                
            </LogoContainer>
            <SearchBarContainer>

            </SearchBarContainer>
            <ProfileNotificationContainer>
                <Notifaction>

                </Notifaction>
                <UserProfile>
                    <ProfilePicture />
                    <UserInfo>
                        <UserName>
                            zachDaBeast
                        </UserName>
                        <UserRole>
                            super-admin
                        </UserRole>
                    </UserInfo>
                </UserProfile>
            </ProfileNotificationContainer>
        </Container>
    )
}