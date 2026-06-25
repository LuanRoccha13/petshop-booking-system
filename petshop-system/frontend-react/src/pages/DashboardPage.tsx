import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Appointment, AppointmentCreate } from '../types/appointment';
import { getErrorMessage } from '../utils/errors';
import { validateAppointmentForm } from '../utils/validation';

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

function Spinner({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ animation: 'spin 0.7s linear infinite', flexShrink: 0 }}
    >
      <circle cx="9" cy="9" r="7" stroke={color} strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M9 2a7 7 0 017 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--color-text)',
        marginBottom: 'var(--space-2)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <span
      id={id}
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
      {message}
    </span>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    minHeight: 48,
    padding: '12px var(--space-4)',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--color-text)',
    background: 'var(--color-surface)',
    border: hasError ? '1.5px solid var(--color-danger)' : 'var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: hasError ? '0 0 0 3px rgba(217,48,54,0.1)' : 'none',
    transition: 'border-color var(--motion-base), box-shadow var(--motion-base)',
    boxSizing: 'border-box',
  };
}

/* ─── Image Upload Zone ──────────────────────────────────────────────────────── */
function ImageUpload({
  value,
  onChange,
  error,
}: {
  value: File | null;
  onChange: (f: File | null) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) return;
    onChange(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  return (
    <div style={{ marginBottom: 'var(--space-5)' }}>
      <FieldLabel htmlFor="dash-imageFile">Foto do pet</FieldLabel>
      <div
        role="button"
        tabIndex={0}
        aria-label="Área de upload de imagem. Clique ou arraste uma foto"
        aria-invalid={!!error}
        aria-describedby={error ? 'dash-imageFile-error' : undefined}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          width: '100%',
          minHeight: 120,
          borderRadius: 'var(--radius-lg)',
          border: `2px dashed ${isDragging ? 'var(--color-brand-500)' : error ? 'var(--color-danger)' : '#d9d3cb'}`,
          background: isDragging ? 'var(--color-brand-soft)' : 'var(--color-surface-soft)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          cursor: 'pointer',
          transition: 'border-color var(--motion-base), background var(--motion-base)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Pré-visualização do pet"
              style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 'var(--space-3)',
                transition: 'background var(--motion-base)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  opacity: 0,
                  transition: 'opacity var(--motion-base)',
                }}
                className="upload-hint"
              >
                Trocar imagem
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-brand-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M11 14V4M7 8l4-4 4 4" stroke="var(--color-brand-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 16v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="var(--color-brand-500)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-brand-600)', margin: 0 }}>
                {isDragging ? 'Solte a imagem aqui' : 'Clique ou arraste uma foto'}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
                PNG, JPG ou WEBP até 5MB
              </p>
            </div>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        id="dash-imageFile"
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />
      {error && <FieldError id="dash-imageFile-error" message={error} />}
    </div>
  );
}

