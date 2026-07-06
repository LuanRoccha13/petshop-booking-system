# 25 - Steno Landing Acceptance Gate

## Objetivo

Garantir que a rodada da `LandingPage` realmente capture o resultado desejado pelo usuario, sem parar em refinamento superficial.

## Definition of Done

Todos os itens abaixo devem ser verdadeiros:

1. A `LandingPage` foi estruturalmente reorganizada.
2. A ordem de blocos da spec 23 foi respeitada.
3. O hero esta em formato split no desktop.
4. Existe imagem protagonista com overlay sutil.
5. Existe floating status card sobre a imagem principal.
6. Existe marquee horizontal continuo logo apos o hero.
7. Existe secao escura de citacao com composicao editorial.
8. Existe faixa horizontal de social proof inspirada em brands.
9. O FAQ esta minimalista, contrastado e acessivel.
10. Existe CTA final forte.
11. Reduced-motion foi tratado de forma explicita.
12. A landing continua coerente com a identidade do petshop.

## Evidencias obrigatorias

A entrega deve incluir:

1. Arquivos alterados.
2. Lista dos blocos implementados na ordem final da landing.
3. Tabela de motion com:
   - animacao
   - alvo
   - gatilho
   - fallback de reduced-motion
4. Checklist de responsividade:
   - hero desktop
   - hero mobile
   - marquee desktop
   - marquee mobile
   - quote section desktop
   - quote section mobile
   - FAQ
   - CTA final
5. Checklist de acessibilidade:
   - foco visivel
   - contraste
   - teclado no FAQ
   - reduced-motion

## Rubrica de aprovacao

### PASS

Todos os blocos obrigatorios existem, a mudanca estrutural e clara e o resultado transmite a sensacao premium desejada.

### PASS COM RESSALVAS

Existe mudanca estrutural real e quase todos os blocos estao corretos, mas ha pequenas lacunas de acabamento ou de motion sem comprometer o objetivo central.

### FAIL

Qualquer um dos itens abaixo ocorre:

1. O resultado ficou cosmetico.
2. O hero nao parece novo.
3. Nao existe marquee real.
4. A secao de citacao escura foi omitida ou ficou fraca.
5. O social proof horizontal nao foi implementado.
6. O FAQ continua pesado ou pouco refinado.
7. O CTA final nao fecha a narrativa.
8. Reduced-motion foi ignorado.

## Motivos de reabertura da rodada

1. O visual ficou mais proximo de landing generica do que de editorial premium.
2. As secoes repetem a mesma composicao sem alternancia de ritmo.
3. O mobile perdeu legibilidade ou toque confortavel.
4. A pagina parece copia direta da Steno.ai em vez de adaptacao para o petshop.
