import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { MOTION } from '../../design-tokens/motion';

const NAV_ITEMS = [
  { id: 'services', label: 'Rotina' },
  { id: 'process', label: 'Como Funciona' },
  { id: 'philosophy', label: 'Filosofia' },
  { id: 'testimonials', label: 'Depoimentos' },
  { id: 'faq', label: 'FAQ' },
];

export function LandingNavbar() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Bloqueio de scroll no body quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Rastreamento de seção via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map(i => i.id)];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -60% 0px', // Cruza a linha dos 40% (meio superior da tela)
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll ao clicar
  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reatividade ao scroll (Framer Motion)
  const { scrollY } = useScroll();
  
  // No topo: fundo transparente, sem sombra, maior padding vertical
  // Ao descer: backdrop blur, opacidade de fundo, sombra sutil, menor padding
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 16]);
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.05]);
  const paddingY = useTransform(scrollY, [0, 100], ['1.5rem', '0.75rem']);
  const borderColorOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-[100] flex justify-center w-full px-3 md:px-6"
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
        transition={{ duration: MOTION.duration.base, ease: MOTION.ease.premium }}
      >
        <motion.nav
          className="relative flex items-center justify-between w-full max-w-[1320px] rounded-2xl mx-auto px-4 md:px-5 py-2 md:py-3.5 transition-all"
          style={{
            backgroundColor: useTransform(bgOpacity, v => `rgba(255, 253, 250, ${v})`), // surface color
            backdropFilter: useTransform(blurValue, v => `blur(${v}px)`),
            WebkitBackdropFilter: useTransform(blurValue, v => `blur(${v}px)`),
            boxShadow: useTransform(shadowOpacity, v => `0 18px 60px rgba(0,0,0,${v})`),
            borderColor: useTransform(borderColorOpacity, v => `rgba(25, 22, 17, ${v})`), // ink color
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          {/* Logo */}
          <button 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 outline-none rounded-lg"
          >
            <div className="md:hidden">
              <Logo size="sm" />
            </div>
            <div className="hidden md:block">
              <Logo size="md" />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-brand-700' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {/* Hover effect - just text color */}
                  <span className="relative z-10">{item.label}</span>

                  {/* Active Indicator (Framer Motion LayoutId) */}
                  {isActive && (
                    <motion.div
                      layoutId="landing-nav-indicator"
                      className="absolute inset-0 bg-brand-50 rounded-xl"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 35,
                        mass: 0.8
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5 md:gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-ink-muted hover:text-brand-600 transition-colors hidden sm:block px-2"
            >
              Entrar
            </button>
            <Button 
              size="sm" 
              shimmer 
              onClick={() => navigate('/register')}
              className="text-xs px-3 py-1.5 md:text-sm md:px-4 md:py-2"
            >
              Agendar
            </Button>
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-surface-soft border border-dark-border/5 text-ink hover:bg-surface-hover transition-colors"
            >
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.base, ease: MOTION.ease.premium }}
            className="fixed inset-0 z-[200] bg-surface/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border/5">
              <Logo size="md" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-surface-soft border border-dark-border/5 text-ink hover:bg-surface-hover transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: MOTION.duration.base, ease: MOTION.ease.premium }}
                      onClick={() => scrollTo(item.id)}
                      className={`text-left text-2xl font-display font-semibold py-3 transition-colors ${
                        isActive ? 'text-brand-500' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: MOTION.duration.base, ease: MOTION.ease.premium }}
                className="mt-auto pt-6 border-t border-dark-border/5 flex flex-col gap-3"
              >
                <Button size="lg" shimmer className="w-full" onClick={() => navigate('/register')}>
                  Agendar agora
                </Button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 text-center text-ink-muted font-semibold hover:text-ink transition-colors"
                >
                  Já tenho conta
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
