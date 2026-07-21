import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollScrubVideo } from '../components/effects/ScrollScrubVideo';
import { LandingLayout } from '../components/layout/LandingLayout';
import { Section } from '../components/layout/Section';
import { ContentArea } from '../components/layout/ContentArea';
import { Button, Card, Badge, Accordion, Icon, Timeline, TestimonialCarousel } from '../components/ui';
import { PREMIUM_TRANSITIONS } from '../design-tokens/motion';
import { useRevealMask } from '../hooks/useRevealMask';

import heroImage from '../assets/images/mais-imagens-pet-shop/Gemini_Generated_Image_f40r03f40r03f40r-Photoroom.png';
import quoteImage from '../assets/images/mais-imagens-pet-shop/download (1)-Photoroom (1).png';
import quoteIllustrationImage from '../assets/images/mais-imagens-pet-shop/Gemini_Generated_Image_9hynhg9hynhg9hyn-Photoroom.png';
import serviceImageOne from '../assets/images/mais-imagens-pet-shop/buddy-an-LpK2xddrElI-unsplash.jpg';
import serviceImageTwo from '../assets/images/mais-imagens-pet-shop/pexels-gustavo-fring-6816860.jpg';
import serviceImageThree from '../assets/images/mais-imagens-pet-shop/pexels-goochie-poochie-19145890.jpg';

// Service card videos — preloaded as module assets (Vite handles the URL)
import videoOne   from '../assets/images/mais-imagens-pet-shop/video_card_1.mp4';
import videoTwo   from '../assets/images/mais-imagens-pet-shop/video_card_2.mp4';
import videoThree from '../assets/images/mais-imagens-pet-shop/video_card_3.mp4';
import { InteractiveVideoCard } from '../components/ui/InteractiveVideoCard';

