import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button, Input, Icon } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errors';
import { validateEmail, validatePassword } from '../utils/validation';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
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
    const nameError = name.trim().length < 3 ? 'Nome deve ter no mínimo 3 caracteres' : undefined;

    if (emailError || passwordError || nameError) {
      setFieldErrors({
        ...(nameError && { name: nameError }),
        ...(emailError && { email: emailError }),
        ...(passwordError && { password: passwordError }),
      });
      setIsLoading(false);
      return;
    }

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 w-full">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink mb-6 transition-colors">
            <Icon name="ArrowLeft" size={16} />
            <span className="text-sm font-semibold">Voltar para home</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Criar conta</h1>
          <p className="text-ink-muted">Inicie o ritual de cuidado do seu pet.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-name" className="text-sm font-semibold text-ink">Nome completo</label>
            <Input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como prefere ser chamado"
              error={!!fieldErrors.name}
              leftIcon={<Icon name="User" size={18} />}
              required
              autoComplete="name"
            />
            {fieldErrors.name && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldErrors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-email" className="text-sm font-semibold text-ink">E-mail</label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              error={!!fieldErrors.email}
              leftIcon={<Icon name="Mail" size={18} />}
              required
              autoComplete="email"
            />
            {fieldErrors.email && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldErrors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-password" className="text-sm font-semibold text-ink">Senha</label>
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              error={!!fieldErrors.password}
              leftIcon={<Icon name="Lock" size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-ink-muted hover:text-ink focus:outline-none focus-visible:shadow-focus rounded"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
                </button>
              }
              required
              autoComplete="new-password"
            />
            {fieldErrors.password && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldErrors.password}
              </span>
            )}
          </div>

          {error && (
            <div className="bg-danger-soft border border-danger/20 text-danger px-4 py-3 rounded-lg text-sm font-semibold flex items-start gap-3 mt-2" role="alert">
              <Icon name="TriangleAlert" size={18} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
            Finalizar cadastro
          </Button>
        </form>

        <p className="text-center text-sm text-ink-muted mt-4">
          Já possui conta?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            Fazer login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
