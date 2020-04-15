import React, { useState } from "react"

import countries from "./countries.json"

const numOptions = 3
const numQuestions = 10

const getQuiz = () => {
  let shuffledCountries = countries.sort(() => 0.5 - Math.random())
  let selectedCountries = shuffledCountries.slice(0, numOptions)
  let correctIndex = Math.floor(Math.random() * numOptions)

  selectedCountries = selectedCountries.map((country, index) => (
    { ...country, isCorrect: index === correctIndex }
  ))

  return selectedCountries
}

export default function Peli() {
  const [stats, setStats] = useState({ right: 0, total: 0, stop: false })
  const [quiz, setQuiz] = useState(getQuiz())

  const answer = (guess) => {
    const correctAnswer = quiz.find((option) => option.nimi === guess).isCorrect
    const firstAnswer = quiz.find((option) => option.isClicked) === undefined

    if (correctAnswer) {
      setStats({
        right: firstAnswer ? stats.right + 1 : stats.right,
        total: stats.total + 1,
        stop: stats.total == numQuestions - 1,
      })
      setQuiz(getQuiz())
    } else {
      setQuiz(
        quiz.map((option) =>
          option.nimi === guess ? { ...option, isClicked: true } : option
        )
      )
    }
  }

  let buttons = quiz.map((option, index) => (
    <button
      key={index}
      disabled={option.isClicked}
      onClick={() => answer(option.nimi)}
    >
      {option.nimi}
    </button>
  ))

  if (stats.stop) {
    return (
      <>
        Valmis!
        <br />
        Oikeita vastauksia {stats.right}
        <br />
        Vääriä vastauksia {stats.total - stats.right}
        <br />
        <button onClick={() => setStats({ right: 0, total: 0, stop: false })}>
          Uudelleen
        </button>
      </>
    )
  } else {
    return (
      <>
        <div>Kysymys: {stats.total + 1}</div>
        <img src={quiz.find((q) => q.isCorrect).kuva} />
        <div>{buttons}</div>
      </>
    )
  }
}
