import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errors';
import { validateEmail, validatePassword } from '../utils/validation';

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
    <main style={{ maxWidth: 420, margin: '0 auto', padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={fieldErrors.email ? { borderColor: '#dc2626' } : {}}
            required
          />
          {fieldErrors.email && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={fieldErrors.password ? { borderColor: '#dc2626' } : {}}
            required
          />
          {fieldErrors.password && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{fieldErrors.password}</p>}
        </div>
        {error && <p style={{ color: '#dc2626', marginTop: 12 }}>{error}</p>}
        <button type="submit" disabled={isLoading} style={{ marginTop: 16, opacity: isLoading ? 0.6 : 1 }}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ marginTop: 16 }}>
        Ainda não tem conta? <a href="/register">Cadastre-se</a>
      </p>
    </main>
  );
}
