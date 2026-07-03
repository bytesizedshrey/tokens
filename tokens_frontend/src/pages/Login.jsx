import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'

const EyeOpen = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff453a">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const Spinner = () => (
  <svg
    className="spinning"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, onLogin, navigate } = useAuth()

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Enter your credentials to continue.</p>

        <form onSubmit={handleSubmit(onLogin)} noValidate>
          {/* Email */}
          <div className="field">
            <label htmlFor="login-email" className="field-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`field-input${errors.email ? " has-error" : ""}`}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="field-error" role="alert">
                <ErrorIcon /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="field">
            <div className="forgot-row">
              <label
                htmlFor="login-password"
                className="field-label"
                style={{ margin: 0 }}
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="auth-link"
                style={{ fontSize: "12px" }}
              >
                Forgot?
              </Link>
            </div>
            <div className="input-wrap">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={`field-input${errors.password ? " has-error" : ""}`}
                {...register("password", {
                  required: "Password is required.",
                  minLength: { value: 8, message: "Minimum 8 characters." },
                })}
              />
              <button
                type="button"
                id="login-toggle-pw"
                className="toggle-pw"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
            {errors.password && (
              <p className="field-error" role="alert">
                <ErrorIcon /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <div className="check-row" style={{ marginBottom: "24px" }}>
            <input
              id="login-remember"
              type="checkbox"
              {...register("rememberMe")}
            />
            <label htmlFor="login-remember" className="check-label">
              Keep me signed in
            </label>
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="auth-footer">
          No account?{" "}
          <span
            className="text-blue-400"
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            Create one
          </span>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
