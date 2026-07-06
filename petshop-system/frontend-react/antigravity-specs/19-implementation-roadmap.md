# 19 Implementation Roadmap (Teach Mode)

## Objetivo

Executar a expansão em passos pequenos, com validação rápida e baixo risco de regressão.

## Semana 1 (plano sugerido)

### Dia 1 — Fase 1 Backend base

1. Adicionar `role` em `User`.
2. Criar entidade `Pet` e endpoints CRUD.
3. Validar permissões básicas (CLIENT e ADMIN).

### Dia 2 — Fase 1 Frontend

1. Criar tela/aba de pets no perfil.
2. Integrar quick-select no formulário de agendamento.
3. Testar fluxo completo de cadastro -> seleção -> envio.

### Dia 3 — Fase 2 Backend

1. Criar `Service` e `AppointmentService`.
2. Expor `GET /api/services`.
3. Expor histórico de agendamentos com status.

### Dia 4 — Fase 2 Frontend

1. Adicionar seletor de serviços.
2. Criar aba de histórico com badges de status.
3. Testar filtros básicos por status.

### Dia 5 — Fase 3 e 4 (estrutura)

1. Implementar atualização de status por funcionário.
2. Implementar `AvailabilityConfig` e geração de slots.
3. Integrar formulário para carregar slots válidos.

## Como aprender enquanto implementa

1. Sempre comece pelo contrato da API antes do layout final.
2. Implemente um endpoint e valide com exemplo real (curl/Swagger) antes de avançar.
3. No frontend, conecte primeiro estado e dados; depois refina animação e visual.
4. A cada fase, rode build e teste manual dos fluxos críticos.

## Checklist de validação por fase

### Fase 1

- Pet cadastra, edita e exclui.
- Quick-select funciona no agendamento.

### Fase 2

- Serviços aparecem no formulário.
- Histórico mostra status corretamente.

### Fase 3

- Funcionário consegue alterar status.
- Cliente não vê ações internas.

### Fase 4

- Slots respeitam horário de funcionamento.
- Conflitos de horário são bloqueados.
