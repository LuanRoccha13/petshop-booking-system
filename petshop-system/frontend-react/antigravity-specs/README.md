# Petshop UI Specification Pack

Este pacote define um sistema visual completo para o frontend do petshop.
Objetivo: permitir que qualquer gerador de UI (incluindo antigravity) produza telas consistentes, modernas e fluidas sem cair em layout generico.

## Ordem de leitura

1. 01-brand-direction.md
2. 02-design-tokens.md
3. 03-motion-system.md
4. 04-component-specs.md
5. 05-page-recipes.md
6. 06-copy-voice.md
7. 07-accessibility-quality-gates.md
8. 08-execution-prompt-template.md
9. 09-image-asset-system.md
10. 10-antigravity-image-pass-prompt.md
11. 11-layout-error-fixes.md
12. 12-user-pet-management.md
13. 13-services-and-history.md
14. 14-roles-and-permissions.md
15. 15-scheduling-availability.md
16. 16-permission-matrix.md
17. 17-data-model-expansion.md
18. 18-api-contract-phases.md
19. 19-implementation-roadmap.md
20. 20-template-inspired-structure-motion.md
21. 21-antigravity-execution-prompt-template-template-inspired.md
22. 22-hard-acceptance-and-evidence-gate.md
23. 23-steno-inspired-landing-pass.md
24. 24-antigravity-execution-prompt-template-steno-landing.md
25. 25-steno-landing-acceptance-gate.md

## Regras de uso

1. Sempre aplicar os tokens antes de desenhar componentes.
2. Nunca inventar paleta fora do arquivo de tokens sem justificativa.
3. Toda tela deve passar nos quality gates antes de ser aceita.
4. A linguagem visual deve parecer produto real em producao, nao prototipo.
5. Animacao deve reforcar hierarquia e feedback, nunca distrair.

## Escopo alvo

- Landing publica
- Cadastro
- Login
- Dashboard autenticado
- Formulario de agendamento com upload de imagem
- Lista de agendamentos e cancelamento

## Leitura recomendada

Leia o arquivo 20 depois de 03-motion-system.md para aplicar o ritmo e a estrutura do template sem perder os tokens e as regras do sistema atual.
Use o arquivo 22 como gate final de aprovacao da rodada para evitar entrega cosmetica.
Para uma rodada focada especificamente em reproduzir a sensacao da landing da Steno.ai no contexto do petshop, leia 23, 24 e 25 em sequencia depois do arquivo 20.
