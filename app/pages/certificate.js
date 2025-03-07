import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Certificate() {
  const [certificateId, setCertificateId] = useState('')
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const downloadCertificate = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/certificate/generate/example-session-id`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'certificate.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Certificate downloaded')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to download certificate')
    } finally {
      setLoading(false)
    }
  }

  const verifyCertificate = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/certificate/verify/${certificateId}`)
      setDetails(res.data)
      toast.success('Certificate verified')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to verify certificate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={downloadCertificate} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Certificate'}
      </button>
      <div>
        <input
          value={certificateId}
          onChange={e => setCertificateId(e.target.value)}
          placeholder="Certificate ID"
        />
        <button onClick={verifyCertificate} disabled={loading || !certificateId}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        {details && (
          <div>
            <p>User: {details.user}</p>
            <p>Exam: {details.exam}</p>
            <p>Issued: {new Date(details.issuedAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}