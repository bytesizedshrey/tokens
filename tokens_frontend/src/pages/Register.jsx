import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeClosed = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const CheckIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff453a">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
)

const Spinner = () => (
  <svg className="spinning" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

const getStrength = (pw) => {
  let score = 0
  if (!pw) return { score: 0, label: '', color: '#1e1e1e' }
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const map = [
    { label: '', color: '#1e1e1e' },
    { label: 'Weak', color: '#ff453a' },
    { label: 'Fair', color: '#ff9f0a' },
    { label: 'Good', color: '#5b9cf6' },
    { label: 'Strong', color: '#30d158' },
  ]
  return { score, ...map[score] }
}

const Rule = ({ met, text }) => (
  <li className="pw-rule" style={{ color: met ? '#28a745' : '#aeaeb2' }}>
    <span
      className="pw-rule-dot"
      style={{
        background: met ? '#28a745' : '#d0d6e0',
        boxShadow: met
          ? 'inset 1px 1px 3px rgba(0,100,30,0.25), 0 0 6px rgba(40,167,69,0.25)'
          : 'inset 2px 2px 4px rgba(150,165,190,0.50), inset -1px -1px 3px rgba(255,255,255,0.80)',
        color: '#fff',
      }}
    >
      {met && <CheckIcon />}
    </span>
    {text}
  </li>
)

const Register = () => {

  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, errors, onRegister, navigate } = useAuth()

  const password = watch('password', '')
  const strength = getStrength(password)

  const rules = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(password), text: 'One special character' },
  ]

  const onSubmit = async (data) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    console.log(data)
    setIsLoading(false)
  }

  return (
    <div className="auth-page" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="auth-card">

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Fill in your details to get started.</p>

        <form onSubmit={handleSubmit(onRegister)} noValidate>

          {/* Full name */}
          <div className="field">
            <label htmlFor="reg-name" className="field-label">Full name</label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              className={`field-input${errors.name ? ' has-error' : ''}`}
              {...register('name', {
                required: 'Full name is required.',
                minLength: { value: 2, message: 'Name must be at least 2 characters.' },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: 'Letters, spaces, hyphens, and apostrophes only.',
                },
              })}
            />
            {errors.name && (
              <p className="field-error" role="alert"><ErrorIcon /> {errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="reg-email" className="field-label">Email</label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`field-input${errors.email ? ' has-error' : ''}`}
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
            />
            {errors.email && (
              <p className="field-error" role="alert"><ErrorIcon /> {errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="reg-password" className="field-label">Password</label>
            <div className="input-wrap">
              <input
                id="reg-password"
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a password"
                className={`field-input${errors.password ? ' has-error' : ''}`}
                {...register('password', {
                  required: 'Password is required.',
                  minLength: { value: 8, message: 'Minimum 8 characters.' },
                  validate: {
                    hasUpper:   (v) => /[A-Z]/.test(v) || 'Include an uppercase letter.',
                    hasNumber:  (v) => /[0-9]/.test(v) || 'Include a number.',
                    hasSpecial: (v) => /[^A-Za-z0-9]/.test(v) || 'Include a special character.',
                  },
                })}
              />
              <button
                type="button"
                id="reg-toggle-pw"
                className="toggle-pw"
                aria-label={showPw ? 'Hide password' : 'Show password'}
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>

            {/* Strength */}
            {password && (
              <>
                <div className="strength-track">
                  <div
                    className="strength-fill"
                    style={{ width: `${(strength.score / 4) * 100}%`, backgroundColor: strength.color }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
                  <ul className="pw-rules">
                    {rules.map((r) => <Rule key={r.text} met={r.met} text={r.text} />)}
                  </ul>
                  {strength.label && (
                    <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
                  )}
                </div>
              </>
            )}

            {errors.password && !password && (
              <p className="field-error" role="alert"><ErrorIcon /> {errors.password.message}</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="field">
            <label htmlFor="reg-confirm" className="field-label">Confirm password</label>
            <div className="input-wrap">
              <input
                id="reg-confirm"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className={`field-input${errors.confirmPassword ? ' has-error' : ''}`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password.',
                  validate: (v) => v === password || 'Passwords do not match.',
                })}
              />
              <button
                type="button"
                id="reg-toggle-confirm"
                className="toggle-pw"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error" role="alert"><ErrorIcon /> {errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="check-row">
            <input
              id="reg-terms"
              type="checkbox"
              {...register('terms', { required: 'You must accept the terms to continue.' })}
            />
            <label htmlFor="reg-terms" className="check-label">
              I agree to the{' '}
              <Link to="/terms" className="auth-link">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="auth-link">Privacy Policy</Link>
            </label>
          </div>
          {errors.terms && (
            <p className="field-error" style={{ marginTop: -14, marginBottom: 16 }} role="alert">
              <ErrorIcon /> {errors.terms.message}
            </p>
          )}

          {/* Submit */}
          <button
            id="reg-submit"
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <><Spinner /> Creating account…</> : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}

          <span
            className="text-blue-400"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>

        </p>
      </div>
    </div>
  )
}

export default Register