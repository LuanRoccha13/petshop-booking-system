import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button, Input, Icon } from '../components/ui';
import { validateEmail } from '../utils/validation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldError(null);
    setIsLoading(true);

    const error = validateEmail(email);
    if (error) {
      setFieldError(error);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="flex flex-col gap-6 w-full text-center items-center">
          <div className="w-16 h-16 bg-success-soft text-success rounded-full flex items-center justify-center mb-2">
            <Icon name="MailCheck" size={32} />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink">E-mail enviado!</h1>
          <p className="text-ink-muted leading-relaxed max-w-sm">
            Enviamos um link de recuperação para <strong>{email}</strong>. 
            Verifique sua caixa de entrada e spam.
          </p>
          <Link to="/login" className="w-full mt-4">
            <Button className="w-full" size="lg" variant="secondary">
              Voltar para o login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 w-full">
        <div>
          <Link to="/login" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink mb-6 transition-colors">
            <Icon name="ArrowLeft" size={16} />
            <span className="text-sm font-semibold">Voltar</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Recuperar senha</h1>
          <p className="text-ink-muted">Digite seu e-mail para receber um link de redefinição seguro.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-email" className="text-sm font-semibold text-ink">E-mail cadastrado</label>
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              error={!!fieldError}
              leftIcon={<Icon name="Mail" size={18} />}
              required
              autoComplete="email"
            />
            {fieldError && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldError}
              </span>
            )}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
            Enviar link de recuperação
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