const serviceCards = [
  {
    title: 'Banho com acabamento leve',
    text: 'Limpeza, hidratação e secagem pensadas para deixar o pelo bonito sem estressar o pet.',
    image: serviceImageOne,
    video: videoOne,
  },
  {
    title: 'Tosa com leitura de temperamento',
    text: 'Cada detalhe do corte respeita raça, conforto e o ritmo natural do atendimento.',
    image: serviceImageTwo,
    video: videoTwo,
  },
  {
    title: 'Rotina que continua no digital',
    text: 'Agende, confirme e acompanhe tudo em um fluxo claro, sem ligações ou esperas longas.',
    image: serviceImageThree,
    video: videoThree,
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

const timelineSteps = [
  {
    number: '01',
    title: 'Agendar',
    description: 'Escolha o melhor horário em poucos cliques. O ambiente digital é simples e transparente.',
    isActive: true,
  },
  {
    number: '02',
    title: 'Recepção',
    description: 'A chegada é tranquila, priorizando o conforto do pet antes do procedimento.',
  },
  {
    number: '03',
    title: 'Cuidado Completo',
    description: 'Banho e tosa com respeito ao tempo e temperamento do seu melhor amigo.',
  },
  {
    number: '04',
    title: 'Retorno Feliz',
    description: 'Saída impecável, sem stress, com notificação direta no seu celular.',
  },
];

const testimonialsData = [
  {
    quote: "Não é apenas limpeza. É a sensação de que cada detalhe foi pensado para o conforto do meu cachorro.",
    name: "Marina A.",
    role: "Tutora do Max"
  },
  {
    quote: "O agendamento digital me poupou muito tempo. E o cuidado na chegada fez toda a diferença.",
    name: "Rafael N.",
    role: "Tutor da Luna"
  },
  {
    quote: "A elegância está no controle e no respeito. O resultado no pelo é incrível e meu gato volta relaxado.",
    name: "Camila R.",
    role: "Tutora do Simba"
  },
  {
    quote: "Uma experiência premium de ponta a ponta. Fui informada sobre o status durante todo o procedimento.",
    name: "João P.",
    role: "Tutor do Duke"
  }
];


/** Single pill inside the marquee band */
function MarqueeItem({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-7 shrink-0 select-none">
      <Icon
        name={icon as never}
        size={14}
        className="text-brand-500 shrink-0 opacity-80"
      />
      <span
        className="font-ui text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-ink/50 whitespace-nowrap"
      >
        {label}
      </span>
      {/* Dot separator */}
      <span className="ml-5 w-[3px] h-[3px] rounded-full bg-ink/15 shrink-0" />
    </span>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef                = useRef<HTMLElement>(null);
  const quoteSectionRef        = useRef<HTMLElement>(null);
  const quoteIllustrationRef   = useRef<HTMLImageElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.05]);
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

  // Reveal-mask effect: cursor unveils Arcane illustration over the photo
  useRevealMask(quoteIllustrationRef, quoteSectionRef, {
    outerRadius:  140,
    innerRatio:   0.42,
    cursorAlpha:  0.11,
    radiusAlpha:  0.13,
  });

  return (
    <LandingLayout>

      {/* ─────────────────────────────────────────────────────────────────
          HERO SECTION
          Technique: Section is position:relative overflow:hidden.
          Image is position:absolute anchored to bottom-right, height-driven.
          Text is normal flow with z-10. Exactly how Apple/Stripe do it.
      ───────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden bg-bg" style={{ minHeight: 'min(90vh, 840px)' }}>

        {/* Hero image — static for now, replace src with heroVideo once Dobermann-hero.mp4 is in assets */}
        <motion.img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-[90%] w-auto max-w-none object-contain object-bottom pointer-events-none select-none"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale: heroImageScale, y: heroImageY }}
        />

        {/* Content — sits in normal flow, z-10 so it's above the image */}
        <ContentArea className="relative z-10 h-full flex items-center">
          <motion.div 
            className="flex flex-col items-start gap-7 py-28 lg:py-36 max-w-[520px]"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
          >
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
          </motion.div>
        </ContentArea>

        {/* Premium Indicators */}
        <ContentArea className="absolute inset-x-0 bottom-8 z-20 pointer-events-none">
          <motion.div 
            className="grid gap-5 border-t border-ink/10 pt-5 sm:grid-cols-3 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="block text-xl font-semibold text-ink">~2 min</span>
              <span className="font-ui mt-1 block text-[10px] tracking-wider uppercase text-ink-muted">Agendamento rápido</span>
            </div>
            <div>
              <span className="block text-xl font-semibold text-ink">360°</span>
              <span className="font-ui mt-1 block text-[10px] tracking-wider uppercase text-ink-muted">Cuidado completo</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-xl font-semibold text-ink">4.9★</span>
              <span className="font-ui mt-1 block text-[10px] tracking-wider uppercase text-ink-muted">Avaliações positivas</span>
            </div>
          </motion.div>
        </ContentArea>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          MARQUEE TRANSITION BAND
          Overlaps the Hero bottom via -mt-px, creating visual continuity.
          Pure CSS animation — no JS timers, no rAF, no Intersection Observer.
          Content is aria-hidden: it is purely decorative.
      ───────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative z-20 -mt-px overflow-hidden border-y border-dark-border/8"
        style={{
          background: 'rgba(245, 239, 230, 0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(33,24,17,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Left / right edge fades — mask the loop seam */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, rgba(245,239,230,0.9), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, rgba(245,239,230,0.9), transparent)' }} />

        {/* The track — items duplicated for seamless loop; CSS moves it -50% */}
        <div className="marquee-track py-0" style={{ height: '72px', alignItems: 'center' }}>
          {/* Set A */}
          {[
            { icon: 'Sparkles',      label: 'Premium Grooming'       },
            { icon: 'Stethoscope',   label: 'Veterinary Care'        },
            { icon: 'Bath',          label: 'Spa & Relaxation'       },
            { icon: 'CalendarCheck', label: 'Digital Booking'        },
            { icon: 'Activity',      label: 'Live Updates'           },
            { icon: 'HeartPulse',    label: 'Health Tracking'        },
            { icon: 'BadgeCheck',    label: 'Certified Specialists'  },
            { icon: 'Truck',         label: 'Pickup & Delivery'      },
            { icon: 'Star',          label: '4.9★ Customer Rating'   },
            { icon: 'PawPrint',      label: '+5,000 Happy Pets'      },
          ].map(({ icon, label }) => (
            <MarqueeItem key={`a-${label}`} icon={icon} label={label} />
          ))}
          {/* Set B — exact duplicate for seamless CSS loop */}
          {[
            { icon: 'Sparkles',      label: 'Premium Grooming'       },
            { icon: 'Stethoscope',   label: 'Veterinary Care'        },
            { icon: 'Bath',          label: 'Spa & Relaxation'       },
            { icon: 'CalendarCheck', label: 'Digital Booking'        },
            { icon: 'Activity',      label: 'Live Updates'           },
            { icon: 'HeartPulse',    label: 'Health Tracking'        },
            { icon: 'BadgeCheck',    label: 'Certified Specialists'  },
            { icon: 'Truck',         label: 'Pickup & Delivery'      },
            { icon: 'Star',          label: '4.9★ Customer Rating'   },
            { icon: 'PawPrint',      label: '+5,000 Happy Pets'      },
          ].map(({ icon, label }) => (
            <MarqueeItem key={`b-${label}`} icon={icon} label={label} />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <Section animateOnScroll className="bg-surface-soft py-24">
        <ContentArea>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-ink mb-6">Nossa rotina</h2>
            <p className="text-lg text-ink-muted">A experiência B&T alia protocolos suaves de manejo com tecnologia que te mantém sempre informado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((card, idx) => (
              <InteractiveVideoCard
                key={idx}
                poster={card.image}
                video={card.video}
                title={card.title}
                description={card.text}
              />
            ))}
          </div>
        </ContentArea>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────
          TIMELINE SECTION (Como Funciona)
      ───────────────────────────────────────────────────────────────── */}
      <Section className="py-24 bg-surface relative overflow-hidden">
        <ContentArea>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div 
              className="lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="outline" className="mb-4 text-brand-600 border-brand-500/20 bg-brand-soft">COMO FUNCIONA</Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-6">A qualidade nasce da disciplina.</h2>
              <p className="text-lg text-ink-muted leading-relaxed">Uma progressão clara: agendar, acolher, cuidar e retornar.</p>
            </motion.div>
            <div>
              <Timeline items={timelineSteps} />
            </div>
          </div>
        </ContentArea>
      </Section>

      {/* ─────────────────────────────────────────────────────────────────
          QUOTE SECTION
          Section height increased ~18% (min(80vh,720px) → min(95vh,840px)).
          Two images stacked at identical absolute position:
            — quoteImage (photo)           → always visible, base layer
            — quoteIllustrationImage (art) → hidden by CSS mask, revealed on hover
          Mouse events on the section translate to mask coords via img.getBoundingClientRect().
      ───────────────────────────────────────────────────────────────── */}
      <section
        ref={quoteSectionRef}
        className="relative overflow-hidden bg-ink text-white"
        style={{ minHeight: 'min(96vh, 980px)' }}
      >
      
        {/* Cinematic depth - ambient glow */}
        <div 
          className="absolute inset-0 bg-brand-500/15 mix-blend-color-dodge blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" 
          style={{ zIndex: 1 }} 
        />
        <div 
          className="absolute inset-0 bg-[#caff75]/10 mix-blend-color-dodge blur-[120px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" 
          style={{ zIndex: 1 }} 
        />

        {/* Base photo — always visible */}
        <img
          src={quoteImage}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 -right-[130px] lg:-right-[160px] h-[100%] w-auto max-w-none object-contain object-bottom pointer-events-none select-none"
          style={{ zIndex: 1 }}
        />

        {/* Illustration (Arcane style) — hidden by CSS radial-gradient mask.
            The mask is written by useRevealMask entirely via DOM refs.
            Initial opacity:0 prevents flash before the rAF loop takes over.
            Both images must have identical sizing classes so pixels align. */}
        <img
          ref={quoteIllustrationRef}
          src={quoteIllustrationImage}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 -right-[130px] lg:-right-[160px] h-[100%] w-auto max-w-none object-contain object-bottom pointer-events-none select-none"
          style={{
            zIndex:            2,
            opacity:           0,
            maskImage:         'none',
            WebkitMaskImage:   'none',
          }}
        />

        {/* Left-to-right gradient: ensures text stays readable over the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-transparent pointer-events-none" style={{ zIndex: 3 }} />

        {/* Content — z-10 (above gradient, above images) */}
        <ContentArea className="relative h-full flex items-end" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-start gap-8 py-32 lg:py-40 max-w-[520px]">
            <Badge variant="outline" className="text-white/60 border-white/20">A FILOSOFIA DO CUIDADO</Badge>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              A beleza vem depois.<br />
              <span className="text-brand-500">A confiânça vem primeiro.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Quando o atendimento é previsível, gentil e bem executado, o resultado aparece no pelo, no olhar e na tranquilidade de quem deixa o pet com a gente.
            </p>
          </div>
        </ContentArea>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          TESTIMONIALS SECTION
      ───────────────────────────────────────────────────────────────── */}
      <Section className="py-24 border-y border-ink/10 bg-bg overflow-hidden relative">
        <ContentArea>
          <motion.div 
            className="max-w-4xl mb-16"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="outline" className="mb-4 text-brand-600 border-brand-500/20 bg-brand-soft">Perspectivas</Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-6">O impacto permanece depois do encontro.</h2>
            <p className="text-lg text-ink-muted leading-relaxed">Relatos reais sobre uma presença que combina carinho, precisão e tranquilidade.</p>
          </motion.div>
          
          <TestimonialCarousel testimonials={testimonialsData} />
        </ContentArea>
      </Section>

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
