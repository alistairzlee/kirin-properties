import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const pageRef = useRef<HTMLElement>(null)
  const splitTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight

    const handleMouseMove = (event: MouseEvent) => {
      const splitText = splitTextRef.current
      const normalizedPosition = event.pageX / (viewportWidth / 2) - 1
      const speedSlow = 88 * normalizedPosition

      const normalizedX = event.clientX / viewportWidth - 0.5
      const normalizedY = event.clientY / viewportHeight - 0.5

      const page = pageRef.current
      if (page) {
        page.style.setProperty('--bg-x', `${normalizedX * 120}px`)
        page.style.setProperty('--bg-y', `${normalizedY * 88}px`)
      }

      if (!splitText) {
        return
      }

      splitText.style.setProperty('--slide-slow', `${speedSlow}px`)
    }

    const handleResize = () => {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) {
      return
    }
    setIsSubmitted(true)
  }

  return (
    <main className="jp-page" ref={pageRef}>
      <div className="room-bg" aria-hidden="true"></div>
      <div className="noise" aria-hidden="true"></div>

      <div className="split-title split-title-overlay" ref={splitTextRef} aria-label="Kirin Properties">
        <div className="split-line">
          <div className="split-left">
            <div className="split-content">
              <span className="split-slow">Kirin Properties</span>
            </div>
          </div>
          <div className="split-right">
            <div className="split-content">
              <span className="split-slow">Kirin Properties</span>
            </div>
          </div>
        </div>
      </div>

      <section className="hero-card">
        <h1>Under Construction.</h1>
        <p className="lead">
          Intentional spaces designed for modern living. We are preparing a quiet, well-managed real estate portfolio built for flexible short- and mid-term stays, defined by Japandi principles and quiet luxury.
        </p>

        <div className="divider" aria-hidden="true">
          <span></span>
        </div>

        <div className="status-grid" aria-label="Project status">
          <article className="status-box">
            <span className="status-orb" aria-hidden="true"></span>
            <div className="status-content">
              <h2>PORTFOLIO CURATION</h2>
              <p>Acquiring and preparing residential properties for short and mid-term stays.</p>
            </div>
          </article>
          <article className="status-box">
            <span className="status-orb" aria-hidden="true"></span>
            <div className="status-content">
              <h2>CLIENT EXPERIENCES</h2>
              <p>Hosting corporate clients and travelers with quiet, well-managed luxury spaces.</p>
            </div>
          </article>
          <article className="status-box">
            <span className="status-orb" aria-hidden="true"></span>
            <div className="status-content">
              <h2>LAUNCH WINDOW</h2>
              <p>Deploying our asset portfolio and guest platform through Fall 2026</p>
            </div>
          </article>
        </div>

        <div className="notify-wrap">
          {isSubmitted ? (
            <p className="confirm" role="status">
              Thank you. You are on the priority list.
            </p>
          ) : (
            <form className="notify-form" onSubmit={handleSubmit}>
              <label htmlFor="notify-email">Get launch updates</label>
              <div className="form-row">
                <input
                  id="notify-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <button type="submit">Notify Me</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
