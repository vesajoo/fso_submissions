import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Title = (props) => (
  <h1>{props.text}</h1>
)

const Anecdote = (props) => (
  <p>{props.text}</p>
)

const Votes = (props) => (
  <p>has {props.value} votes</p>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialPoints = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initialPoints)
  const [mostVotes, setMostVotes] = useState("No votes yet")

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    if (Math.max(...points) < copy[selected]) {
      setMostVotes([anecdotes[selected], copy[selected]])
    }
  }
  
  return (
    <div>
      <Title text='Anecdote of the day'></Title>
      <Anecdote text={anecdotes[selected]}></Anecdote>
      <Votes value={points[selected]}></Votes>
      <Button handleClick={handleVoteClick} text='vote'/>
      <Button handleClick={handleRandomClick} text='next anecdote'/>
      <Title text='Anecdote with the most votes'></Title>
      <Anecdote text={mostVotes[0]}></Anecdote>
      <Votes value={mostVotes[1]}></Votes>
    </div>
  )
}

export default App