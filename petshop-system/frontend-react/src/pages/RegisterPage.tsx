import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import registerImage from '../assets/images/mais-imagens-pet-shop/pexels-barczakshoots-7889819.jpg';
import { api } from '../services/api';
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
      />
      {hint && !error && (
        <span id={`${id}-hint`} className="field-helper">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className="field-helper is-error">
          {error}
        </span>
      )}
    </div>
  );
}

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
      setSuccess('Conta criada com sucesso. Você já será levado para o login.');
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      badgeText="Primeiro acesso"
      title={
        <>
          Crie sua conta.
          <br />
          Reserve com elegância.
        </>
      }
      subtitle="Leva menos de um minuto para começar. Depois disso, seu próximo banho ou tosa fica sempre a poucos toques."
      visualLabel="Chegada suave"
      visualTitle={
        <>
          Menos correria,
          <br />
          mais cuidado real.
        </>
      }
      visualCopy="Um cadastro simples abre espaço para uma rotina organizada, com lembranças, horários e acolhimento desde o primeiro clique."
      imageSrc={registerImage}
      imageAlt="Pet em cena afetiva pronto para receber cuidados"
      floatingTitle="Conta em preparação"
      floatingText="Seus próximos agendamentos ficam centralizados, claros e sempre acessíveis."
      footer={
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: 'var(--color-brand-600)', fontWeight: 600 }}>
            Entrar
          </Link>
        </p>
      }
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
          hint="Use uma senha com pelo menos 6 caracteres para proteger seus dados."
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
            'Conta criada ✓'
          ) : (
            'Criar conta'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
