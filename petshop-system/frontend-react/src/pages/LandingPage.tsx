import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LandingLayout } from '../components/layout/LandingLayout';
import { Section } from '../components/layout/Section';
import { ContentArea } from '../components/layout/ContentArea';
import { Button, Card, Badge, Accordion, Icon } from '../components/ui';
import { PREMIUM_TRANSITIONS } from '../design-tokens/motion';

import heroImage from '../assets/images/mais-imagens-pet-shop/Gemini_Generated_Image_f40r03f40r03f40r-Photoroom.png';
import quoteImage from '../assets/images/mais-imagens-pet-shop/download (1)-Photoroom (1).png';
import serviceImageOne from '../assets/images/mais-imagens-pet-shop/pexels-goochie-poochie-19145890.jpg';
import serviceImageTwo from '../assets/images/mais-imagens-pet-shop/pexels-gustavo-fring-6816860.jpg';
import serviceImageThree from '../assets/images/mais-imagens-pet-shop/buddy-an-LpK2xddrElI-unsplash.jpg';

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

  return (
    <LandingLayout>

      {/* ─────────────────────────────────────────────────────────────────
          HERO SECTION
          Technique: Section is position:relative overflow:hidden.
          Image is position:absolute anchored to bottom-right, height-driven.
          Text is normal flow with z-10. Exactly how Apple/Stripe do it.
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bg" style={{ minHeight: 'min(90vh, 840px)' }}>

        {/* Dog — absolutely anchored to bottom-right, fills ~80% of section height */}
        <motion.img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-[90%] w-auto max-w-none object-contain object-bottom pointer-events-none select-none"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Content — sits in normal flow, z-10 so it's above the image */}
        <ContentArea className="relative z-10 h-full flex items-center">
          <div className="flex flex-col items-start gap-7 py-28 lg:py-36 max-w-[520px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="outline" className="text-brand-600 border-brand-500/30 bg-brand-soft">
                <span className="w-2 h-2 rounded-full bg-brand-500 mr-1.5 animate-pulse" />
                Cuidado premium em cada retorno
              </Badge>
            </motion.div>

            <motion.h1
              className="font-display text-5xl lg:text-[5.5rem] xl:text-[6rem] font-bold text-ink leading-[1.02] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              Cuidado que<br />acalma.
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-ink-muted leading-relaxed max-w-[440px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              Banho, tosa e acompanhamento digital em uma experiência desenhada para parecer calma, precisa e realmente especial.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              <Button size="lg" onClick={() => navigate('/register')} rightIcon={<Icon name="ArrowRight" size={18} />}>
                Criar minha conta
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
                Ver a experiência
              </Button>
            </motion.div>
          </div>
        </ContentArea>

        {/* Floating status pill — anchored visually to bottom-left of content area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, ...PREMIUM_TRANSITIONS.springComfortable }}
          className="absolute bottom-10 left-4 md:left-[calc((100vw-1240px)/2+2rem)] bg-surface/95 backdrop-blur-md p-4 rounded-xl shadow-elevation-2 border border-dark-border/10 max-w-[280px] z-20"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shrink-0" />
            <span className="font-ui font-bold text-sm text-ink">Banho + hidratação confirmados</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed ml-5">Hoje, 14h • chegada calma, saída impecável.</p>
        </motion.div>
      </section>

      {/* Services Section */}
      <Section animateOnScroll className="bg-surface-soft py-24">
        <ContentArea>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-ink mb-6">Nossa rotina</h2>
            <p className="text-lg text-ink-muted">A experiência B&T alia protocolos suaves de manejo com tecnologia que te mantém sempre informado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((card, idx) => (
              <Card key={idx} interactive className="p-0 overflow-hidden flex flex-col group border-none shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <Card.Title className="text-2xl mb-3">{card.title}</Card.Title>
                  <Card.Description>{card.text}</Card.Description>
                </div>
              </Card>
            ))}
          </div>
        </ContentArea>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────
          QUOTE SECTION
          Same technique as Hero. Section is relative overflow:hidden.
          Dog image absolutely anchored to bottom-right.
          Text content in normal flow on the left, z-10.
      ───────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-ink text-white"
        style={{ minHeight: 'min(80vh, 720px)' }}
      >

        {/* Dog — anchored to bottom-right, same height discipline as Hero */}
        <img
          src={quoteImage}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-[100%] w-auto max-w-none object-contain object-bottom pointer-events-none select-none"
        />

        {/* Subtle gradient so text stays readable when dog overlaps */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-transparent pointer-events-none z-[1]" />

        {/* Content — z-10 */}
        <ContentArea className="relative z-10 h-full flex items-end">
          <div className="flex flex-col items-start gap-6 py-24 lg:py-32 max-w-[520px]">
            <Badge variant="outline" className="text-white/60 border-white/20">A FILOSOFIA DO CUIDADO</Badge>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              A beleza vem depois.<br />
              <span className="text-brand-500">A confiança vem primeiro.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Quando o atendimento é previsível, gentil e bem executado, o resultado aparece no pelo, no olhar e na tranquilidade de quem deixa o pet com a gente.
            </p>
          </div>
        </ContentArea>
      </section>

      {/* FAQ Section */}
      <Section animateOnScroll className="py-24">
        <ContentArea className="max-w-3xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">DÚVIDAS FREQUENTES</Badge>
            <h2 className="font-display text-4xl font-bold text-ink mb-6">Pergunte sem pressa.<br/>A gente responde com clareza.</h2>
          </div>
          
          <Accordion type="single" className="border-none bg-transparent">
            {faqs.map((faq, idx) => (
              <Accordion.Item key={idx} value={`faq-${idx}`} className="border-b border-dark-border/10 py-2">
                <Accordion.Trigger className="text-left text-lg font-display hover:bg-transparent px-0 py-4">
                  {faq.q}
                </Accordion.Trigger>
                <Accordion.Content className="px-0 pb-6 text-base">
                  {faq.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </ContentArea>
      </Section>

      {/* CTA Section */}
      <Section animateOnScroll className="pb-32 pt-16">
        <ContentArea>
          <div className="bg-brand-500 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Pronto para começar?</h2>
              <p className="text-lg text-white/90 max-w-xl mb-10">
                Crie sua conta, escolha o melhor horário e acompanhe tudo em um fluxo tão bonito quanto funcional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-white hover:text-brand-700 hover:brightness-100 hover:shadow-xl" onClick={() => navigate('/register')}>
                  Quero agendar
                </Button>
                <Button size="lg" className="bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 hover:text-white" onClick={() => navigate('/login')}>
                  Já tenho conta
                </Button>
              </div>
            </div>
          </div>
        </ContentArea>
      </Section>

    </LandingLayout>
  );
}
