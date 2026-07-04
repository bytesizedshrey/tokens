import React from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks/useAuth'

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#1a6ef5' }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const Home = () => {
  const { user } = useSelector((store) => store.auth)
  const { onLogout } = useAuth()

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: '#dde2ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 2px 2px 5px rgba(150,165,190,0.55), inset -1px -1px 3px rgba(255,255,255,0.85)'
            }}
          >
            <UserIcon />
          </div>
        </div>

        <h1 className="auth-title" style={{ marginBottom: 8 }}>
          Welcome back
        </h1>
        <p className="auth-subtitle" style={{ marginBottom: 32 }}>
          You have successfully authenticated.
        </p>

        {/* Dashboard info well */}
        <div
          style={{
            backgroundColor: '#dde2ea',
            borderRadius: 14,
            padding: '24px 20px',
            marginBottom: 32,
            boxShadow: 'inset 2px 2px 4px rgba(160, 175, 200, 0.35), inset -1px -1px 3px rgba(255, 255, 255, 0.70)',
            textAlign: 'left'
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Full Name
            </span>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1c1c1e', marginTop: 4 }}>
              {user?.name || 'Authorized User'}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Email Address
            </span>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1c1c1e', marginTop: 4, wordBreak: 'break-all' }}>
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onLogout}
          className="btn-primary"
          style={{
            background: '#ff3b30',
            boxShadow: '-2px -2px 5px rgba(255, 255, 255, 0.30), 2px 2px 6px rgba(180, 15, 15, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.20), inset 0 -1px 0 rgba(140, 0, 0, 0.12)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e03025'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ff3b30'
          }}
        >
          <LogOutIcon />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Home