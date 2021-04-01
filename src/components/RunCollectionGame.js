import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRun } from '../redux/runSlice';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'
import { Image } from "cloudinary-react";
import styled from 'styled-components'


function RunCollectionGame() {
    const run = useSelector((state) => state.run);
    const [extraInfo,setExtraInfo] = useState([])
    console.log(run)
    useEffect( () => {
        let isSubscribed = true
        fetch(`https://www.giantbomb.com/api/game/${run.game_id}/?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then( response => response.json() )
        .then(data => {
            if (isSubscribed) {
            setExtraInfo(data.results)
            }
        });
        return () => isSubscribed = false
    }, [])

const achievementsList = run.achievements?.split(/[.:;?!~,`"&|()<>{}\[\]\r\n\\]+/)
console.log(achievementsList)
    return (
        <Container>
        {run ? 
            <Carousel>
            { extraInfo.image ?
                <Carousel.Item>
                    <img className="d-block h-100 mx-auto" alt="Game Box Art" src={extraInfo.image.medium_url}></img>
                </Carousel.Item>
                : null }
                { run.photos ? run.photos.map((aPhoto) => {return (
                    <Carousel.Item key={run.id}>
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
            {run ? 
            <RunInfo>
                <h1>{run.name}</h1>
                <br></br>
                Beaten on: {' '}{run.date_completed}
                <br></br>
                Completed in:{' '}{run.run_time}
                <br></br>
                Beaten by:{' '}{run.users.map((user)=>`${user.username} `)}
                <br></br>
                Achievements: {' '} {run.achievements?.split(/[.:;?!~,`"&|()<>{}\[\]\r\n\\]+/)}
            </RunInfo> : null}
            </Container>
    )
}

export default RunCollectionGame
const RunInfo = styled.div ` 
text-align: center
 `;
