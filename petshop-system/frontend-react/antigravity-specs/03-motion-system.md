# 03 Motion System

## Motion philosophy

- Movimento deve comunicar causalidade e hierarquia.
- Toda animacao precisa ter objetivo claro: orientar, confirmar, destacar.

## Duration tokens

- motion-fast: 140ms
- motion-base: 220ms
- motion-slow: 360ms
- motion-enter-section: 520ms

## Easing tokens

- ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)
- ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1)
- ease-exit: cubic-bezier(0.4, 0, 1, 1)

## Core animations

1. Section reveal
- Trigger: entrada no viewport
- Effect: opacity 0 -> 1 e translateY 18px -> 0
- Timing: motion-enter-section, ease-emphasis
- Delay: stagger de 60ms entre itens de lista

2. Card hover
- Effect: translateY -4px, sombra de shadow-md para shadow-lg
- Timing: motion-base, ease-standard

3. Button press
- Effect: escala 1 -> 0.98 em mousedown, retorna em mouseup
- Timing: motion-fast

4. Form success
- Effect: banner aparece com fade + slide top 8px -> 0
- Timing: motion-base

5. Modal pattern (se usado)
- Backdrop: opacity 0 -> 1 em motion-base
- Panel: opacity 0 -> 1, scale 0.97 -> 1 em motion-base

6. Auth side visual motion
- Trigger: carregamento das telas login/cadastro
- Effect: entrada em camadas (badge/card lateral, depois imagem do pet)
- Timing: motion-base a motion-slow, ease-emphasis
- Optional: float sutil no pet com amplitude baixa
- Constraint: manter foco visual no formulario, sem loops agressivos

7. Error page motion (404)
- Trigger: carregamento da tela de erro
- Effect: card principal com fade + translateY curto
- CTA: hover com leve elevação e press 0.98
- Elemento visual: micro-float discreto, baixa amplitude
- Constraint: manter leitura e orientação do usuário como prioridade

## Motion constraints

- Nao aplicar animacao continua em elementos de leitura.
- Nao animar mais de 2 propriedades pesadas por componente.
- Para usuarios com reduce motion, remover translate/scale e manter apenas fade curto.
