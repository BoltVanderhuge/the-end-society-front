import React, {useState} from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';

function ProfileContainer() {
    const user = useSelector((state) => state.user);
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const tern = user.email ? user.email : ""
    const [formData, setFormData] = useState({
      email: tern,
      newPassword: "",
      currentPassword: "",
    });
  
    function handleFormChange(event) {
      const name = event.target.name;
      let value = event.target.value;
  
      setFormData({
          ...formData,
          [name]: value,
      });
    }
  
    function handleFormSubmit(event){
      event.preventDefault();
      const token = localStorage.getItem("token");
  
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw data;
          });
        }
      })
      .then((data) => {
        dispatch(setUser(data))
        history.push("/profile");
      })
      .catch((data) => {
        setErrors(data.errors);
      });
    }

    return (
        <div>
                      {/* <TextContainer> */}

{/* <Header> */}
  <h1>Account Settings </h1>
{/* </Header> */}

<Form onSubmit={handleFormSubmit} autoComplete="off">
  <label htmlFor="email"> E-Mail </label>
  <input id="email" type="text" name="email" onChange={handleFormChange} value={formData.email} placeholder="E-Mail" required />
 
  <label htmlFor="current_password"> Current Password </label>
  <input id="current_password" type="password" name="current_password" onChange={handleFormChange} checked={formData.currentPassword} placeholder="Current Password" required />

  <label htmlFor="new_password"> New Password </label>
  <input id="new_password" type="password" name="new_password" onChange={handleFormChange} checked={formData.newPassword} placeholder="New Password" />

<button type="submit"> Submit </button>
</Form>

{/* </TextContainer> */}
        </div>
    )
}

export default ProfileContainer
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 70px;
  padding-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;

  input {
    border-radius: 6px;
    width: 175px;
    height: 20px;
    margin-bottom: 5px;
    text-align: center;
    padding-bottom: 4px;
    padding-top: 4px;
    font-size: 1.1rem;
  }

  button{
    border-radius: 8px;
    background: black;
    color: white;
    border: 1px solid var(--yellow);
    outline: none;
    cursor: pointer;
    margin-top: 40px;
    padding: 2px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.3rem;

    :hover {
      background: black;
      color: red;
    }
  }
`