import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dogLogoSvg from '../assets/images/landing/dog-sleeping-svgrepo-com.svg';
import heroImage from '../assets/images/mais-imagens-pet-shop/pexels-goochie-poochie-19145889.jpg';
import quoteImage from '../assets/images/mais-imagens-pet-shop/pexels-tima-miroshnichenko-6131165.jpg';
import serviceImageOne from '../assets/images/mais-imagens-pet-shop/pexels-goochie-poochie-19145890.jpg';
import serviceImageTwo from '../assets/images/mais-imagens-pet-shop/pexels-gustavo-fring-6816860.jpg';
import serviceImageThree from '../assets/images/mais-imagens-pet-shop/buddy-an-LpK2xddrElI-unsplash.jpg';

function useReveal<T extends HTMLElement>(staggerMs = 90) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          entry.target.querySelectorAll<HTMLElement>('.reveal-child').forEach((child, index) => {
            window.setTimeout(() => child.classList.add('is-visible'), index * staggerMs);
          });
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

function useScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}

/** Parallax leve e barato: a imagem do hero se move mais devagar que o scroll,
 * criando profundidade sem depender de libs pesadas. Desativado em reduced-motion. */
function useParallax<T extends HTMLElement>(strength = 0.12, disabled = false) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (disabled) return;
    const element = ref.current;
    if (!element) return;

    let ticking = false;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const offset = rect.top * strength;
      // scale(1.12) garante que não apareçam bordas vazias enquanto a imagem desliza no parallax.
      element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.12)`;
      ticking = false;
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength, disabled]);

  return ref;
}

const navLinks = [
  { href: '#rotina', label: 'Rotina' },
  { href: '#credenciais', label: 'Credenciais' },
  { href: '#faq', label: 'FAQ' },
];

const marqueeItems = [
  'Banho premium com hora marcada',
  'Produtos hipoalergênicos selecionados',
  'Secagem silenciosa e manejo gentil',
  'Check-ins claros no seu painel',
  'Tosa com acabamento por porte e raça',
  'Lembretes para manter a rotina em dia',
];

const serviceCards = [
  {
    title: 'Banho com acabamento leve',
    text: 'Limpeza, hidratação e secagem pensadas para deixar o pelo bonito sem estressar o pet.',
    image: serviceImageOne,
  },
  {
    title: 'Tosa com leitura de temperamento',
    text: 'Cada detalhe do corte respeita raça, conforto e o ritmo natural do atendimento.',
    image: serviceImageTwo,
  },
  {
    title: 'Rotina que continua no digital',
    text: 'Agende, confirme e acompanhe tudo em um fluxo claro, sem ligações ou esperas longas.',
    image: serviceImageThree,
  },
];

const socialProof = [
  'Equipe certificada',
  'Produtos hipoalergênicos',
  'Atendimento com hora marcada',
  'Ritual sem estresse',
];

const faqs = [
  {
    q: 'Vocês atendem cães e gatos com temperamento mais sensível?',
    a: 'Sim. Organizamos o fluxo para reduzir ruído, espera e excesso de estímulos, priorizando uma chegada tranquila para pets mais sensíveis.',
  },
  {
    q: 'Como funciona o agendamento online?',
    a: 'Você cria a conta, escolhe a data e o horário e acompanha tudo no dashboard. O processo foi desenhado para ser rápido e claro desde o primeiro acesso.',
  },
  {
    q: 'Quais produtos entram no banho?',
    a: 'Usamos cosméticos premium com foco em conforto da pele e brilho do pelo. Quando houver alguma observação especial, você pode sinalizar no cadastro do agendamento.',
  },
  {
    q: 'Posso remarcar ou cancelar depois?',
    a: 'Sim. No painel do cliente você encontra seus agendamentos ativos e pode cancelar com segurança quando precisar reorganizar a rotina.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const isReducedMotion = useReducedMotion();
  const isScrolled = useScrollState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Timing coreografado: cada seção tem uma personalidade de entrada diferente
  // (hero mais rápido e ágil; citação mais lenta e dramática; FAQ ágil; CTA um fechamento cadenciado).
  const heroRef = useReveal<HTMLElement>(70);
  const servicesRef = useReveal<HTMLElement>(80);
  const quoteRef = useReveal<HTMLElement>(140);
  const proofRef = useReveal<HTMLElement>(60);
  const faqRef = useReveal<HTMLElement>(55);
  const ctaRef = useReveal<HTMLElement>(100);
  const heroParallaxRef = useParallax<HTMLDivElement>(0.08, isReducedMotion);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 769px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', overflowX: 'hidden' }}>
      <header
        className="page-topbar"
        style={{
          background: isScrolled ? 'rgba(248, 242, 234, 0.84)' : 'rgba(248, 242, 234, 0.3)',
          borderBottom: isScrolled ? '1px solid rgba(64, 43, 21, 0.1)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 8px 32px rgba(33, 24, 17, 0.06)' : 'none',
          transition: 'background var(--motion-base) var(--ease-standard), box-shadow var(--motion-base) var(--ease-standard), border-color var(--motion-base) var(--ease-standard)',
        }}
      >
        <div className="page-topbar__inner">
          <a href="/" className="brand-mark" aria-label="Voltar para a página inicial do PetShop B&T">
            <span className="brand-mark__icon">
              <img
                src={dogLogoSvg}
                alt=""
                aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </span>
            <span className="brand-mark__name">
              PetShop <strong>B&T</strong>
            </span>
          </a>

          <nav className="landing-nav hide-mobile" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="landing-nav__link">
                {link.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button className="btn btn-ghost hide-mobile" onClick={() => navigate('/login')}>
              Entrar
            </button>
            <button className="btn btn-primary hide-mobile" onClick={() => navigate('/register')}>
              Quero agendar
            </button>
            <button
              className="landing-burger"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="landing-mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span className={`steno-burger-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div id="landing-mobile-menu" className={`steno-mobile-panel ${menuOpen ? 'is-open' : ''}`}>
          <nav className="landing-mobile-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="landing-mobile-nav__link">
                {link.label}
              </a>
            ))}
            <div className="landing-mobile-nav__actions">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/login');
                }}
              >
                Entrar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/register');
                }}
              >
                Quero agendar
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" ref={heroRef} className="steno-reveal landing-hero">
          <div className="editorial-shell landing-hero__grid">
            <div className="landing-hero__copy">
              <div className="editorial-kicker reveal-child">
                <span className="floating-pill__dot" style={{ width: 8, height: 8, boxShadow: 'none' }} />
                cuidado premium em cada retorno
              </div>
              <h1 className="display-hero reveal-child landing-hero__title">
                Cuidado que acalma.
                <br />
              </h1>
              <p className="body-lead reveal-child landing-hero__lead">
                Banho, tosa e acompanhamento digital em uma experiência desenhada para parecer calma, precisa e realmente especial.
              </p>
              <div className="reveal-child landing-hero__actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
                  Criar minha conta
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => document.getElementById('rotina')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver a experiência
                </button>
              </div>
              <div className="reveal-child landing-hero__meta">
                <span>Atendimento com hora marcada</span>
                <span>Produtos suaves</span>
                <span>Painel para acompanhar tudo</span>
              </div>
            </div>

            <div className="reveal-child landing-hero__visual">
              <div className="image-frame landing-hero__image-frame">
                <img
                  ref={heroParallaxRef}
                  src={heroImage}
                  alt="Pet em retrato emocional olhando para a câmera"
                  className="landing-hero__image"
                />
                <div className="landing-hero__overlay" aria-hidden="true" />
                <div className={`floating-pill landing-hero__status ${isReducedMotion ? '' : 'animate-float'}`}>
                  <span className="floating-pill__dot" />
                  <div>
                    <div className="landing-hero__status-title">Banho + hidratação confirmados</div>
                    <div className="landing-hero__status-text">Hoje, 14h • chegada calma, saída impecável.</div>
                  </div>
                </div>
                <div className="landing-hero__micro-pill">check-in sereno</div>
              </div>
            </div>
          </div>
        </section>

        <section id="rotina" ref={servicesRef} className="steno-reveal landing-marquee-section">
          <div className="landing-marquee">
            <div
              className={`landing-marquee__track ${isReducedMotion ? '' : 'animate-marquee'}`}
              style={{ animationPlayState: isReducedMotion ? 'paused' : 'running' }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div key={`${item}-${index}`} className="landing-marquee__item">
                  <span className="landing-marquee__symbol">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="editorial-shell landing-services">
            {serviceCards.map((card) => (
              <article key={card.title} className="card landing-services__card reveal-child">
                <div className="landing-services__image-wrap">
                  <img src={card.image} alt={card.title} className="landing-services__image" loading="lazy" />
                </div>
                <h2 className="landing-services__title">{card.title}</h2>
                <p className="landing-services__text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={quoteRef} className="steno-reveal landing-quote-section texture-grain">
          <div className="editorial-shell landing-quote">
            <div className="reveal-child landing-quote__copy">
              <div className="editorial-kicker landing-quote__label">a filosofia do cuidado</div>
              <h2 className="landing-quote__title">
                A beleza vem depois.
                <br />
                A confiança vem primeiro.
              </h2>
              <p className="landing-quote__text">
                Quando o atendimento é previsível, gentil e bem executado, o resultado aparece no pelo, no olhar e na tranquilidade de quem deixa o pet com a gente.
              </p>
              <div className="landing-quote__metrics">
                <div>
                  <strong>Hora marcada</strong>
                  <span>Sem correria desnecessária</span>
                </div>
                <div>
                  <strong>Equipe cuidadosa</strong>
                  <span>Leitura de comportamento em cada etapa</span>
                </div>
              </div>
            </div>
            <div className="reveal-child landing-quote__visual">
              <div className="image-frame landing-quote__image-frame">
                <img src={quoteImage} alt="Momento de cuidado profissional com um pet" className="landing-quote__image" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section id="credenciais" ref={proofRef} className="steno-reveal landing-proof">
          <div className="editorial-shell landing-proof__row" aria-label="Credenciais e diferenciais">
            {socialProof.map((item) => (
              <div key={item} className="landing-proof__item reveal-child">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="faq" ref={faqRef} className="steno-reveal landing-faq">
          <div className="editorial-shell landing-faq__grid">
            <div className="reveal-child landing-faq__intro">
              <div className="editorial-kicker">dúvidas frequentes</div>
              <h2 className="display-title landing-faq__title">
                Pergunte sem pressa.
                <br />
                A gente responde com clareza.
              </h2>
              <p className="body-lead">Um FAQ leve, direto e pensado para deixar a decisão simples.</p>
            </div>
            <div className="reveal-child landing-faq__list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="landing-faq__item">
                    <button
                      className="faq-trigger landing-faq__trigger"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                    >
                      <span>{faq.q}</span>
                      <span aria-hidden="true" className="landing-faq__icon" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                        +
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      style={{
                        display: 'grid',
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        transition: isReducedMotion ? 'none' : 'grid-template-rows 0.3s var(--ease-standard)',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <p className="landing-faq__answer">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="steno-reveal landing-cta">
          <div className="editorial-shell">
            <div className="surface-panel landing-cta__panel reveal-child">
              <div className="editorial-kicker">pronto para começar</div>
              <h2 className="landing-cta__title">Seu próximo cuidado pode começar agora.</h2>
              <p className="body-lead landing-cta__text">
                Crie sua conta, escolha o melhor horário e acompanhe tudo em um fluxo tão bonito quanto funcional.
              </p>
              <div className="landing-cta__actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
                  Quero agendar
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
                  Já tenho conta
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">© {new Date().getFullYear()} PetShop B&T. Cuidado premium com presença humana.</footer>

      <style>{`
        .landing-nav {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 44px);
        }

        .landing-nav__link {
          padding: 25px 25px 0 25px;
          font-family: var(--font-ui);
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          position: relative;
          transition: color var(--motion-base) var(--ease-standard);
        }

        .landing-nav__link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 100%;
          height: 1px;
          background: var(--color-brand-500);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--motion-base) var(--ease-standard);
        }

        .landing-nav__link:hover {
          color: var(--color-text);
        }

        .landing-nav__link:hover::after {
          transform: scaleX(1);
        }

        .landing-burger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          border: 1px solid rgba(64, 43, 21, 0.1);
          background: rgba(255, 253, 250, 0.72);
          color: var(--color-text);
          align-items: center;
          justify-content: center;
        }

        .landing-mobile-nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: 0 0 var(--space-6);
        }

        .landing-mobile-nav__link {
          padding: var(--space-3) 0;
          font-family: var(--font-ui);
          font-weight: 600;
          color: var(--color-text);
        }

        .landing-mobile-nav__actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-top: var(--space-2);
        }

        .landing-mobile-nav__actions .btn {
          width: 100%;
        }

        .landing-hero {
          padding: clamp(48px, 9vw, 96px) 0 var(--space-section);
        }

        .landing-hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: clamp(32px, 6vw, 84px);
          align-items: center;
        }

        .landing-hero__title {
          margin: var(--space-5) 0 var(--space-5);
          max-width: 10ch;
        }

        .landing-hero__lead {
          max-width: 33rem;
        }

        .landing-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin: var(--space-8) 0 var(--space-8);
        }

        .landing-hero__meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          color: var(--color-text-secondary);
          font-size: 0.86rem;
          font-family: var(--font-ui);
        }

        .landing-hero__meta span {
          padding: 10px 14px;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(64, 43, 21, 0.08);
        }

        .landing-hero__image-frame {
          aspect-ratio: 4 / 5;
          min-height: 560px;
        }

        .landing-hero__image,
        .landing-quote__image,
        .landing-services__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .landing-hero__image {
          will-change: transform;
          transform-origin: center;
        }

        .landing-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(22, 17, 12, 0.02) 0%, rgba(22, 17, 12, 0.26) 100%);
        }

        .landing-hero__status {
          position: absolute;
          left: clamp(20px, 4vw, 36px);
          bottom: clamp(20px, 4vw, 36px);
          max-width: min(92%, 360px);
          z-index: 2;
        }

        .landing-hero__status-title {
          font-family: var(--font-ui);
          font-size: 0.87rem;
          font-weight: 600;
        }

        .landing-hero__status-text {
          color: var(--color-text-muted);
          font-size: 0.83rem;
          line-height: 1.5;
        }

        .landing-hero__micro-pill {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 2;
          padding: 10px 14px;
          border-radius: var(--radius-pill);
          background: rgba(255, 250, 244, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.5);
          font-family: var(--font-ui);
          font-size: 0.74rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
        }

        .landing-marquee-section {
          padding-bottom: var(--space-section);
        }

        .landing-marquee {
          overflow: hidden;
          border-top: var(--border-subtle);
          border-bottom: var(--border-subtle);
          background: rgba(255, 253, 250, 0.58);
        }

        .landing-marquee__track {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          width: max-content;
          min-width: 200%;
          padding: 18px 0;
        }

        .landing-marquee__item {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: 10px 16px;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(64, 43, 21, 0.08);
          font-family: var(--font-ui);
          font-size: 0.84rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
        }

        .landing-marquee__symbol {
          color: var(--color-brand-500);
          font-size: 1rem;
        }

        .landing-services {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-5);
          margin-top: var(--space-10);
        }

        .landing-services__card {
          padding: 0;
          background: rgba(255, 253, 250, 0.74);
        }

        .landing-services__image-wrap {
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-bottom: var(--border-subtle);
        }

        .landing-services__image {
          transition: transform var(--motion-slow) var(--ease-emphasis);
        }

        .landing-services__card:hover .landing-services__image {
          transform: scale(1.06);
        }

        .landing-services__title,
        .landing-services__text {
          padding-left: var(--space-5);
          padding-right: var(--space-5);
        }

        .landing-services__title {
          font-size: 1.9rem;
          line-height: 1;
          padding-top: var(--space-5);
          margin-bottom: var(--space-2);
        }

        .landing-services__text {
          color: var(--color-text-muted);
          padding-bottom: var(--space-5);
        }

        .landing-quote-section {
          padding: var(--space-section) 0;
          background: var(--color-dark-bg);
          color: var(--color-dark-text);
        }

        .landing-quote {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.88fr);
          gap: clamp(32px, 6vw, 88px);
          align-items: center;
          position: relative;
          z-index: var(--z-base);
        }

        .landing-quote__label {
          background: var(--color-dark-surface-hover);
          border-color: var(--color-dark-border);
          color: var(--color-dark-text-subtle);
        }

        .landing-quote__title {
          font-size: clamp(3rem, 6vw, 5.2rem);
          line-height: 0.96;
          letter-spacing: var(--tracking-tighter);
          margin: var(--space-5) 0 var(--space-5);
        }

        .landing-quote__text {
          max-width: 34rem;
          color: var(--color-dark-text-muted);
          font-size: 1.05rem;
          line-height: 1.75;
        }

        .landing-quote__metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--space-4);
          margin-top: var(--space-8);
        }

        .landing-quote__metrics div {
          padding-top: var(--space-4);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: grid;
          gap: 6px;
        }

        .landing-quote__metrics strong {
          font-family: var(--font-ui);
          font-size: 0.88rem;
          font-weight: 600;
        }

        .landing-quote__metrics span {
          color: rgba(248, 242, 234, 0.68);
          font-size: 0.88rem;
        }

        .landing-quote__image-frame {
          aspect-ratio: 4 / 5;
        }

        .landing-proof {
          padding: 34px 0;
          border-bottom: var(--border-subtle);
          background: rgba(255, 253, 250, 0.78);
        }

        .landing-proof__row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--space-4);
          align-items: center;
        }

        .landing-proof__item {
          text-align: center;
          font-family: var(--font-ui);
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          transition: color var(--motion-base) var(--ease-standard);
        }

        .landing-proof__item:hover {
          color: var(--color-brand-600);
        }

        .landing-faq {
          padding: var(--space-section) 0;
        }

        .landing-faq__grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }

        .landing-faq__title {
          margin: var(--space-5) 0 var(--space-4);
        }

        .landing-faq__item {
          border-bottom: var(--border-subtle);
        }

        .landing-faq__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding: 24px 0;
          text-align: left;
          color: var(--color-text);
          font-family: var(--font-ui);
          font-size: 1rem;
          font-weight: 600;
          transition: color var(--motion-base) var(--ease-standard);
        }

        .landing-faq__trigger:hover {
          color: var(--color-brand-600);
        }

        .landing-faq__icon {
          font-size: 1.5rem;
          font-weight: 300;
          transition: transform var(--motion-base) var(--ease-standard);
        }

        .landing-faq__answer {
          color: var(--color-text-muted);
          padding: 0 0 24px;
          line-height: 1.75;
        }

        .landing-cta {
          padding: 0 0 var(--space-section);
        }

        .landing-cta__panel {
          text-align: center;
          padding: clamp(32px, 6vw, 72px);
          background: linear-gradient(180deg, rgba(255, 253, 250, 0.86) 0%, rgba(248, 239, 228, 0.92) 100%);
        }

        .landing-cta__title {
          font-size: clamp(2.8rem, 6vw, 4.6rem);
          line-height: 0.96;
          margin: var(--space-5) auto var(--space-4);
          max-width: 12ch;
        }

        .landing-cta__text {
          max-width: 34rem;
          margin: 0 auto;
        }

        .landing-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          justify-content: center;
          margin-top: var(--space-8);
        }

        .landing-footer {
          padding: var(--space-6);
          text-align: center;
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          border-top: var(--border-subtle);
        }

        @media (max-width: 1023px) {
          .landing-hero__grid,
          .landing-quote,
          .landing-faq__grid {
            grid-template-columns: 1fr;
          }

          .landing-proof__row,
          .landing-services {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .landing-burger {
            display: inline-flex;
          }

          .page-topbar__inner {
            gap: var(--space-3);
          }

          .brand-mark__name {
            font-size: 0.9rem;
          }

          .brand-mark__icon {
            width: 34px;
            height: 34px;
          }

          .landing-hero {
            padding-top: var(--space-8);
          }

          .landing-hero__title,
          .landing-cta__title {
            max-width: none;
          }

          .landing-hero__image-frame {
            min-height: auto;
            aspect-ratio: 5 / 6;
          }

          .landing-hero__status {
            left: 16px;
            right: 16px;
            bottom: 16px;
            max-width: none;
          }

          .landing-hero__micro-pill {
            top: 16px;
            right: 16px;
          }

          .landing-marquee {
            overflow-x: auto;
          }

          .landing-marquee__track {
            min-width: max-content;
            padding-left: 12px;
            padding-right: 12px;
          }

          .landing-services,
          .landing-proof__row {
            grid-template-columns: 1fr;
          }

          .landing-proof__item {
            text-align: left;
          }

          .landing-quote__metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
