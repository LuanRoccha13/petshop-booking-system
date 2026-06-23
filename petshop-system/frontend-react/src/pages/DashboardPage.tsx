import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Appointment, AppointmentCreate } from '../types/appointment';
import { getErrorMessage } from '../utils/errors';
import { validateAppointmentForm } from '../utils/validation';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { email, logout, refreshAccessToken, expiresAt } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancellingId, setIsCancellingId] = useState<number | null>(null);
  const [form, setForm] = useState<AppointmentCreate>({
    petName: '',
    breed: '',
    date: '',
    time: '',
    notes: '',
    imageUrl: '',
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const now = Date.now();
        if (expiresAt && now >= expiresAt) {
          await refreshAccessToken();
        }

        const response = await api.get<Appointment[]>('/api/appointments');
        setAppointments(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    loadAppointments();
  }, [expiresAt, refreshAccessToken]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setIsLoading(true);

    const errors = validateAppointmentForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/api/appointments', form);
      setSuccess('Agendamento criado com sucesso!');
      setForm({ petName: '', breed: '', date: '', time: '', notes: '', imageUrl: '' });
      const response = await api.get<Appointment[]>('/api/appointments');
      setAppointments(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    setError(null);
    setSuccess(null);
    setIsCancellingId(appointmentId);

    try {
      await api.delete(`/api/appointments/${appointmentId}`);
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== appointmentId));
      setSuccess('Agendamento cancelado com sucesso!');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsCancellingId(null);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Logado como: {email}</p>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }}>Sair</button>
      </header>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      {success && <p style={{ color: '#16a34a' }}>{success}</p>}

      <section style={{ marginBottom: 24 }}>
        <h2>Novo Agendamento</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="petName">Nome do pet</label>
            <input
              id="petName"
              type="text"
              value={form.petName}
              onChange={(event) => setForm({ ...form, petName: event.target.value })}
              style={fieldErrors.petName ? { borderColor: '#dc2626' } : {}}
              required
            />
            {fieldErrors.petName && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{fieldErrors.petName}</p>}
          </div>
          <div>
            <label htmlFor="breed">Raça</label>
            <input
              id="breed"
              type="text"
              value={form.breed}
              onChange={(event) => setForm({ ...form, breed: event.target.value })}
              style={fieldErrors.breed ? { borderColor: '#dc2626' } : {}}
              required
            />
            {fieldErrors.breed && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{fieldErrors.breed}</p>}
          </div>
          <div>
            <label htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
              style={fieldErrors.date ? { borderColor: '#dc2626' } : {}}
              required
            />
            {fieldErrors.date && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{fieldErrors.date}</p>}
          </div>
          <div>
            <label htmlFor="time">Horário</label>
            <input
              id="time"
              type="time"
              value={form.time}
              onChange={(event) => setForm({ ...form, time: event.target.value })}
              style={fieldErrors.time ? { borderColor: '#dc2626' } : {}}
              required
            />
            {fieldErrors.time && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{fieldErrors.time}</p>}
          </div>
          <div>
            <label htmlFor="notes">Observações</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">URL da imagem</label>
            <input
              id="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
            />
          </div>
          <button type="submit" disabled={isLoading} style={{ marginTop: 16, opacity: isLoading ? 0.6 : 1 }}>
            {isLoading ? 'Salvando...' : 'Salvar agendamento'}
          </button>
        </form>
      </section>

      <section>
        <h2>Agendamentos</h2>
        {appointments.length === 0 ? (
          <p>Não há agendamentos cadastrados.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {appointment.imageUrl && (
                  <img
                    src={appointment.imageUrl}
                    alt={appointment.petName}
                    style={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      backgroundColor: '#f3f4f6',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div style={{ padding: 16 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: 18 }}>{appointment.petName}</h3>
                  <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: 14 }}>
                    <strong>Raça:</strong> {appointment.breed}
                  </p>
                  <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: 14 }}>
                    <strong>Data:</strong> {appointment.date}
                  </p>
                  <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: 14 }}>
                    <strong>Horário:</strong> {appointment.time}
                  </p>
                  {appointment.notes && (
                    <p style={{ margin: '8px 0 0 0', color: '#6b7280', fontSize: 13, fontStyle: 'italic' }}>
                      <strong>Observações:</strong> {appointment.notes}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCancelAppointment(appointment.id)}
                    disabled={isCancellingId === appointment.id}
                    style={{
                      marginTop: 12,
                      width: '100%',
                      backgroundColor: '#dc2626',
                      opacity: isCancellingId === appointment.id ? 0.7 : 1,
                    }}
                  >
                    {isCancellingId === appointment.id ? 'Cancelando...' : 'Cancelar agendamento'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
