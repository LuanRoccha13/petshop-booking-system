import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button, Input, Icon } from '../components/ui';
import { validatePassword } from '../utils/validation';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setIsLoading(true);

    const passwordError = validatePassword(password);
    const confirmError = password !== confirmPassword ? 'As senhas não coincidem' : undefined;

    if (passwordError || confirmError) {
      setFieldErrors({
        ...(passwordError && { password: passwordError }),
        ...(confirmError && { confirmPassword: confirmError }),
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login', { replace: true });
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 w-full">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Nova senha</h1>
          <p className="text-ink-muted">Crie uma nova senha segura para sua conta.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="new-password" className="text-sm font-semibold text-ink">Nova senha</label>
            <Input
              id="new-password"
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
            />
            {fieldErrors.password && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldErrors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-password" className="text-sm font-semibold text-ink">Confirmar senha</label>
            <Input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a nova senha"
              error={!!fieldErrors.confirmPassword}
              leftIcon={<Icon name="CircleCheck" size={18} />}
              required
            />
            {fieldErrors.confirmPassword && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldErrors.confirmPassword}
              </span>
            )}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
            Redefinir senha
          </Button>
        </form>

        <p className="text-center text-sm text-ink-muted mt-4">
          Lembrou a senha?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            Voltar para o login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
