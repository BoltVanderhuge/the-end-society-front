import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components'

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
    <Container fluid>
      <Row>
        <Col xs={4} className="mx-auto text-center mt-3">
          <img
              src="https://res.cloudinary.com/dngxsavth/image/upload/v1616100330/shrine_nice_zuu1b4.png"
              alt="Shrine"
              width="100%"
          />
          <br></br>
          <br></br>
          
          <StyledForm onSubmit={handleLoginSubmit} autoComplete="off">
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
            <br></br>
            <Button variant="secondary" type="submit" block>Login</Button>{' '}  
            <Button variant="secondary" onClick={handleGuest} block>Continue as Guest</Button>
            {errors && errors.map((error) => (
              <p key={error} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </StyledForm>
        </Col>
      </Row>
    </Container>
    )
}

export default LoginForm

const StyledForm = styled(Form)`
padding: 0% 20% 


`