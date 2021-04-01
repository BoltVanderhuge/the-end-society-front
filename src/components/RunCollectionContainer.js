import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRun } from '../redux/runSlice';
import { setRuns } from '../redux/runsSlice';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import "./RunCollectionContainer.css";

function RunCollectionContainer() {
    const history = useHistory()
    const run = useSelector((state) => state.run);
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const completedRuns = runs.filter((run)=>{
        if (run.date_completed){
            return (run)
        }
       
    })

    useEffect( () => {
        let isSubscribed = true
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`)
        .then( response => response.json() )
        .then(data => {
            if (isSubscribed) {
            dispatch(setRuns(data))
            }
        });
        return () => isSubscribed = false
    }, [])
    function handleClick(run){
        dispatch(setRun(run))
        // fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        // .then( response => response.json() )
        // .then(data => setExtraInfo(data.results));
        // console.log(extraInfo)
        history.push("/run")
    }
    console.log(run)

    // const listedRuns = completedRuns.map((run)=>{
    //     return(<div class="bookshelf-wrapper" key={run.id}>
    //     <ul class="bookshelf-container">
    //         <li class="book ng-scope" ng-repeat="book in flattenBooks" ng-class="{ 'book-end': book.book_end }">
    //                 <span class="book-spine">
    //                     <span class="ng-binding">{run.name} </span>
    //                     <span class="ng-binding">{run.users}</span>
    //                 </span>
    //                 <span class="book-cover">
    //                     <span class="book-cover-author ng-binding">Stephen King</span>
    //                     <span class="book-cover-title ng-binding">Green Mile</span>
    //                 </span>
    //             </li>
    //      </ul>
    // </div>)
    // })


    const listedRuns = completedRuns.map((run)=>{
        return(<StyledButton variant="secondary" block onClick={()=>handleClick(run)} key={run.id}>{run.name}</StyledButton>)
    })
    return (
        <Container  fluid>
            <Row>
                <Col className="h-100">
                <style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
                    <Carta id="carta">
                        <Header id="carta-encabezado" ></Header>
                        <Section id="carta-contenido" >
                        <Mensaje id="carta-mensaje" >
                            <p>Games Conquered</p>
                            <ul>
                            {listedRuns}
                            </ul>
                        </Mensaje>
                        <Firma id="carta-firma" ></Firma></Section>
                        <Footer id="carta-footer"></Footer>
                    </Carta>

                </Col>
            </Row>
        </Container>
    )
}
export default RunCollectionContainer

const Carta = styled.div ` 
width:500px;margin:auto;width:500px;overflow:hidden;font-family: 'Press Start 2P', cursive;
 `;
 const Header = styled.header ` 
 background-image:url('https://fotos.subefotos.com/e0139226fb6eb14f6009f4e87fa2f8c3o.png');height:124px;margin-bottom:40px;
  `;
  const Section = styled.section ` 
  background-image:url('https://fotos.subefotos.com/cc42099b19996d043583e8a4377e8aaeo.png');background-repeat:repeat-y;min-height:50px;margin-top:-40px;padding-bottom:40px;
   `;

const Mensaje = styled.div ` 
text-align:left;color:black;font-size:16px;padding-left:79px;padding-bottom:15px;width:355px;margin-top:-30px;
 `;

const Firma = styled.div ` 
text-align:right;color:#6f0d0d;font-size:15px;padding-left:79px;margin-bottom:0px;width:355px;
 `;

const Footer = styled.footer ` 
background-image:url('https://fotos.subefotos.com/57f6ea113ab8b27188c4f496543efb4fo.png'); margin-top: -20px; color: rgb(62, 45, 45); text-align: right; padding: 53px 59px 0px 0px; height: 46px; font-size: 13px;
 `;

const StyledButton = styled(Button)`
color: black;
border-color: none;
background: none;
border: none


`