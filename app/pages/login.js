import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      toast.success('Logged in successfully')
      router.push('/')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>Don’t have an account? <a href="/register">Register</a></p>
    </form>
  )
}