import React from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'

function Login() {
    const token = localStorage.getItem("token");
    return (
        <FormContainer>
            <LoginForm />
        </FormContainer>
    )
}

export default Login

const FormContainer = styled.main`
  position: absolute;
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  input {
    font-size: 1.3rem;
    margin-top: 5px;
  }

  button {
    font-size: 1.5rem;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    margin-bottom: 10px;
    padding-left: 7px;
    padding-right: 7px;

    :hover{
      background: var(--yellow);
      color: var(--md-green);
    }

  }
  button[type="submit"] {
    margin-top: 15px;
  }
`