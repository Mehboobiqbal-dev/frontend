import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const startExam = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/exam/start`, 
        { examId: 'example-exam-id' }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      router.push(`/exam/${res.data.sessionId}`)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to start exam')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={startExam} disabled={loading}>
        {loading ? 'Starting...' : 'Start Exam'}
      </button>
    </div>
  )
}