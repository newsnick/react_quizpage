import React, { useState } from 'react'
import styles from '../../styles/ProductQuiz/ProductQuiz.module.css'

const ProductQuiz = () => {
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const questions = [
    {
      question: 'What is the maximum resolution of the product?',
      options: ['HD', 'Full HD', '4K', '8K'],
      correctAnswer: 2,
    },
    {
      question: 'Which operating system does the product support?',
      options: ['Windows', 'Mac OS', 'Linux', 'All of the above'],
      correctAnswer: 3,
    },
    {
      question: 'What is the storage capacity of the product?',
      options: ['128GB', '256GB', '512GB', '1TB'],
      correctAnswer: 3,
    },
    {
      question: 'What is the battery life of the product?',
      options: [
        'Up to 4 hours',
        'Up to 8 hours',
        'Up to 12 hours',
        'Up to 24 hours',
      ],
      correctAnswer: 2,
    },
  ]

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }))
  }

  const calculateScore = () => {
    let newScore = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore++
      }
    })
    return newScore
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      const newScore = calculateScore()
      setScore(newScore)
    } else {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setScore(0)
    setIsSubmitted(false)
  }

  const passMessage = (
    <h3 style={{ color: 'green' }}>Congratulations! You passed the test.</h3>
  )
  const failMessage = (
    <h3 style={{ color: 'red' }}>
      Sorry, you did not pass the test. Please try again.
    </h3>
  )
  const incompleteMessage = (
    <h3 style={{ color: 'red' }}>Please answer all questions.</h3>
  )

  return (
    <div className={styles.container}>
      <div className="col-12 m-5">
        <h3 className={styles.title}>Product Quiz</h3>
        {questions.map((question, index) => (
          <div className="col-md-7 text-center border" key={index}>
            <h3 className="form-label m-2">{question.question}</h3>
            {question.options.map((option, optionIndex) => (
              <label className="col-md-2" key={optionIndex}>
                <input
                  type="radio"
                  value={optionIndex}
                  checked={answers[index] === optionIndex}
                  onChange={() => handleAnswerChange(index, optionIndex)}
                  className={styles.radioButton}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <div className={styles.buttons}>
          <div className="text-center">
            {' '}
            {isSubmitted &&
              Object.keys(answers).length !== questions.length &&
              incompleteMessage}
            {score > 0 && (
              <>
                <h1>Your score is: {score}</h1>
                {score >= 3 ? passMessage : failMessage}
              </>
            )}
          </div>
          <div className="d-grid gap-2 col-4 mx-auto">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>{' '}
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>{' '}
        </div>
      </div>
    </div>
  )
}

export default ProductQuiz
