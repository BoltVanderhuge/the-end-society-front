import React from "react";
import Calendar from "@ericz1803/react-google-calendar";
import { css } from "@emotion/react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const id = process.env.REACT_APP_GOOGLE_CALENDER

let calendars = [
  {calendarId: id},
];

let styles = {
  //you can use object styles (no import required)
  calendar: css`
    color: white;
  `,
  
  //you can also use emotion's string styles
  today: css`
   /* highlight today by making the text red and giving it a red border */
    border: 2px solid #e0a800;
  `
}


class Calender extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <StyledCalendar apiKey={API_KEY} calendars={calendars} styles={styles}  />
          </Col>
      </Row>
    </Container>
    )
  }
}

export default Calender;

const StyledCalendar = styled(Calendar)`

`