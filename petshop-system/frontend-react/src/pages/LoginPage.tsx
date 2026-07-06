import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import heroImage from '../assets/images/mais-imagens-pet-shop/reba-spike-PEQIIwnIGdo-unsplash.jpg';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errors';
import { validateEmail, validatePassword } from '../utils/validation';

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
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field-input${error ? ' is-error' : ''}`}
      />
      {error && (
        <span id={`${id}-error`} role="alert" className="field-helper is-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
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
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      badgeText="Área do cliente"
      title={
        <>
          Entre com calma.
          <br />
          Seu ritual já começou.
        </>
      }
      subtitle="Acompanhe confirmações, horários e recados do atendimento em um painel limpo, rápido e acolhedor."
      visualLabel="Retorno tranquilo"
      visualTitle={
        <>
          Cada visita merece
          <br />
          a mesma delicadeza.
        </>
      }
      visualCopy="Do login ao check-in, a experiência foi desenhada para parecer premium sem deixar de ser humana."
      imageSrc={heroImage}
      imageAlt="Cachorro em retrato calmo olhando para a câmera"
      floatingTitle="Agenda confirmada"
      floatingText="Acesse horários, lembretes e cuidados do seu pet em poucos segundos."
      footer={
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Não tem conta?{' '}
          <Link to="/register" style={{ color: 'var(--color-brand-600)', fontWeight: 600 }}>
            Criar conta grátis
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="login-email"
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
          id="login-password"
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          placeholder="••••••••"
          required
          autoComplete="current-password"
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

        <button
          id="login-submit-btn"
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 'var(--space-2)', justifyContent: 'center' }}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner />
              Entrando...
            </>
          ) : (
            'Entrar agora'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
