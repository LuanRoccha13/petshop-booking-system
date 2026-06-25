# 04 Component Specs

## Button

### Variants

- Primary: fundo gradient-cta, texto branco, sombra-sm
- Secondary: fundo color-surface, borda-subtle, texto color-text
- Danger: fundo color-danger, texto branco
- Ghost: fundo transparente, texto color-brand-600

### States

- Hover: leve elevacao + brilho sutil
- Focus: shadow-focus
- Disabled: opacidade 0.5 e cursor not-allowed
- Loading: spinner inline e label de acao progressiva

## Input and textarea

- Altura minima 48px para input
- Label acima com text-label
- Borda-subtle no repouso
- Hover: borda-strong
- Focus: borda color-brand-600 + shadow-focus
- Erro: borda color-danger, helper text color-danger

## Card

- Fundo color-surface
- Borda border-subtle
- Raio radius-lg
- Sombra shadow-sm base, shadow-md hover
- Padding interno space-6

## Appointment card

Ordem interna obrigatoria:

1. Imagem do pet no topo (altura fixa, object-fit cover)
2. Nome do pet como titulo
3. Metadados: raca, data, horario
4. Observacoes em estilo discreto
5. Acao principal de cancelamento no rodape

## Navbar (landing)

- Header com leve blur e fundo translucido em scroll
- CTA principal sempre visivel
- Links com underline animado no hover

## Feedback components

- Success banner: icone + texto curto + tom verde suave
- Error banner: icone + texto objetivo + tom vermelho suave
- Empty state: ilustracao simples, titulo curto, CTA claro
