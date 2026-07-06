# 07 Accessibility and Quality Gates

## Accessibility requirements

1. Contraste minimo AA para texto e controles.
2. Todos os inputs com label explicita.
3. Estados de foco visiveis em teclado.
4. Navegacao completa por teclado em formularios e botoes.
5. Imagens relevantes com alt text descritivo.
6. Respeitar prefers-reduced-motion para animacoes.

## Responsive requirements

1. Mobile first sem quebra de layout em 320px.
2. Touch targets com minimo de 44px.
3. Tipografia sem clipping em 200 por cento de zoom.

## Performance requirements

1. Evitar animar propriedades que forcem reflow.
2. Priorizar transform e opacity nas transicoes.
3. Limitar camadas visuais pesadas em paginas com lista.

## Visual quality gates

Uma entrega so e aceita se cumprir todos os itens:

1. Hierarquia visual clara em ate 3 segundos de leitura.
2. Consistencia de raio, sombra e espacamento.
3. Estados de erro, loading e sucesso desenhados.
4. Nenhum componente com estilo generico de browser.
5. Animacoes fluidas, sem salto perceptivel.
6. Grades de cards em seções (ex.: depoimentos) não podem terminar com card órfão sem tratamento de layout.
7. Identidade de marca (logo) deve ser consistente em todas as telas com header/topbar.
8. Em mobile, navegação principal não pode comprimir links/CTAs a ponto de comprometer toque e leitura.
9. CTA visível no dashboard deve ter utilidade real validável (ação concreta no fluxo).
10. Em mobile, a navbar deve expor navegação por menu de hamburguer ou equivalente acessível quando a largura não comportar a versão horizontal.
