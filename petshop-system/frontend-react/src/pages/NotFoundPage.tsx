import { Link } from 'react-router-dom';
import dogLogoSvg from '../assets/images/landing/dog-sleeping-svgrepo-com.svg';
import notFoundImage from '../assets/images/mais-imagens-pet-shop/hayffield-l-ZVdZw2p08y4-unsplash.jpg';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <header
        className="page-topbar"
        style={{
          background: 'rgba(248, 242, 234, 0.82)',
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

      <main className="editorial-shell notfound-shell">
        <div className="notfound-shell__grid">
          <section className="notfound-shell__copy">
            <div className="editorial-kicker notfound-shell__badge">página não encontrada</div>
            <div className="notfound-shell__code">404</div>
            <h1 className="display-title notfound-shell__title">
              Esse caminho saiu da rota.
              <br />
              O cuidado continua por aqui.
            </h1>
            <p className="body-lead notfound-shell__text">
              A página que você tentou abrir não existe mais. Mas o caminho para agendar o próximo banho ou tosa continua simples e direto.
            </p>
            <div className="notfound-shell__actions">
              <Link to="/" className="btn btn-primary btn-lg">
                Voltar ao início
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Ir para o login
              </Link>
            </div>
          </section>

          <aside className="notfound-shell__visual" aria-hidden="true">
            <div className="image-frame notfound-shell__image-frame">
              <img src={notFoundImage} alt="" className="notfound-shell__image" />
              <div className="floating-pill notfound-shell__floating animate-float">
                <span className="floating-pill__dot" />
                <div>
                  <div className="notfound-shell__floating-title">Rota segura</div>
                  <div className="notfound-shell__floating-text">Use os botões ao lado para voltar ao fluxo principal.</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        .notfound-shell {
          display: flex;
          align-items: center;
          min-height: calc(100vh - 77px);
          padding: var(--space-section) 0;
        }

        .notfound-shell__grid {
          display: grid;
          grid-template-columns: minmax(0, 0.98fr) minmax(0, 1.02fr);
          gap: clamp(32px, 6vw, 84px);
          align-items: center;
          width: 100%;
        }

        .notfound-shell__badge {
          margin-bottom: var(--space-5);
        }

        .notfound-shell__code {
          font-family: var(--font-display);
          font-size: clamp(5rem, 13vw, 10rem);
          line-height: 0.82;
          color: var(--color-brand-500);
          margin-bottom: var(--space-4);
        }

        .notfound-shell__title {
          max-width: 11ch;
          margin-bottom: var(--space-4);
        }

        .notfound-shell__text {
          max-width: 33rem;
        }

        .notfound-shell__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin-top: var(--space-8);
        }

        .notfound-shell__image-frame {
          aspect-ratio: 4 / 5;
        }

        .notfound-shell__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .notfound-shell__floating {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 24px;
        }

        .notfound-shell__floating-title {
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .notfound-shell__floating-text {
          color: var(--color-text-muted);
          font-size: 0.82rem;
          line-height: 1.55;
        }

        @media (max-width: 1023px) {
          .notfound-shell__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .notfound-shell {
            padding: var(--space-10) 0 var(--space-section);
          }

          .notfound-shell__actions > * {
            width: 100%;
          }

          .notfound-shell__floating {
            position: static;
            margin: var(--space-4);
          }

          .notfound-shell__image-frame {
            aspect-ratio: 1 / 1;
          }
        }
      `}</style>
    </div>
  );
}
