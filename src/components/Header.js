import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { setGame } from '../redux/gameSlice';

function Header() {
    const history = useHistory()
    const dispatch = useDispatch();
    
    function logout() {
        localStorage.removeItem("token");
        dispatch(setUser(false));
        history.push("/login")
        dispatch(setGame(false))
      }
      function goToLogin(){
        history.push("/login")
      }
      function goToCollection(){
          history.push("/collection")
          dispatch(setGame(false))
      }

      function goToGameSearch(){
        history.push("/centralcommand")
        dispatch(setGame(false))
    }
    function goToProfile(){
      history.push("/profile")
      dispatch(setGame(false))
  }

    function goToRuns(){
      history.push("/runs")
      dispatch(setGame(false))
  }
  function goToCalender(){
    history.push("/calender")
    dispatch(setGame(false))
}
    const user = useSelector((state) => state.user);
    return (
        <ButtonContainer>
        <button onClick={goToCollection} value="run" >Run Collection</button>
        <button onClick={goToGameSearch} value="run" >Game Search</button>
        { user && 
        <button onClick={goToProfile} value="profile">Profile</button>
        }
        { user && 
        <button onClick={goToRuns} value="myruns">My Runs</button>
        }
                { user && 
        <button onClick={goToCalender} value="calender">Next Meeting</button>
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
