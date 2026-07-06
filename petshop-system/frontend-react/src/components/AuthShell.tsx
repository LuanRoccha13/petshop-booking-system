import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import dogLogoSvg from '../assets/images/landing/dog-sleeping-svgrepo-com.svg';

type AuthShellProps = {
  badgeText: string;
  title: ReactNode;
  subtitle: string;
  visualLabel: string;
  visualTitle: ReactNode;
  visualCopy: string;
  imageSrc: string;
  imageAlt: string;
  floatingTitle: string;
  floatingText: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthShell({
  badgeText,
  title,
  subtitle,
  visualLabel,
  visualTitle,
  visualCopy,
  imageSrc,
  imageAlt,
  floatingTitle,
  floatingText,
  footer,
  children,
}: AuthShellProps) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <header
        className="page-topbar"
        style={{
          background: 'rgba(248, 242, 234, 0.8)',
          borderBottom: '1px solid rgba(64, 43, 21, 0.08)',
        }}
      >
        <div className="page-topbar__inner">
          <Link to="/" className="brand-mark" aria-label="Voltar para a página inicial do PetShop B&T">
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
          </Link>

          <Link to="/" className="btn btn-ghost hide-mobile">
            Voltar ao início
          </Link>
        </div>
      </header>

      <main className="editorial-shell auth-shell">
        <div className="auth-shell__grid">
          <section className="auth-shell__content">
            <div className="editorial-kicker auth-shell__badge">{badgeText}</div>
            <h1 className="display-title auth-shell__title">{title}</h1>
            <p className="body-lead auth-shell__subtitle">{subtitle}</p>

            <div className="surface-panel auth-shell__panel">
              {children}
              <div className="auth-shell__footer">{footer}</div>
            </div>
          </section>

          <aside className="auth-shell__visual" aria-hidden="true">
            <div className="image-frame auth-shell__image-frame">
              <img src={imageSrc} alt={imageAlt} className="auth-shell__image" />
              <div className="floating-pill auth-shell__floating animate-float">
                <span className="floating-pill__dot" />
                <div>
                  <div className="auth-shell__floating-title">{floatingTitle}</div>
                  <div className="auth-shell__floating-text">{floatingText}</div>
                </div>
              </div>
            </div>

            <div className="auth-shell__visual-copy">
              <span className="editorial-kicker">{visualLabel}</span>
              <h2 className="auth-shell__visual-title">{visualTitle}</h2>
              <p className="auth-shell__visual-text">{visualCopy}</p>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        .auth-shell {
          padding: clamp(32px, 6vw, 72px) 0 var(--space-section);
        }

        .auth-shell__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        .auth-shell__badge {
          margin-bottom: var(--space-5);
        }

        .auth-shell__title {
          max-width: 12ch;
          margin-bottom: var(--space-4);
        }

        .auth-shell__subtitle {
          max-width: 34rem;
          margin-bottom: var(--space-8);
        }

        .auth-shell__panel {
          padding: clamp(24px, 4vw, 40px);
        }

        .auth-shell__footer {
          margin-top: var(--space-6);
          padding-top: var(--space-5);
          border-top: var(--border-subtle);
        }

        .auth-shell__visual {
          display: grid;
          gap: var(--space-6);
        }

        .auth-shell__image-frame {
          aspect-ratio: 4 / 5;
        }

        .auth-shell__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .auth-shell__floating {
          position: absolute;
          left: clamp(20px, 4vw, 32px);
          right: clamp(20px, 4vw, 32px);
          bottom: clamp(20px, 4vw, 32px);
          justify-content: flex-start;
        }

        .auth-shell__floating-title {
          font-family: var(--font-ui);
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .auth-shell__floating-text,
        .auth-shell__visual-text {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          line-height: 1.65;
        }

        .auth-shell__visual-copy {
          max-width: 32rem;
        }

        .auth-shell__visual-title {
          font-size: clamp(2.15rem, 4vw, 3.25rem);
          line-height: 0.98;
          margin: var(--space-4) 0 var(--space-3);
        }

        @media (max-width: 1023px) {
          .auth-shell__grid {
            grid-template-columns: 1fr;
          }

          .auth-shell__visual {
            order: 2;
          }

          .auth-shell__image-frame {
            aspect-ratio: 5 / 4;
          }
        }

        @media (max-width: 767px) {
          .auth-shell {
            padding-top: var(--space-8);
          }

          .auth-shell__image-frame {
            aspect-ratio: 1 / 1;
          }

          .auth-shell__floating {
            position: static;
            margin: var(--space-4);
          }
        }
      `}</style>
    </div>
  );
}
