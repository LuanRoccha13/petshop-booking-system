import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    name: 'Ana Silva',
    pet: 'Max (Labrador)',
    feedback: 'Excelente atendimento! Meu cachorro saiu muito feliz e bem cuidado.',
    rating: 5,
  },
  {
    name: 'Carlos Oliveira',
    pet: 'Luna (Gato Persa)',
    feedback: 'Profissionais competentes e ambiente muito limpo. Recomendo!',
    rating: 5,
  },
  {
    name: 'Marina Costa',
    pet: 'Bella (Poodle)',
    feedback: 'Ótima experiência! Voltarei com certeza. Os banhos deixam ela belíssima.',
    rating: 5,
  },
  {
    name: 'Roberto Santos',
    pet: 'Rex (Pastor Alemão)',
    feedback: 'Agendamento fácil e rápido. Recomendo para todos os donos de pets!',
    rating: 5,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24, color: '#1f2937', fontWeight: 700 }}>
          🐾 PetShop Banho & Tosa
        </h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '2px solid #2563eb',
              color: '#2563eb',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2563eb',
              border: 'none',
              color: '#fff',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Cadastro
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 48, fontWeight: 700, margin: '0 0 16px 0' }}>
          Bem-vindo ao nosso PetShop!
        </h2>
        <p style={{ fontSize: 20, margin: '0 0 32px 0', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Oferecemos banho, tosa e cuidados completos para seu pet com profissionais experientes e ambiente acolhedor.
        </p>
        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '16px 32px',
            fontSize: 18,
            backgroundColor: '#fff',
            color: '#2563eb',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Quero Agendar 🎉
        </button>
      </section>

      {/* Services Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: '60px auto',
          padding: '0 24px',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, marginBottom: 40, color: '#1f2937' }}>
          Nossos Serviços
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>🛁</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#1f2937' }}>Banho</h3>
            <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
              Banho completo com produtos naturais e de qualidade, cuidado especial com a higiene e bem-estar do seu pet.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>✂️</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#1f2937' }}>Tosa</h3>
            <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
              Tosa especializada para diferentes raças, com profissionais experientes e equipamento de qualidade.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>💅</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#1f2937' }}>Cuidados</h3>
            <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
              Limpeza de ouvido, corte de unhas, escovação de dentes e outros cuidados especiais para seu pet.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        style={{
          backgroundColor: '#f3f4f6',
          padding: '60px 24px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, marginBottom: 40, color: '#1f2937' }}>
            Avaliações dos Clientes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  padding: 24,
                  borderRadius: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 18,
                      marginRight: 12,
                    }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1f2937' }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#6b7280' }}>
                      {testimonial.pet}
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
                  "{testimonial.feedback}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 24px 0' }}>
          Pronto para cuidar do seu pet?
        </h2>
        <p style={{ fontSize: 18, margin: '0 0 32px 0', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Crie sua conta agora e comece a agendar os melhores serviços para o seu animal.
        </p>
        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '16px 32px',
            fontSize: 18,
            backgroundColor: '#fff',
            color: '#2563eb',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Criar Conta Agora
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1f2937',
          color: '#fff',
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 PetShop Banho & Tosa. Todos os direitos reservados. 🐾
        </p>
      </footer>
    </div>
  );
}
