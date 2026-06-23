export interface Appointment {
  id: number;
  petName: string;
  breed: string;
  date: string;
  time: string;
  notes?: string;
  imageUrl?: string;
}

export interface AppointmentCreate {
  petName: string;
  breed: string;
  date: string;
  time: string;
  notes?: string;
  imageUrl?: string;
}
