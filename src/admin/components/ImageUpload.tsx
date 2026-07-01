import { useState, useRef } from 'react'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

type Props = {
  currentUrl?: string
  onUploaded: (url: string) => void
}

export default function ImageUpload({ currentUrl, onUploaded }: Props) {
  const [progress, setProgress] = useState(false)
  const [error, setError] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return }
    if (file.size > 10 * 1024 * 1024) { setError('Image must be under 10 MB.'); return }
    setError('')
    setProgress(true)

    try {
      console.log('[Cloudinary] cloud:', CLOUD_NAME, '| preset:', UPLOAD_PRESET)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )
      const json = await res.json()
      console.log('[Cloudinary] response:', json)
      if (!res.ok) throw new Error(json.error?.message ?? 'Upload failed')
      onUploaded(json.secure_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setProgress(false)
    }
  }

  function applyUrl() {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    onUploaded(trimmed)
    setUrlInput('')
    setShowUrlInput(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {currentUrl && (
        <img
          src={currentUrl}
          alt="current"
          style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 8, border: '1px solid #333' }}
        />
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
        <button
          type="button"
          className="btn-edit"
          onClick={() => inputRef.current?.click()}
          disabled={progress}
        >
          {progress ? 'Uploading…' : currentUrl ? 'Replace Image' : 'Upload Image'}
        </button>
        <button
          type="button"
          className="btn-edit"
          onClick={() => setShowUrlInput((v) => !v)}
        >
          Paste URL
        </button>
      </div>

      {showUrlInput && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            style={{ flex: 1 }}
            onKeyDown={(e) => e.key === 'Enter' && applyUrl()}
          />
          <button type="button" className="btn-save" style={{ margin: 0 }} onClick={applyUrl}>
            Apply
          </button>
        </div>
      )}

      {error && <span style={{ color: '#f87171', fontSize: '0.78rem' }}>{error}</span>}
    </div>
  )
}
