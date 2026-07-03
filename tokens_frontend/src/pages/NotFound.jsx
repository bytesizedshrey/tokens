import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Floating particle dots ── */
const Particle = ({ style }) => (
  <span
    style={{
      position: 'absolute',
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#1a6ef5',
      opacity: 0.18,
      ...style,
    }}
  />
)

/* ── Scramble text hook ── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'
function useScramble(target, running) {
  const [display, setDisplay] = useState(target)
  const frame = useRef(0)
  const iter = useRef(0)

  useEffect(() => {
    if (!running) { setDisplay(target); return }
    iter.current = 0
    const interval = setInterval(() => {
      setDisplay(
        target
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < iter.current) return target[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (iter.current >= target.length) clearInterval(interval)
      iter.current += 0.4
    }, 40)
    return () => clearInterval(interval)
  }, [running, target])

  return display
}

const NotFound = () => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const containerRef = useRef(null)

  const headline = useScramble('PAGE NOT FOUND', hovered)

  /* Custom cursor tracking */
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* Scattered particles */
  const particles = Array.from({ length: 18 }, (_, i) => ({
    top: `${Math.sin(i * 1.3) * 40 + 50}%`,
    left: `${Math.cos(i * 1.7) * 40 + 50}%`,
    width: i % 3 === 0 ? 8 : 5,
    height: i % 3 === 0 ? 8 : 5,
    opacity: 0.10 + (i % 4) * 0.04,
    animationDelay: `${i * 0.3}s`,
  }))

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: '#e4e9f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Custom cursor dot */}
      <div
        style={{
          position: 'fixed',
          top: cursor.y - 6,
          left: cursor.x - 6,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#1a6ef5',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Cursor ring */}
      <div
        style={{
          position: 'fixed',
          top: cursor.y - 20,
          left: cursor.x - 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #1a6ef5',
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'top 0.06s ease, left 0.06s ease',
        }}
      />

      {/* Scattered particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Retro grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(26,110,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,110,245,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Main card */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #f4f7fb, #edf1f7)',
          borderRadius: 22,
          padding: '56px 52px',
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          boxShadow:
            '-3px -3px 7px rgba(255,255,255,0.75), 3px 3px 8px rgba(180,190,210,0.40), inset 0 1px 0 rgba(255,255,255,0.90)',
          animation: 'fadeUp 0.4s ease both',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Error code */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: '-4px',
            lineHeight: 1,
            color: '#1a6ef5',
            fontVariantNumeric: 'tabular-nums',
            /* Inset pressed number */
            textShadow:
              '2px 2px 4px rgba(160,175,200,0.4), -1px -1px 2px rgba(255,255,255,0.9)',
            marginBottom: 4,
            userSelect: 'none',
          }}
        >
          404
        </div>

        {/* Scrambled headline */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#8e8e93',
            textTransform: 'uppercase',
            marginBottom: 20,
            fontFamily: "'Inter', monospace",
            minHeight: 18,
          }}
        >
          {headline}
        </div>

        {/* Separator */}
        <div
          style={{
            width: 40,
            height: 2,
            background: '#1a6ef5',
            borderRadius: 99,
            margin: '0 auto 24px',
            boxShadow:
              'inset 1px 1px 2px rgba(0,40,140,0.20), inset -1px -1px 1px rgba(100,160,255,0.15)',
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: '#6e6e73',
            lineHeight: 1.65,
            margin: '0 0 36px',
            fontWeight: 400,
          }}
        >
          Looks like this page took a wrong turn. <br />
          It doesn't exist — or maybe it never did.
        </p>

        {/* Buttons row */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Primary — Go home */}
          <button
            id="not-found-home-btn"
            onClick={() => navigate('/')}
            style={{
              height: 44,
              padding: '0 28px',
              borderRadius: 10,
              border: 'none',
              background: '#1a6ef5',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow:
                '-2px -2px 5px rgba(255,255,255,0.30), 2px 2px 6px rgba(15,60,180,0.25), inset 0 1px 0 rgba(255,255,255,0.20)',
              transition: 'transform 0.1s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go home
          </button>

          {/* Secondary — Go back */}
          <button
            id="not-found-back-btn"
            onClick={() => navigate(-1)}
            style={{
              height: 44,
              padding: '0 28px',
              borderRadius: 10,
              border: 'none',
              background: 'transparent',
              color: '#6e6e73',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow:
                '-2px -2px 5px rgba(255,255,255,0.75), 2px 2px 5px rgba(180,190,210,0.35)',
              transition: 'transform 0.1s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Go back
          </button>
        </div>

        {/* Hover hint */}
        <p
          style={{
            marginTop: 28,
            fontSize: 11,
            color: '#aeaeb2',
            letterSpacing: '0.05em',
            fontWeight: 500,
          }}
        >
          {hovered ? '// DECODING...' : '// HOVER TO SCRAMBLE'}
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default NotFound
