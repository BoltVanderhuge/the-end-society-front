import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function LoginForm() {
    const history = useHistory();

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

      function handleChange(event) {
        const name = event.target.name;
        let value = event.target.value;
    
        setFormData({
            ...formData,
            [name]: value,
        });
      }

   
      function handleLoginSubmit(e) {
          e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
            dispatch(setUser(data.user))
            localStorage.setItem("token", data.token);
            history.push("/centralcommand");
          })
          .catch((data) => {
            setErrors(data.errors);
          });
      }

      function handleGuest(){
        history.push("/centralcommand")
      }

    return (
        <Form onSubmit={handleLoginSubmit} autoComplete="off">
        <h1>Login</h1>
        <Form.Control
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          required
          xs="auto"
        />
        <Form.Control
          type="password"
          name="password"
          onChange={handleChange}
          checked={formData.password}
          placeholder="Password"
          required
          xs="auto"
        />
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br></br>
        <Button variant="dark" onClick={handleGuest}>Continue as Guest</Button>
        {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        ))}
  </Form>
    )
}

export default LoginForm
