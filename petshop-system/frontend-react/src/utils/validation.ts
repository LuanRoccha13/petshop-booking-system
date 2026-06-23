export function validateEmail(email: string): string | null {
  if (!email) {
    return 'E-mail é obrigatório';
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return 'E-mail inválido';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Senha é obrigatória';
  }
  if (password.length < 6) {
    return 'Senha deve ter pelo menos 6 caracteres';
  }
  return null;
}

export function validateAppointmentForm(form: {
  petName?: string;
  breed?: string;
  date?: string;
  time?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.petName || !form.petName.trim()) {
    errors.petName = 'Nome do pet é obrigatório';
  }

  if (!form.breed || !form.breed.trim()) {
    errors.breed = 'Raça é obrigatória';
  }

  if (!form.date) {
    errors.date = 'Data é obrigatória';
  } else {
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = 'Data não pode ser no passado';
    }
  }

  if (!form.time) {
    errors.time = 'Horário é obrigatório';
  }

  return errors;
}
