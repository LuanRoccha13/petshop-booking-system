import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const services = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#ffe9df" />
        <path d="M12 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#ff6b35" strokeWidth="2.2" strokeLinecap="round"/>
        <ellipse cx="20" cy="16" rx="3" ry="3.5" stroke="#ff6b35" strokeWidth="2.2"/>
        <path d="M16 28c0 0 1.2 2 4 2s4-2 4-2" stroke="#ff6b35" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M14 20c-2 0-3.5 1.5-3.5 3s1 2.5 2.5 2.5" stroke="#e85a28" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M26 20c2 0 3.5 1.5 3.5 3s-1 2.5-2.5 2.5" stroke="#e85a28" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Banho Completo',
    description: 'Banho com produtos naturais premium, secagem profissional e hidratação do pelo. Seu pet sai perfumado e confortável.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#ffe9df" />
        <path d="M13 14l14 12M27 14L13 26" stroke="#ff6b35" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="#ffe9df" stroke="#ff6b35" strokeWidth="2.2"/>
        <path d="M20 10v4M20 26v4M10 20h4M26 20h4" stroke="#e85a28" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Tosa Especializada',
    description: 'Cortes para todas as raças com profissionais certificados. Usamos equipamentos de alta qualidade e técnicas modernas.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#ffe9df" />
        <path d="M20 12c-4.4 0-8 3.6-8 8v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2c0-4.4-3.6-8-8-8z" stroke="#ff6b35" strokeWidth="2.2" fill="none"/>
        <path d="M17 24v2a3 3 0 006 0v-2" stroke="#e85a28" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="17" cy="19" r="1.5" fill="#ff6b35"/>
        <circle cx="23" cy="19" r="1.5" fill="#ff6b35"/>
      </svg>
    ),
    title: 'Cuidados Completos',
    description: 'Limpeza de ouvido, corte de unhas, escovação dental e tratamentos especializados. Saúde e bem-estar em um só lugar.',
  },
];

const benefits = [
  {
    icon: '🏆',
    title: 'Profissionais Certificados',
    text: 'Equipe treinada e apaixonada por animais, com certificações em pet grooming.',
  },
  {
    icon: '📅',
    title: 'Agendamento Online',
    text: 'Agende em segundos direto pelo app, sem ligações e sem filas de espera.',
  },
  {
    icon: '🌿',
    title: 'Produtos Naturais',
    text: 'Linha hipoalergênica e ecológica. Seguro para peles sensíveis e filhotes.',
  },
  {
    icon: '❤️',
    title: 'Ambiente Acolhedor',
    text: 'Espaço projetado para reduzir estresse. Seu pet se sente em casa aqui.',
  },
];

const testimonials = [
  {
    name: 'Ana Silva',
    pet: 'Max — Labrador',
    feedback: 'Excelente atendimento! O Max saiu feliz, perfumado e super bem cuidado. Com certeza voltarei.',
    avatar: 'AS',
    rating: 5,
  },
  {
    name: 'Carlos Oliveira',
    pet: 'Luna — Gato Persa',
    feedback: 'Profissionais competentes e ambiente muito limpo. A Luna ficou calma o tempo todo. Recomendo muito!',
    avatar: 'CO',
    rating: 5,
  },
  {
    name: 'Marina Costa',
    pet: 'Bella — Poodle',
    feedback: 'Ótima experiência do início ao fim. O agendamento é super fácil e o resultado é incrível.',
    avatar: 'MC',
    rating: 5,
  },
  {
    name: 'Roberto Santos',
    pet: 'Rex — Pastor Alemão',
    feedback: 'Agendamento rápido e atendimento impecável. O Rex adorou a equipe. Virei cliente fiel!',
    avatar: 'RS',
    rating: 5,
  },
];

