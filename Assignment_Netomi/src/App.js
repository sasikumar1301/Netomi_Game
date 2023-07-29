import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/lg1.avif', matched: false },
  { src: '/img/lg7.avif', matched: false },
  { src: '/img/lg3.avif', matched: false },
  { src: '/img/lg4.avif', matched: false },
  { src: '/img/lg8.avif', matched: false },
  { src: '/img/lg9.avif', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [seeTurns, setSeeTurns] = useState(false)
  const [success, setSuccess] = useState(0)


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => {
        return Math.random() - 0.5
      })
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
    setSeeTurns(true)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setSuccess((prev)=>prev+1)
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  // reset coice & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }
  console.log(turns)

  console.log(cards)

  return (
    <div className="App">
      <h1 className='heading'>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      {success===6 && <p className='success'>Congratulations</p>}
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          )
        })}
        
        
      </div>
      
      
      {seeTurns&& <p className='para'>Turns:{turns}</p>}
    </div>
  )
}

export default App
