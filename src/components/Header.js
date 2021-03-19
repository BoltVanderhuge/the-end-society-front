import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

function Header() {
    const history = useHistory()
    const dispatch = useDispatch();
    
    function logout() {
        localStorage.removeItem("token");
        dispatch(setUser(false));
        history.push("/login")
      }
      function goToLogin(){
        history.push("/login")
      }
    const user = useSelector((state) => state.user);
    return (
        <ButtonContainer>
        <button value="run" >Run Collection</button>
        { user && 
        <button value="profile">Profile</button>
        }
        <button onClick={user ? logout : goToLogin}>
          {user ? "Logout" : "Login" }
        </button>
        </ButtonContainer>
    )
}

export default Header
const ButtonContainer = styled.nav`
  height: 100px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 75px;
  display: flex;
  align-items: center;
  
  button {
    border: 1px solid var(--yellow);
    text-align: center;
    padding-top: 8px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 8px;
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    margin-left: 20px;
    outline: none;
    :hover{
      background: var(--yellow);
      color: var(--md-green);
      border: 1px solid var(--md-green);
    } 

  }
`
