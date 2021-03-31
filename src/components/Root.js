import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import useSound from 'use-sound';
import door from './sounds/door.wav'
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Root() {
  const user = useSelector((state) => state.user);
  const [playActive] = useSound(
    door,
    { volume: 0.25 }
  )
    const history = useHistory();
    function handleClick(){
        playActive()
        if (user){
          history.push("/centralcommand")
        } else {
        history.push("/login")}
    }
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    
    (function () {
      var cnv = document.querySelector("#torch");
      if (cnv) {
      cnv.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      cnv.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      var ctx = cnv.getContext("2d");
      var mouse = {x: cnv.width/2, y: cnv.height/2};
      var flames = [];
    
      /**
       * Flame shapes constructor
       */
      var Flame = function () {
        function flame () {
          this.radius = 10;
          this.delete = false;
          this.position = {x: mouse.x + ((Math.random() > 0 ? 1 : -1) * Math.random() * 5), y: mouse.y};
        }
    
        flame.prototype.Draw = function (ctx) {
          if (this.radius > 0) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(256," + (250 - this.radius*12) + ",0)";
            ctx.arc(this.position.x, this.position.y-3-30+this.radius*3, this.radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
    
            this.radius--;
          } else {
            this.delete = true;
          }
        };
    
        return new flame();
      };
    
    
      /**
       * Update mouse coordinates on moving
       */
      document.addEventListener('mousemove', function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      });
    
      /**
       * Redraw canvas
       */
      function Update () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        // Draw background
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();
        ctx.fill();
    
        // Draw highlight
        var grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        grad.addColorStop(0, "#310");
        grad.addColorStop(1, "#000");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI*2, true);
        ctx.fillStyle = grad;
        ctx.closePath();
        ctx.fill();
    
        // Draw flames
        for (var i = 0; i < flames.length; i++) {
          if (flames[i].delete) {
            flames.splice(i, 1);
            flames.push(new Flame());
          } else {
            flames[i].Draw(ctx);
          }
        }
    
        window.requestAnimFrame(Update);
      }
    
      // Start drawing
      for (var i = 0; i < 10; i++) {
        flames[i] = new Flame();
      }
      Update();
    }}());

    return (
        <>
        <StyledContainer>
          <Row>
              <Col className="mx-auto text-center vh-100">
                <StyledImage onClick={handleClick} 
                  src="https://res.cloudinary.com/dngxsavth/image/upload/v1616100330/door_gd9j9g.png"
                  alt="Door"
                />
                <StyledCanvas id="torch"></StyledCanvas>
              </Col>
            </Row>
        </StyledContainer>
        
        </>
    )
}

export default Root
const StyledContainer = styled(Container)`
background-color: black;

`
const StyledCanvas = styled.canvas`
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	cursor: pointer;
`
const StyledImage = styled.img`
  position: fixed;
  z-index: 2;
  left: 50%;
  bottom: -185px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
`
// const ImageContainer = styled.div`
//     margin: 0; padding: 0;
//   width: 100%;
//   max-height: calc(100vh - 230px);
//   overflow:hidden;
//   .main{
//     width: 100%;
//     background-position: center center;
//   background-repeat: no-repeat;
//   background-size: contain;
//   width: 100vw;
//   height: 100vh;
//   z-index: 1;
//   position:absolute;
//   } 
//     background-color: black;
//     .door {
//     z-index: 2;
//     height: 13%;
//     position: absolute;
//     left: 50%;
//     bottom: -9%;
//     transform: translate(-50%, -50%);
//     margin: 0 auto;
//     background-color: black;
//   }
// `
