import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { PREMIUM_TRANSITIONS } from '../design-tokens/motion';
import { 
  WelcomeWidget, 
  UpcomingAppointmentsWidget, 
  PetSummaryWidget, 
  RecentActivityWidget, 
  QuickActionsWidget 
} from '../components/widgets';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: PREMIUM_TRANSITIONS.springComfortable }
};

export default function DashboardPage() {
  const { email, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Mock data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const dummyAppointments = [
    { id: 1, type: 'Banho Premium', status: 'Confirmado', date: '14 Ago', time: '14:00', pet: 'Spike' },
    { id: 2, type: 'Tosa Higiênica', status: 'Confirmado', date: '21 Ago', time: '10:30', pet: 'Luna' }
  ];

  const dummyPets = [
    { id: 1, name: 'Spike', breed: 'Golden Retriever', age: 3 },
    { id: 2, name: 'Luna', breed: 'SRD', age: 1 }
  ];

  const dummyActivities = [
    { description: 'Agendamento "Banho Premium" confirmado.', date: 'Ontem, 18:30' },
    { description: 'Perfil do pet "Luna" atualizado.', date: 'Segunda-feira, 14:12' },
    { description: 'Conta criada com sucesso.', date: '01 Ago, 09:00' }
  ];

  return (
    <DashboardLayout userEmail={email || undefined} onLogout={logout}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <WelcomeWidget userName={email?.split('@')[0] || 'Usuário'} isLoading={isLoading} />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
          {/* Main Column - Higher Hierarchy */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <UpcomingAppointmentsWidget appointments={dummyAppointments} isLoading={isLoading} />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <PetSummaryWidget pets={dummyPets} isLoading={isLoading} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <RecentActivityWidget activities={dummyActivities} isLoading={isLoading} />
              </motion.div>
            </div>
          </div>
          
          {/* Secondary Column - Contextual Actions */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <QuickActionsWidget 
                onNewBooking={() => {}} 
                onAddPet={() => {}} 
                onViewHistory={() => {}} 
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-surface/50 rounded-2xl p-6 border border-dark-border/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-500/20 transition-colors" />
              <h3 className="font-semibold text-ink mb-2 relative z-10">Dica B&T</h3>
              <p className="text-sm text-ink-muted leading-relaxed relative z-10">
                Lembre-se de manter a carteirinha de vacinação do seu pet atualizada antes do próximo banho.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
