import React, {useState} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';
import { useHistory } from "react-router-dom";

function LoginForm() {
    const user = useSelector((state) => state.user);
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
          console.log(formData)
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
            dispatch(setUser(data))
            console.log(user)
            localStorage.setItem("token", data.token);
            history.push("/centralcommand");
          })
          .catch((data) => {
            setErrors(data.errors);
          });
      }


    return (
        <Form onSubmit={handleLoginSubmit} autoComplete="off">
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          checked={formData.password}
          placeholder="Password"
          required
        />
        <button type="submit">Submit</button>
        
        {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        ))}
  </Form>
    )
}

export default LoginForm

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(43, 43, 43, 60%);
  color: white;
  padding: 70px;

  box-shadow: 0 1px 3px rgb(0 0 0 / 30%), 0 1px 2px rgb(0 0 0 / 50%);

  h1 {
    margin-top: 0;
  }
  input {
    border-radius: 6px;
    width: 175px;
    height: 20px;
    margin-bottom: 5px;
    text-align: center;
    padding-bottom: 4px;
    padding-top: 4px;
  }

  button{
    :last-of-type{
      margin-top: 40px;
      padding: 2px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 1.3rem;
    }
  }
`