/* ─── Appointment Card ───────────────────────────────────────────────────────── */
function AppointmentCard({
  appointment,
  isCancelling,
  onCancel,
}: {
  appointment: Appointment;
  isCancelling: boolean;
  onCancel: (id: number) => void;
}) {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const imageUrl = appointment.imageUrl
    ? appointment.imageUrl.startsWith('http')
      ? appointment.imageUrl
      : `${apiBase}${appointment.imageUrl}`
    : null;

  const [confirmOpen, setConfirmOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <article
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform var(--motion-base) var(--ease-standard), box-shadow var(--motion-base) var(--ease-standard)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Pet image */}
      <div
        style={{
          height: 180,
          background: 'var(--gradient-hero)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Foto de ${appointment.petName}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 48, opacity: 0.4 }} aria-hidden="true">🐾</span>
          </div>
        )}
        {/* Gradient overlay at bottom */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {/* Pet name */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          {appointment.petName}
        </h3>

        {/* Metadata chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-pill)',
              padding: '3px 10px',
              border: 'var(--border-subtle)',
            }}
          >
            🐕 {appointment.breed}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-pill)',
              padding: '3px 10px',
              border: 'var(--border-subtle)',
            }}
          >
            📅 {formatDate(appointment.date)}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-brand-600)',
              background: 'var(--color-brand-soft)',
              borderRadius: 'var(--radius-pill)',
              padding: '3px 10px',
              border: '1px solid rgba(255,107,53,0.18)',
            }}
          >
            🕐 {appointment.time}
          </span>
        </div>

        {/* Notes */}
        {appointment.notes && (
          <p
            style={{
              fontSize: 13,
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              margin: 0,
              padding: 'var(--space-3)',
              background: 'var(--color-surface-soft)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--color-brand-soft)',
            }}
          >
            {appointment.notes}
          </p>
        )}

        {/* Cancel action */}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: 'var(--border-subtle)' }}>
          {confirmOpen ? (
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button
                type="button"
                onClick={() => { setConfirmOpen(false); onCancel(appointment.id); }}
                disabled={isCancelling}
                className="btn btn-danger btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                id={`confirm-cancel-${appointment.id}`}
                aria-label={`Confirmar cancelamento para ${appointment.petName}`}
              >
                {isCancelling ? <Spinner size={14} /> : 'Confirmar'}
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
                id={`abort-cancel-${appointment.id}`}
              >
                Voltar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{
                width: '100%',
                justifyContent: 'center',
                color: 'var(--color-danger)',
                borderColor: 'rgba(217,48,54,0.25)',
              }}
              id={`cancel-appt-${appointment.id}`}
              aria-label={`Cancelar agendamento de ${appointment.petName}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <path d="M9.5 4.5l-5 5M4.5 4.5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Cancelar agendamento
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Empty State ─────────────────────────────────────────────────────────────── */
function EmptyState({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-16) var(--space-8)',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-xl)',
        border: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
      }}
      role="status"
      aria-label="Nenhum agendamento encontrado"
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 'var(--radius-xl)',
          background: 'var(--gradient-hero)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
        }}
        aria-hidden="true"
      >
        🐾
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-3)',
        }}
      >
        Nenhum agendamento ainda
      </h3>
      <p style={{ fontSize: 15, color: 'var(--color-text-muted)', maxWidth: 280, lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
        Seu pet merece atenção. Crie o primeiro agendamento agora mesmo!
      </p>
      <button
        className="btn btn-primary"
        onClick={onScrollToForm}
        id="empty-state-cta"
      >
        Criar primeiro agendamento
      </button>
    </div>
  );
}

/* ─── Dashboard Page ─────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { email, logout, refreshAccessToken, expiresAt } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancellingId, setIsCancellingId] = useState<number | null>(null);
  const [form, setForm] = useState<AppointmentCreate>({
    petName: '',
    breed: '',
    date: '',
    time: '',
    notes: '',
    imageFile: null,
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoadingList(true);
      try {
        const now = Date.now();
        if (expiresAt && now >= expiresAt) await refreshAccessToken();
        const response = await api.get<Appointment[]>('/api/appointments');
        setAppointments(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoadingList(false);
      }
    };
    loadAppointments();
  }, [expiresAt, refreshAccessToken]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const errors = validateAppointmentForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append(
        'appointment',
        new Blob([JSON.stringify({ petName: form.petName, breed: form.breed, date: form.date, time: form.time, notes: form.notes })], {
          type: 'application/json',
        }),
      );
      if (form.imageFile) payload.append('image', form.imageFile);
      await api.post('/api/appointments', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess('Agendamento criado com sucesso!');
      setForm({ petName: '', breed: '', date: '', time: '', notes: '', imageFile: null });
      const response = await api.get<Appointment[]>('/api/appointments');
      setAppointments(response.data);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    setError(null);
    setSuccess(null);
    setIsCancellingId(appointmentId);
    try {
      await api.delete(`/api/appointments/${appointmentId}`);
      setAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
      setSuccess('Agendamento cancelado.');
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsCancellingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const userInitials = email
    ? email
        .split('@')[0]
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ─── Top navigation bar ──────────────────────────────────────────────── */}
      <header
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: 'var(--border-subtle)',
          padding: '0 var(--space-6)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-6)',
          }}
        >
          {/* Logo */}
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
              flexShrink: 0,
            }}
            aria-label="PetShop Banho & Tosa"
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-cta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                boxShadow: 'var(--shadow-sm)',
              }}
              aria-hidden="true"
            >
              🐾
            </span>
            <span style={{ display: 'none' }} className="logo-text">
              PetShop <span style={{ color: 'var(--color-brand-500)' }}>B&T</span>
            </span>
          </a>

          {/* Center title */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                letterSpacing: '-0.01em',
              }}
            >
              Meu Painel
            </span>
          </div>

          {/* User + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--gradient-cta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {userInitials}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-muted)',
                  maxWidth: 160,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'none',
                }}
                className="user-email"
                title={email ?? ''}
              >
                {email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              id="dashboard-logout-btn"
              aria-label="Sair da conta"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* ─── Page body ───────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6)',
        }}
        id="dashboard-main"
      >
        {/* Page header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Olá{email ? `, ${email.split('@')[0]}` : ''}! 👋
          </h1>
          <p style={{ fontSize: 15, color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            Gerencie os agendamentos do seu pet em um só lugar.
          </p>
        </div>

        {/* Global banners */}
        {error && (
          <div className="banner banner-error" role="alert" style={{ marginBottom: 'var(--space-6)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
              <path d="M9 5.5v4M9 11.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}
        {success && (
          <div className="banner banner-success" role="status" style={{ marginBottom: 'var(--space-6)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {success}
          </div>
        )}

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 420px) 1fr',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
          className="dashboard-grid"
        >
          {/* ── Left: New Appointment Form ──────────────────────────────────── */}
          <aside ref={formRef} aria-label="Formulário de novo agendamento">
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: 'var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                position: 'sticky',
                top: 88,
              }}
            >
              {/* Form header */}
              <div
                style={{
                  padding: 'var(--space-6)',
                  borderBottom: 'var(--border-subtle)',
                  background: 'var(--gradient-hero)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  aria-hidden="true"
                >
                  📅
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      margin: 0,
                    }}
                  >
                    Novo Agendamento
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', margin: 0, marginTop: 2 }}>
                    Preencha os dados do seu pet
                  </p>
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} noValidate style={{ padding: 'var(--space-6)' }}>
                {/* Pet name + breed row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="form-row">
                  <div>
                    <FieldLabel htmlFor="dash-petName">Nome do pet <span style={{ color: 'var(--color-danger)' }} aria-hidden="true">*</span></FieldLabel>
                    <input
                      id="dash-petName"
                      type="text"
                      value={form.petName}
                      onChange={(e) => setForm({ ...form, petName: e.target.value })}
                      placeholder="Ex: Thor"
                      required
                      aria-invalid={!!fieldErrors.petName}
                      aria-describedby={fieldErrors.petName ? 'dash-petName-error' : undefined}
                      style={inputStyle(!!fieldErrors.petName)}
                    />
                    {fieldErrors.petName && <FieldError id="dash-petName-error" message={fieldErrors.petName} />}
                  </div>
                  <div>
                    <FieldLabel htmlFor="dash-breed">Raça <span style={{ color: 'var(--color-danger)' }} aria-hidden="true">*</span></FieldLabel>
                    <input
                      id="dash-breed"
                      type="text"
                      value={form.breed}
                      onChange={(e) => setForm({ ...form, breed: e.target.value })}
                      placeholder="Ex: Labrador"
                      required
                      aria-invalid={!!fieldErrors.breed}
                      aria-describedby={fieldErrors.breed ? 'dash-breed-error' : undefined}
                      style={inputStyle(!!fieldErrors.breed)}
                    />
                    {fieldErrors.breed && <FieldError id="dash-breed-error" message={fieldErrors.breed} />}
                  </div>
                </div>

                {/* Date + time row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }} className="form-row">
                  <div>
                    <FieldLabel htmlFor="dash-date">Data <span style={{ color: 'var(--color-danger)' }} aria-hidden="true">*</span></FieldLabel>
                    <input
                      id="dash-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      required
                      aria-invalid={!!fieldErrors.date}
                      aria-describedby={fieldErrors.date ? 'dash-date-error' : undefined}
                      style={inputStyle(!!fieldErrors.date)}
                    />
                    {fieldErrors.date && <FieldError id="dash-date-error" message={fieldErrors.date} />}
                  </div>
                  <div>
                    <FieldLabel htmlFor="dash-time">Horário <span style={{ color: 'var(--color-danger)' }} aria-hidden="true">*</span></FieldLabel>
                    <input
                      id="dash-time"
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      required
                      aria-invalid={!!fieldErrors.time}
                      aria-describedby={fieldErrors.time ? 'dash-time-error' : undefined}
                      style={inputStyle(!!fieldErrors.time)}
                    />
                    {fieldErrors.time && <FieldError id="dash-time-error" message={fieldErrors.time} />}
                  </div>
                </div>

                {/* Image upload */}
                <div style={{ marginTop: 'var(--space-5)' }}>
                  <ImageUpload
                    value={form.imageFile}
                    onChange={(f) => setForm({ ...form, imageFile: f })}
                    error={fieldErrors.imageFile}
                  />
                </div>

                {/* Notes */}
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <FieldLabel htmlFor="dash-notes">Observações <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--color-text-muted)' }}>(opcional)</span></FieldLabel>
                  <textarea
                    id="dash-notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Alergias, comportamento, preferências..."
                    rows={3}
                    style={{
                      ...inputStyle(false),
                      minHeight: 80,
                      resize: 'vertical',
                      paddingTop: 12,
                    }}
                  />
                </div>

                <button
                  id="dash-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 'var(--space-6)', justifyContent: 'center' }}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner color="#fff" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                        <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      Salvar agendamento
                    </>
                  )}
                </button>
              </form>
            </div>
          </aside>

          {/* ── Right: Appointments List ─────────────────────────────────────── */}
          <section aria-label="Lista de agendamentos" aria-live="polite">
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-6)',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 3vw, 24px)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    margin: 0,
                  }}
                >
                  Agendamentos
                </h2>
                {!isLoadingList && (
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
                    {appointments.length === 0
                      ? 'Nenhum agendamento'
                      : `${appointments.length} agendamento${appointments.length > 1 ? 's' : ''}`}
                  </p>
                )}
              </div>
              {appointments.length > 0 && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={scrollToForm}
                  id="dash-new-appt-btn"
                >
                  + Novo agendamento
                </button>
              )}
            </div>

            {/* Loading skeleton */}
            {isLoadingList ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: 'var(--border-subtle)',
                      background: 'var(--color-surface)',
                    }}
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        height: 180,
                        background: 'linear-gradient(90deg, #ece9e4 25%, #f7f7f5 50%, #ece9e4 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.4s ease-in-out infinite',
                      }}
                    />
                    <div style={{ padding: 'var(--space-5)' }}>
                      <div style={{ height: 20, borderRadius: 8, background: '#ece9e4', marginBottom: 12, width: '60%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                      <div style={{ height: 14, borderRadius: 6, background: '#ece9e4', width: '80%', animation: 'shimmer 1.4s ease-in-out 0.2s infinite' }} />
                    </div>
                  </div>
                ))}
                <style>{`@keyframes shimmer { 0%,100%{background-position:200% 0} 50%{background-position:-200% 0} }`}</style>
              </div>
            ) : appointments.length === 0 ? (
              <EmptyState onScrollToForm={scrollToForm} />
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 'var(--space-5)',
                }}
              >
                {appointments.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    isCancelling={isCancellingId === appt.id}
                    onCancel={handleCancelAppointment}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Responsive overrides */}
      <style>{`
        @media (min-width: 600px) {
          .logo-text { display: inline !important; }
          .user-email { display: block !important; }
        }
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .logo-text { display: inline !important; }
        }
      `}</style>
    </div>
  );
}
