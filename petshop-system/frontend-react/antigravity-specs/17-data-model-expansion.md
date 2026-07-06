# 17 Data Model Expansion

## Objetivo

Definir o modelo de dados mínimo para suportar pets, catálogo de serviços, histórico e agenda configurável.

## Entidades novas

### Pet

- id
- user_id (owner)
- name
- breed
- photo_url
- observations
- allergies
- preferences
- created_at
- updated_at

### Service

- id
- name (banho, tosa, hidratação...)
- description
- duration_minutes
- active
- created_at
- updated_at

### AppointmentService

Tabela de ligação para permitir 1..N serviços por agendamento.

- id
- appointment_id
- service_id

### AvailabilityConfig

- id
- start_time (ex: 09:00)
- end_time (ex: 19:30)
- slot_interval_minutes (ex: 30)
- timezone
- active
- updated_by
- updated_at

### AvailabilityBlock

- id
- date
- start_time
- end_time
- reason
- created_by

### AppointmentStatusHistory

- id
- appointment_id
- status
- note
- changed_by
- changed_at

## Ajustes em entidades existentes

### User

- adicionar `role` (enum: CLIENT, EMPLOYEE, ADMIN)

### Appointment

- substituir `petName`/`breed` hardcoded por referência opcional a `pet_id`
- manter snapshot textual para histórico (pet_name_snapshot, breed_snapshot)
- adicionar `status` (enum)

## Estratégia para evitar migração traumática

1. Manter compatibilidade com campos antigos na fase de transição.
2. Tornar `pet_id` opcional no início, obrigatório após estabilização.
3. Popular catálogo de serviços inicial via seed.
