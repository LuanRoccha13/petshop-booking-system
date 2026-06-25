import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-hero)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-body)',
        textAlign: 'center',
        padding: 'var(--space-8)',
      }}
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,90,40,0.07) 0%, transparent 70%)' }} />
      </div>

      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--space-12) var(--space-10)',
          maxWidth: 460,
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--color-brand-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            margin: '0 auto var(--space-6)',
          }}
          aria-hidden="true"
        >
          🐾
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: 700,
            color: 'var(--color-brand-500)',
            margin: '0 0 var(--space-3)',
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 var(--space-4)',
          }}
        >
          Página não encontrada
        </h2>
        <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 var(--space-8)' }}>
          Parece que este caminho não existe. Que tal voltar e cuidar do seu pet?
        </p>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ display: 'inline-flex', textDecoration: 'none' }}
          id="notfound-home-link"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
