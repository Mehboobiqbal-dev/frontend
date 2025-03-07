import { useState } from 'react'

export default function Question({ question, onSubmit, loading }) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    onSubmit(answer)
    setAnswer('')
  }

  return (
    <div>
      <h2>{question.text}</h2>
      {question.options.map((opt, index) => (
        <div key={index}>
          <input
            type="radio"
            name="answer"
            value={opt}
            checked={answer === opt}
            onChange={e => setAnswer(e.target.value)}
          />
          <label>{opt}</label>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={loading || !answer}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}