/* ─── Hook: IntersectionObserver reveal ────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Reveal stagger children too
            entry.target.querySelectorAll('.reveal').forEach((child, i) => {
              setTimeout(() => child.classList.add('is-visible'), i * 60);
            });
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }} aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#ff6b35" aria-hidden="true">
          <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const navigate = useNavigate();

  const heroRef = useReveal() as React.RefObject<HTMLElement>;
  const servicesRef = useReveal() as React.RefObject<HTMLElement>;
  const benefitsRef = useReveal() as React.RefObject<HTMLElement>;
  const testimonialsRef = useReveal() as React.RefObject<HTMLElement>;
  const ctaRef = useReveal() as React.RefObject<HTMLElement>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>

      {/* ─── Navbar ──────────────────────────────────────────────────────────── */}
      <header
        id="landing-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: 'var(--border-subtle)',
          padding: '0 var(--space-6)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 68,
            gap: 'var(--space-8)',
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
              fontSize: 20,
              color: 'var(--color-text)',
              textDecoration: 'none',
            }}
            aria-label="PetShop Banho & Tosa — página inicial"
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-cta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              🐾
            </span>
            <span>PetShop <span style={{ color: 'var(--color-brand-500)' }}>B&T</span></span>
          </a>

          {/* Nav links — hidden on small screens */}
          <nav
            aria-label="Links de navegação"
            style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}
          >
            {[
              ['#services', 'Serviços'],
              ['#benefits', 'Benefícios'],
              ['#testimonials', 'Avaliações'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--motion-base) var(--ease-standard)',
                }}
                className="nav-link"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-500)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA actions */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
              style={{ padding: '10px 20px', minHeight: 44, fontSize: 14 }}
              id="navbar-login-btn"
            >
              Entrar
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/register')}
              style={{ padding: '10px 20px', minHeight: 44, fontSize: 14 }}
              id="navbar-cta-btn"
            >
              Quero agendar
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero ────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef as React.RefObject<HTMLDivElement>}
        className="reveal"
        style={{
          background: 'var(--gradient-hero)',
          padding: 'var(--space-20) var(--space-6)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Seção principal"
      >
        {/* Decorative shapes */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 480,
              height: 480,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -60,
              left: -60,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,90,40,0.08) 0%, transparent 70%)',
            }}
          />
          {/* Floating paw prints */}
          {[
            { top: '15%', left: '8%', size: 28, opacity: 0.18, delay: '0s' },
            { top: '70%', left: '5%', size: 20, opacity: 0.12, delay: '0.4s' },
            { top: '25%', right: '12%', size: 22, opacity: 0.15, delay: '0.8s' },
            { top: '60%', right: '8%', size: 32, opacity: 0.1, delay: '0.2s' },
          ].map((s, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: s.top,
                left: (s as any).left,
                right: (s as any).right,
                fontSize: s.size,
                opacity: s.opacity,
                animation: `float 6s ease-in-out ${s.delay} infinite`,
              }}
            >
              🐾
            </span>
          ))}
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'rgba(255,107,53,0.12)',
              border: '1px solid rgba(255,107,53,0.28)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 16px',
              marginBottom: 'var(--space-8)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-brand-600)',
            }}
          >
            <span aria-hidden="true">✨</span>
            Cuidado profissional para seu melhor amigo
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 7vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-6)',
              letterSpacing: '-0.02em',
            }}
          >
            Seu pet merece o{' '}
            <span
              style={{
                background: 'var(--gradient-cta)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              melhor cuidado
            </span>
            {' '}possível
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
              maxWidth: 560,
              margin: '0 auto var(--space-10)',
            }}
          >
            Banho, tosa e cuidados completos com profissionais apaixonados e
            agendamento 100% online. Rápido, fácil e sem estresse.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/register')}
              id="hero-cta-primary"
              style={{ animation: 'pulse-glow 3s ease-in-out 2s infinite' }}
            >
              <span aria-hidden="true">📅</span>
              Quero agendar
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="hero-cta-secondary"
            >
              Conhecer serviços
            </button>
          </div>

          {/* Social proof */}
          <div
            style={{
              marginTop: 'var(--space-12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '2.400+', label: 'Pets atendidos' },
              { value: '4.9★', label: 'Avaliação média' },
              { value: '100%', label: 'Satisfação garantida' },
            ].map((stat) => (
              <div
                key={stat.value}
                style={{
                  textAlign: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'var(--border-subtle)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 700,
                    color: 'var(--color-brand-600)',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────────────────────── */}
      <section
        id="services"
        ref={servicesRef as React.RefObject<HTMLDivElement>}
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--color-surface)',
        }}
        aria-label="Nossos serviços"
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Section header */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-500)',
                marginBottom: 'var(--space-3)',
              }}
            >
              O que oferecemos
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Serviços completos,{' '}
              <br />
              resultado impecável
            </h2>
            <p style={{ fontSize: 18, color: 'var(--color-text-muted)', maxWidth: 480, margin: '0 auto' }}>
              Cada serviço pensado para o conforto e saúde do seu animal.
            </p>
          </div>

          {/* Cards grid */}
          <div
            className="reveal-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {services.map((service, i) => (
              <article
                key={i}
                className="card reveal"
                style={{
                  background: 'var(--gradient-card-highlight)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-5)',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-brand-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                    {service.description}
                  </p>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    className="btn btn-ghost"
                    onClick={() => navigate('/register')}
                    style={{ padding: '10px 0', fontWeight: 600, fontSize: 14 }}
                  >
                    Agendar agora →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ────────────────────────────────────────────────────────── */}
      <section
        id="benefits"
        ref={benefitsRef as React.RefObject<HTMLDivElement>}
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--color-surface-soft)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Nossos diferenciais"
      >
        {/* Decorative blob */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-500)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Por que nos escolher
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-text)',
              }}
            >
              Diferenciais que fazem{' '}
              <br />a diferença
            </h2>
          </div>

          <div
            className="reveal-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {benefits.map((b, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-6)',
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
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
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--gradient-hero)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}
                  aria-hidden="true"
                >
                  {b.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 17,
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        ref={testimonialsRef as React.RefObject<HTMLDivElement>}
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--color-surface)',
        }}
        aria-label="Avaliações dos clientes"
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-500)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Quem já passou por aqui
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-text)',
              }}
            >
              O que nossos clientes dizem
            </h2>
          </div>

          <div
            className="reveal-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="card reveal"
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
              >
                {/* Stars */}
                <StarRating count={t.rating} />

                {/* Quote */}
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'var(--color-text)',
                    flexGrow: 1,
                    fontStyle: 'normal',
                  }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      lineHeight: 0.6,
                      color: 'var(--color-brand-soft)',
                      fontFamily: 'Georgia, serif',
                      display: 'block',
                      marginBottom: 4,
                    }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                  {t.feedback}
                </blockquote>

                {/* Author */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    paddingTop: 'var(--space-4)',
                    borderTop: 'var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
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
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                      {t.pet}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Final ───────────────────────────────────────────────────────── */}
      <section
        id="cta-final"
        ref={ctaRef as React.RefObject<HTMLDivElement>}
        className="reveal"
        style={{
          background: 'var(--gradient-cta)',
          padding: 'var(--space-20) var(--space-6)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Call to action final"
      >
        {/* Decorative overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 'var(--space-6)', lineHeight: 1 }} aria-hidden="true">
            🐾
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: 'var(--space-5)',
            }}
          >
            Pronto para cuidar do seu pet?
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.88)',
              marginBottom: 'var(--space-10)',
              maxWidth: 480,
              margin: '0 auto var(--space-10)',
            }}
          >
            Crie sua conta grátis e agende em menos de 2 minutos.
            Seu melhor amigo vai adorar.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="btn btn-lg"
              onClick={() => navigate('/register')}
              id="cta-final-register-btn"
              style={{
                background: '#ffffff',
                color: 'var(--color-brand-600)',
                fontWeight: 700,
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              }}
            >
              Criar conta grátis
            </button>
            <button
              className="btn btn-lg"
              onClick={() => navigate('/login')}
              id="cta-final-login-btn"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '2px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(4px)',
              }}
            >
              Já tenho conta
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: 'var(--color-text)',
          padding: 'var(--space-12) var(--space-6)',
          color: 'rgba(255,255,255,0.75)',
        }}
        aria-label="Rodapé"
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              color: '#ffffff',
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--gradient-cta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
              aria-hidden="true"
            >
              🐾
            </span>
            PetShop Banho & Tosa
          </div>

          <nav
            aria-label="Links do rodapé"
            style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              ['#services', 'Serviços'],
              ['#benefits', 'Benefícios'],
              ['#testimonials', 'Avaliações'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'color var(--motion-base) var(--ease-standard)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {label}
              </a>
            ))}
          </nav>

          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(255,255,255,0.1)',
            }}
            role="separator"
          />

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            © 2026 PetShop Banho & Tosa. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ─── Responsive overrides ─────────────────────────────────────────────── */}
      <style>{`
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: var(--color-brand-500);
          border-radius: 2px;
          transition: width var(--motion-base) var(--ease-standard);
        }
        .nav-link:hover::after { width: 100%; }

        @media (min-width: 768px) {
          .nav-link { display: inline !important; }
          .landing-nav-links { display: flex !important; }
        }
        @media (max-width: 480px) {
          #hero-cta-primary, #hero-cta-secondary {
            width: 100%; justify-content: center;
          }
        }
        @media (max-width: 640px) {
          #services, #benefits, #testimonials, #cta-final {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
        }
        @media (max-width: 380px) {
          #navbar-cta-btn { padding: 8px 14px !important; font-size: 13px !important; }
          #navbar-login-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
}
