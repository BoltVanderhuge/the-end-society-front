import React, { useState, useEffect } from "react";
import "./Poll.css";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';

function Poll() {
  const user = useSelector((state) => state.user);
  const [voteData, setVoteData] = useState();
  const [totalVotes, setTotalVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const token = localStorage.getItem("token");

  const url = "http://localhost:3000/polls";
  const meeting_number = 1
  useEffect(() => {
    fetch(`${url}/${meeting_number}`)
    .then((response) => response.json())
    .then((data) => {
      setVoteData(data);
      let sum = 0;
      data.forEach(function (obj) {
        sum += obj.votes;
      });
      setTotalVotes(sum);
      
      fetch(`${process.env.REACT_APP_BACKEND_URL}/userpoll`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    .then( response => response.json() )
    .then(data => {
      if(data.length > 0) {
        setVoted(true)
      } 
    }
      );


    });
}, [token]);

const submitVote = (e) => {
  if(voted === false) {
    const voteSelected = parseInt(e.target.dataset.id)-1;
    const voteCurrent = voteData[voteSelected].votes;
    voteData[voteSelected].votes = voteCurrent + 1;
    voteData[voteSelected].users = [user.id];
    setTotalVotes(totalVotes + 1);
    setVoted(!voted);
    const id = voteData[voteSelected].id
    const options = {
      method: "PATCH",
      body: JSON.stringify(voteData[voteSelected]),
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}` },
    };
    fetch(`${url}/${id}`, options)
      .then((res) => res.json())
  }
};   

  let pollOptions;
  if (voteData) {
    const orderedMap = voteData.sort(function (a, b) {
      return a.id - b.id;
    });

    pollOptions = orderedMap.map((item) => {
      return (
        <li key={item.id}>
          <Button variant="dark" onClick={submitVote} data-id={item.id}>
            {item.option}
            <span>- {item.votes} Votes</span>
          </Button>          
        </li>
      );
    });
  }  

  return (
    <div className="poll">
      <h1>What day works for the next meeting?</h1>
      <ul className={voted ? "results" : "options"}>{pollOptions}</ul>
      <p>Total Votes: {totalVotes}</p>
    </div>
  );
  
}

export default Poll;