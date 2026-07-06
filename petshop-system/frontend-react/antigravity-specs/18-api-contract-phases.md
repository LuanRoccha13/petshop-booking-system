# 18 API Contract by Phase

## Objetivo

Organizar endpoints por fase para execução incremental sem quebrar o sistema atual.

## Fase 1 — Pets + perfil do cliente

### Endpoints

- `GET /api/profile`
- `PUT /api/profile`
- `GET /api/pets`
- `POST /api/pets`
- `PUT /api/pets/{id}`
- `DELETE /api/pets/{id}`

### Resultado esperado

Cliente consegue cadastrar pets e reutilizá-los no agendamento.

## Fase 2 — Serviços + histórico

### Endpoints

- `GET /api/services`
- `POST /api/services` (ADMIN)
- `PUT /api/services/{id}` (ADMIN)
- `GET /api/appointments/history`
- `GET /api/appointments?status=...`

### Resultado esperado

Catálogo de serviços ativo e histórico com status visível.

## Fase 3 — Papéis e operação interna

### Endpoints

- `GET /api/admin/users` (ADMIN)
- `PATCH /api/admin/users/{id}/role` (ADMIN)
- `GET /api/employee/agenda?date=YYYY-MM-DD` (EMPLOYEE/ADMIN)
- `PATCH /api/appointments/{id}/status` (EMPLOYEE/ADMIN)
- `POST /api/appointments/{id}/notes` (EMPLOYEE/ADMIN)

### Resultado esperado

Funcionário opera agenda e admin gerencia perfis.

## Fase 4 — Disponibilidade configurável

### Endpoints

- `GET /api/admin/availability-config` (ADMIN)
- `PUT /api/admin/availability-config` (ADMIN)
- `POST /api/admin/availability-blocks` (ADMIN)
- `DELETE /api/admin/availability-blocks/{id}` (ADMIN)
- `GET /api/availability/slots?date=YYYY-MM-DD&serviceId=...`

### Resultado esperado

Formulário passa a exibir somente slots válidos sem conflito.

## Convenções de resposta

1. Sempre retornar erros com mensagem amigável e código consistente.
2. Para ações sem payload, usar `204 No Content`.
3. Para conflitos de agenda, usar `409 Conflict` com motivo explícito.
