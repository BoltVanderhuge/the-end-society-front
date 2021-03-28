import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

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

    <h1>Account Settings </h1>


      <Form onSubmit={handleFormSubmit} autoComplete="off">
      <Form.Group controlId="formBasicEmail">
      <Form.Label > E-Mail </Form.Label>
      <Form.Control  type="text" name="email" onChange={handleFormChange} value={formData.email} placeholder="E-Mail" required />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
      <Form.Label > Current Password </Form.Label>
      <Form.Control  type="password" name="current_password" onChange={handleFormChange} checked={formData.currentPassword} placeholder="Current Password" required />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
      <Form.Label > New Password </Form.Label>
      <Form.Control  type="password" name="new_password" onChange={handleFormChange} checked={formData.newPassword} placeholder="New Password" />
      </Form.Group>
      <Button variant="dark" type="submit">
        Submit
      </Button>
      {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        ))}
    </Form>


  </div>
    )
}

export default ProfileContainer
