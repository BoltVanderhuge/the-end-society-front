import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRun } from '../redux/runSlice';
import {Route,useHistory} from 'react-router-dom'
import { Image } from "cloudinary-react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

function RunCollectionContainer() {
    const [extraInfo,setExtraInfo] = useState([])
    const run = useSelector((state) => state.run);
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const history = useHistory();
    const completedRuns = runs.filter((run)=>{
        if (run.date_completed){
            return (run)
        }
    })

    useEffect( () => {
        fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => setExtraInfo(data.results));
        
    }, [])
console.log(extraInfo)
    function handleClick(run){
        dispatch(setRun(run))
        fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => setExtraInfo(data.results));
            // history.push(`/collection/${run.id}`)

    }
    const listedRuns = completedRuns.map((run)=>{
        return(<Button variant="secondary" block onClick={()=>handleClick(run)} key={run.id}>{run.name}</Button>)
    })

    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <ul>
                        {listedRuns}
                    </ul>
                </Col>
                <Col>
                    {run ? 
                        <>
                        <div>
                            Game: <br></br> 
                            {run.name}<br></br>
                            Date Beaten:<br></br> 
                            {run.date_completed}<br></br>
                            Completed by: {run.users.map((run=>(
                                <li key={run.id}> {run.username}</li>
                            )))}
                            Duration:<br></br> 
                            {run.run_time}
                        </div>
                        { extraInfo.image ?
                        <img alt="Game Box Art" src={extraInfo.image.medium_url}></img>
                        : null }
                        { run.photos ? run.photos.map((aPhoto) => {return (<Image key={aPhoto.id}
                            cloudName={process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                            publicId={aPhoto.photo}
                            width="100"
                            crop="scale"
                            />)} )
                        
                        : null }
                        </>
                        :null
                    }
                </Col>
            </Row>
        </Container>
    )
}
{/* <Carousel fade>
{ extraInfo.image ?
  <Carousel.Item>
  <img alt="Game Box Art" src={extraInfo.image.medium_url}></img>
  </Carousel.Item>
  : null }
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />
  </Carousel.Item>
 
</Carousel> */}
export default RunCollectionContainer

