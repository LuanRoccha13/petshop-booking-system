import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button, Input, Checkbox, Icon } from '../components/ui';
import { MOTION } from '../design-tokens/motion';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errors';
import { validateEmail, validatePassword } from '../utils/validation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION.stagger.base,
      delayChildren: 0.1, // Espera o AuthVisual entrar
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: MOTION.blur.soft },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: MOTION.blur.none,
    transition: { duration: MOTION.duration.enter, ease: MOTION.ease.premium }
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
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
    <AuthLayout>
      <motion.div 
        className="flex flex-col gap-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link to="/" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink mb-6 transition-colors">
            <Icon name="ArrowLeft" size={16} />
            <span className="text-sm font-semibold">Voltar para home</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-ink mb-2 tracking-tight">Entrar</h1>
          <p className="text-ink-muted leading-relaxed">Acompanhe seu pet no painel B&T.</p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <label htmlFor="login-email" className="text-sm font-semibold text-ink">E-mail</label>
            <Input
              id="login-email"
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
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-sm font-semibold text-ink">Senha</label>
              <Link to="/forgot-password" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <span className="text-xs font-semibold text-danger mt-1 flex items-center gap-1">
                <Icon name="CircleAlert" size={12} /> {fieldErrors.password}
              </span>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2 mt-1">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="text-sm text-ink-muted cursor-pointer select-none">
              Lembrar-me neste dispositivo
            </label>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              className="bg-danger-soft border border-danger/20 text-danger px-4 py-3 rounded-lg text-sm font-semibold flex items-start gap-3 mt-2" 
              role="alert"
            >
              <Icon name="TriangleAlert" size={18} className="shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
              Entrar agora
            </Button>
          </motion.div>
        </form>

        <motion.p variants={itemVariants} className="text-center text-sm text-ink-muted mt-4">
          Ainda não tem conta?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            Criar conta grátis
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
