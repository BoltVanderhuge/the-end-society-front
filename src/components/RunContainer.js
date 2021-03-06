import React, {useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setRuns, deleteRuns } from '../redux/runsSlice';
import { useHistory } from "react-router-dom";
import ImageContainer from './ImageContainer';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


function RunContainer() {
    const [cheevButton, setCheevButton] = useState(false)
    const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);
    const [users,setUsers] = useState([])
    const [run,setRun] = useState([])
    const [runs,setHereRuns] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([
    ]);

    function getImages(clickedRun) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runphotos/${clickedRun.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUploadedFiles(data);
        });
    }


    useEffect( () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
        .then( response => response.json() )
        .then(data => setUsers(data));
    
        fetch(`${process.env.REACT_APP_BACKEND_URL}/userruns`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
      .then( response => response.json() )
      .then(data => setHereRuns(data));
    
          
      }, [token])
    
    
    const [formData, setFormData] = useState({
        date_completed: "",
        run_time: "00:00:00:00",
        achievements: "",
        users: "",
    });
    console.log(formData)
    console.log(run)
    function handleClick(run) {
        const dateTern = run.date_completed ? run.date_completed : ""
        const userTern = run.users[1] ? run.users[1].id : ""
        const timeTern = run.run_time ? run.run_time : "00:00:00:00"
        setRun(run)
        getImages(run)
        checkCheevos(run)
        setFormData({
            date_completed: dateTern,
            run_time: timeTern,
            achievements: run.achievements,
            users: userTern,
        })
    }

    
    function checkCheevos(run){
        const boxes = document.getElementsByTagName('input');
    for (let i = 0; i < boxes.length; i++) {
        if (run.achievements.split(/[.:;?!~,`"&|()<>{}\[\]\r\n\\]+/).find(achievement => achievement === boxes[i].value)) {
            boxes[i].checked = true;
        }
        else{boxes[i].checked = false;}
      }
    }
    
        const notYou = users.filter((allUser) => allUser.id !== user.id)
        
        const userOptions = notYou.map((user)=>{
            return(
                <option key={user.id} value={user.id}>{user.username}</option>
            )
        })

    function handleChange(event) {
        const name = event.target.name;
        let value = event.target.value;
    
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    function handleCheck(e){
        const checkedArr = [];
        const name = e.target.name;
    
        if (e.target.checked){
            const checkeds = document.getElementsByTagName('input');
      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          checkedArr.push(checkeds[i].value);
        }
      }

        }
        setFormData({
            ...formData,
            [name]: checkedArr,
        });
    }

    function handleSubmit(e){
        const submitObj= {
            date_completed: formData.date_completed,
            run_time: formData.run_time,
            achievements: formData.achievements,
            users: [currentUser.id,parseInt(formData.users)],
        };

        const token = localStorage.getItem("token");
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/runs/${run.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify( submitObj )
        })
            .then(response => response.json())
            .then(updatedRun => {
                setRun(updatedRun)
                const updatedRuns = runs.map((run) => {
                    if (run.id === updatedRun.id) {
                      return  updatedRun ;
                    } else {
                      return run;
                    }
                });     
            setHereRuns(updatedRuns)
            dispatch(setRuns(updatedRuns))
            const dateTern = updatedRun.date_completed ? updatedRun.date_completed : ""
            const userTern = updatedRun.users[1] ? updatedRun.users[1].id : ""
            setFormData({
                date_completed: dateTern,
                run_time: updatedRun.run_time,
                achievements: updatedRun.achievements,
                users: userTern,
            })
            })
            history.push("/runs")
            // window.location.reload()
    }

    const runArray = runs.map((run)=>{
        return(
            <Button variant="secondary" block onClick={()=>handleClick(run)} key={run.id}>{run.name}</Button> 
        )
    })
    const achievements = ["Dress Up","No Deaths","Boozin USA","Real Hardware / Cart","Glitch","Bronze","Movie Themed Game","It's So Bad","Commentator","Opening Salvo","Pete's Revenge","Bimmy and Jimmy", "Harder Difficulty"]

    const achievementsForm = achievements.map((achievement, i)=>{
        return(
            <Form.Group key={i} controlId="formAchievements">
                <Form.Check 
                    type="checkbox"
                    name="achievements"
                    onChange={handleCheck}
                    value={achievement}
                    label={achievement}
                />{' '}
            </Form.Group>
        )
    })

    function handleDelete(e){
        const token = localStorage.getItem("token");
        
        if (window.confirm('Are you sure you wish to delete this run?')){ 
            fetch(`${process.env.REACT_APP_BACKEND_URL}/runs/${run.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedRuns = runs.filter(jeff => jeff.id !== run.id)
            setHereRuns(updatedRuns)
            setRun([])
            dispatch(deleteRuns(run))

            setFormData({
                date_completed: "",
                run_time: "",
                achievements: "",
                users: "",
            })
            const checkeds = document.getElementsByTagName('input');
            for (let i = 0; i < checkeds.length; i++) {
                if (checkeds[i].checked) {
                    checkeds[i].checked = false;
                }
              }

      history.push("/runs")
      }
    }
    function handleCheevClick(){
        setCheevButton(!cheevButton)
    }
    if (run){
       
    return (
    <Container fluid>
        
        <Form onSubmit={handleSubmit}>
        <Row>
        <Col xs={2}>
            {runArray}
        </Col>
            <Col xs={2}>
                {achievementsForm}

            <Button variant="secondary" onClick={handleCheevClick}>{cheevButton? "Hide Achievements" : "Show Achievements" }</Button>
                {cheevButton? 
                <div>
                    <br></br>
                    Dress Up:   Dress as one of the characters in the game.<br></br>
                    Harder Difficulty:  Change the options so the game is more difficult - this includes reducing the amount of lives/continues or choosing a harder difficulty if it's available.<br></br>
                    No Deaths:  Complete a run without dying / losing.<br></br>
                    Boozin USA:	Start and finish a drink during your run.<br></br>
                    Real Hardware / Cart:	Complete the game using all original hardware (no powerpak).<br></br>
                    Glitch:	Use a glitch during your game, superficial or useful.<br></br>
                    Bronze:	Complete five games at our meetings.<br></br>
                    Movie Themed Game:	There's never been a good video game movie but there's been good movie video games.<br></br>
                    It's So Bad:	Beat any game using the powerglove.<br></br>
                    Commentator:	Described your run / the technical details of your game.<br></br>
                    Opening Salvo:	Start this party off right.<br></br>
                    Pete's Revenge:	Come back and destroy a previously lost game.<br></br>
                    Bimmy & Jimmy:	Finish a game, co-op style.<br></br>
                </div>
                : null}
                
            </Col>
            <Col xs={3}>
            <Form.Label>Run Time (hh:mm:ss:ms)</Form.Label>
                    <Form.Control 
                        name="run_time" 
                        type="text" 
                        required pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}" 
                        value={formData.run_time} 
                        placeholder={formData.run_time}
                        onChange={handleChange}>
                    </Form.Control>
                <br></br>
                <Form.Label>Date Completed</Form.Label>
                <Form.Control
                    type="date"
                    step="1"
                    name="date_completed"
                    value={formData.date_completed}
                    placeholder={formData.date_completed}
                    onChange={handleChange}
                />
                
                <br></br>

                <Form.Group>
                    <Form.Label>Co-Op?</Form.Label>
                    <Form.Control as="select" name="users" value={formData.users} onChange={handleChange} custom>
                        {userOptions}
                        <option value="">No</option>
                    </Form.Control>
                </Form.Group>
                {run.users?  <ImageContainer uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} run={run} user={user} /> : null}


                <br></br>
                <Button variant="secondary" type="submit" > Submit</Button> {' '}
                <Button variant="danger" onClick={handleDelete}>??? Delete this Run ???</Button>
            
            </Col>
       </Row>
            </Form>
    </ Container>
    
    )
            } else {
                return null
            }
}

export default RunContainer
