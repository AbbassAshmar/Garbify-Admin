import styled from "styled-components";
import Logo from "../Logo/logo";
import useUserState from "../../hooks/use-user-state";

const Container = styled.div`
display:flex;
justify-content:space-between;
width:100%;
padding: 1rem 2rem;
background:white;
align-items:center;
height:70px;
position:sticky;
top:0;
`

const LogoContainer =  styled.div`
gap:1rem;
display:flex;
align-items:center;
justify-content:center;
`
const BarsIcon = styled.i`
font-size:1.3rem;
color:var(--main-color);
`
const SearchBarContainer = styled.form`
position:relative;
width:25%;
`
const SearchBar = styled.input`
font-size:1rem;
padding:.5rem 2.5rem .5rem 1rem;
width:100%;
border-radius:6px;
border:2px solid var(--seconday-color);
font-weight:400;
transition:border .3s;
&::placeholder{
    font-weight:400;
    color:#A8AAAE;
}
&:focus {
    outline: none;
    border:2px solid var(--main-color);
}
`
const SearchIcon = styled.i`
position:absolute;
right:1rem;
top:.6rem;
color:grey;
${SearchBar}:focus + &{
    color:var(--main-color);
}
`

const ProfileNotificationContainer = styled.div`
display:flex;
gap:1rem;
align-items:center;
`
const Notification= styled.div`
border-radius:50%;
height:2.2rem;
width:2.2rem;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
background:var(--seconday-color);
transition:background .3s;
&:hover{
    background:var(--main-color);
}
`
const BellIcon = styled.i`

`
const UserProfile = styled.div`
display:flex;
gap:1rem;
`
const ProfilePicture = styled.img`
border-radius:50%;
width:2.2rem;
height:2.2rem;
`
const UserInfo = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
gap:1px;
`
const UserName = styled.p`
font-size:14px;
font-weight:600;
`
const UserRole = styled.p`
font-size:var(--small-1);
color:#A8AAAE;
font-weight:400;
`
export default function Navbar(){
    const userState = useUserState();
    
    return (
        <Container>
            <LogoContainer>
                <BarsIcon className="fa-solid fa-bars" />
                <Logo />
            </LogoContainer>
            <SearchBarContainer>
                <SearchBar placeholder="Search..."/>
                <SearchIcon className="fa-solid fa-magnifying-glass" />
            </SearchBarContainer>
            <ProfileNotificationContainer>
                <Notification>
                    <BellIcon className="fa-regular fa-bell"/>
                </Notification>
                <UserProfile>
                    <ProfilePicture src={userState.user.profile_picture}/>
                    <UserInfo>
                        <UserName>zachDaBeast</UserName>
                        <UserRole>super-admin</UserRole>
                    </UserInfo>
                </UserProfile>
            </ProfileNotificationContainer>
        </Container>
    )
}