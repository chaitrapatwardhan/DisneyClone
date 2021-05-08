import React , {useEffect} from 'react';
import styled from 'styled-components';
import {auth , provider } from '../firebase';
import {useHistory} from 'react-router-dom'
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut,
} from "../features/user/userSlice"
import {useDispatch , useSelector} from 'react-redux';
import { Link } from "react-router-dom";


//this styles-components help style the elements in a tree liek structure
//&: after{} // adds a div kinda thing after every span

function Header() {

    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        auth.onAuthStateChanged(async(user) => {
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }))
                history.push("/home");
            }
        })
    } , [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }))
            history.push("/home");
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push("/");
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            { !userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>
                        Login
                    </Login>
                </LoginContainer>
                 ) : 
                <>
                    <NavMenu>
                    <a>
                        <img src="/images/home-icon.svg" />
                        <span>HOME</span>
                    </a>

                    <a>
                    <img src="/images/search-icon.svg" />
                    <span>SEARCH</span>
                    </a>

                    <a>
                    <img src="/images/watchlist-icon.svg" />
                    <span>WATCHLIST</span>
                    </a>

                    <a>
                    <img src="/images/original-icon.svg" />
                    <span>ORIGINALS</span>
                    </a>

                    <a>
                    <img src="/images/movie-icon.svg" />
                    <span>MOVIES</span>
                    </a>

                    <a>
                    <img src="/images/series-icon.svg" />
                    <span>SERIES</span>
                    </a>
                    </NavMenu>
                        <UserImg onClick={signOut} src={userPhoto} alt={userName} />
                </>
            }
            
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`
const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`
const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img{
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span{
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &: after{ 
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px; //pushes is below the span component
                opacity: 0;
                transform: scaleX(0);
                transition: all 300ms;
                transform-origin: left center;
            }
        }

        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }    
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`
const Login = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`