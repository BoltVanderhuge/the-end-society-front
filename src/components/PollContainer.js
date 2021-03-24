import React, { Component } from 'react'
import Poll from 'react-polls'


const pollQuestion1 = 'What Day Works for the Next Meeting?'
const pollAnswers1 = [
  { option: '4/3', votes: 0 },
  { option: '4/10', votes: 0 },
  { option: '4/17', votes: 0 },
  { option: '4/24', votes: 0 },
]
const pollStyles1 = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true ,
  questionColor: '#303030',
  align: 'center',
  theme: 'purple'
}


export default class PollContainer extends Component {
  state = {
    pollAnswers1: [...pollAnswers1]
  }

  handleVote = (voteAnswer, pollAnswers) => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })
      this.setState({
        pollAnswers1: newPollAnswers
      })
   
  }

  componentDidMount() {
    const { pollAnswers1 } = this.state
  }


  render () {
    const { pollAnswers1 } = this.state

    return (
      <div className='app'>
        <main className='main'>
          <div>
            <Poll question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles1} noStorage />
          </div>
          <div>
              
          </div>
        </main>
      </div>
    )
  }
}

