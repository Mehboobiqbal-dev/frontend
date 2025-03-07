import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({ children }) {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token') && router.pathname !== '/login' && router.pathname !== '/register') {
      router.push('/login')
    }
  }, [router])

  return (
    <div>
      <main>{children}</main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}