import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: 24 }}>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você tentou acessar não existe.</p>
      <Link to="/">Voltar ao início</Link>
    </main>
  );
}
