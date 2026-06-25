import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/errors';
import { validateEmail, validatePassword } from '../utils/validation';

/* ─── Shared AuthLayout (duplicated here to avoid circular imports) ─────────── */
function AuthLayout({
  children,
  title,
  subtitle,
  badgeText,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  badgeText: string;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-hero)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,90,40,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      <header
        style={{
          padding: '0 var(--space-6)',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: 'var(--border-subtle)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            height: 64,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--color-text)',
              textDecoration: 'none',
            }}
            aria-label="Voltar para a página inicial"
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-cta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              🐾
            </span>
            PetShop <span style={{ color: 'var(--color-brand-500)', marginLeft: 4 }}>B&T</span>
          </a>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-10) var(--space-6)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 460,
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: 'var(--border-subtle)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'clamp(var(--space-8), 5vw, var(--space-12))',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--color-brand-soft)',
              border: '1px solid rgba(255,107,53,0.22)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 14px',
              marginBottom: 'var(--space-5)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-brand-600)',
            }}
          >
            <span aria-hidden="true">🐾</span>
            {badgeText}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 15,
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-8)',
              lineHeight: 1.55,
            }}
          >
            {subtitle}
          </p>
          {children}
        </div>
      </main>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ animation: 'spin 0.7s linear infinite', flexShrink: 0 }}
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M9 2a7 7 0 017 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div className="field" style={{ marginBottom: 'var(--space-5)' }}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`field-input${error ? ' is-error' : ''}`}
        style={{
          borderColor: error ? 'var(--color-danger)' : undefined,
          boxShadow: error ? '0 0 0 4px rgba(217,48,54,0.1)' : undefined,
        }}
      />
      {hint && !error && (
        <span id={`${id}-hint`} style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
          {hint}
        </span>
      )}
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            color: 'var(--color-danger)',
            marginTop: 'var(--space-1)',
            fontWeight: 500,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="6" opacity="0.15" />
            <path d="M6 3.5v3M6 8.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── RegisterPage ──────────────────────────────────────────────────────────── */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setIsLoading(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setFieldErrors({
        ...(emailError && { email: emailError }),
        ...(passwordError && { password: passwordError }),
      });
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/api/auth/register', { email, password });
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      badgeText="Cadastro grátis"
      title="Crie sua conta"
      subtitle="Pronto para cuidar do seu pet do jeito certo? Leva menos de 1 minuto."
    >
      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="register-email"
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          placeholder="seu@email.com"
          required
          autoComplete="email"
        />
        <Field
          id="register-password"
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          placeholder="Mínimo 6 caracteres"
          required
          autoComplete="new-password"
          hint="Use ao menos 6 caracteres para manter sua conta segura."
        />

        {error && (
          <div className="banner banner-error" role="alert" style={{ marginBottom: 'var(--space-5)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
              <path d="M9 5.5v4M9 11.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="banner banner-success" role="status" style={{ marginBottom: 'var(--space-5)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {success}
          </div>
        )}

        <button
          id="register-submit-btn"
          type="submit"
          disabled={isLoading || !!success}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 'var(--space-2)', justifyContent: 'center' }}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner />
              Criando conta...
            </>
          ) : success ? (
            'Conta criada! ✓'
          ) : (
            'Criar conta grátis'
          )}
        </button>
      </form>

      <p
        style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          fontSize: 14,
          color: 'var(--color-text-muted)',
        }}
      >
        Já tem conta?{' '}
        <a
          href="/login"
          style={{
            color: 'var(--color-brand-600)',
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: '1px solid transparent',
            transition: 'border-color var(--motion-base)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--color-brand-600)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
          Entrar
        </a>
      </p>
    </AuthLayout>
  );
}
