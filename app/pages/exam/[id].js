import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import Question from '../../components/Question'

export default function Exam() {
  const router = useRouter()
  const { id } = router.query
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) fetchQuestion()
  }, [id])

  const fetchQuestion = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam/question/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.data.message === 'Exam completed') {
        toast.success('Exam completed!')
        router.push('/certificate')
      } else {
        setQuestion(res.data)
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load question')
    } finally {
      setLoading(false)
    }
  }

  const submitAnswer = async (answer) => {
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/exam/answer/${id}`, 
        { questionId: question._id, answer },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      if (res.data.next) {
        fetchQuestion()
      } else {
        toast.success('Exam completed!')
        router.push('/certificate')
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit answer')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !question) return <p>Loading...</p>
  if (!question) return null

  return <Question question={question} onSubmit={submitAnswer} loading={loading} />
}