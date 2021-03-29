import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRun } from '../redux/runSlice';
import { Image } from "cloudinary-react";
import { setRuns } from '../redux/runsSlice';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'

function RunCollectionContainer() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const [extraInfo,setExtraInfo] = useState([])
    const run = useSelector((state) => state.run);
    const runs = useSelector((state) => state.runs);
    const dispatch = useDispatch();
    const completedRuns = runs.filter((run)=>{
        if (run.date_completed){
            return (run)
        }
       
    })

    useEffect( () => {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`)
        .then( response => response.json() )
        .then(data => dispatch(setRuns(data)));
        
    }, [])
    function handleClick(run){
        dispatch(setRun(run))
        fetch(`http://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => setExtraInfo(data.results));
        console.log(extraInfo)
    }
    const listedRuns = completedRuns.map((run)=>{
        return(<Button variant="secondary" block onClick={()=>handleClick(run)} key={run.id}>{run.name}</Button>)
    })
    return (
        <Container activeIndex={index} onSelect={handleSelect} fluid>
            <Row>
                <Col xs={2}>
                    <ul>
                        {listedRuns}
                    </ul>
                </Col>
                <Col className="h-100">
                {run ? 
                    <Carousel>
                    { extraInfo.image ?
                        <Carousel.Item>
                            <img className="d-block h-100 mx-auto" alt="Game Box Art" src={extraInfo.image.medium_url}></img>
                        </Carousel.Item>
                        : null }
                        { run.photos ? run.photos.map((aPhoto) => {return (
                            <Carousel.Item>
                                <Image
                                    cloudName={process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                    publicId={aPhoto.photo}
                                    className="d-block w-100 mx-auto"
                                    // width="100"
                                    crop="scale"
                                    />
                            </Carousel.Item> )} )
                        : null }
                    </Carousel> : null}
                </Col>
            </Row>
        </Container>
    )
}
export default RunCollectionContainer

