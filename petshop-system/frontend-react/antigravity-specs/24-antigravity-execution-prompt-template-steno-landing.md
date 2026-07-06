# 24 - Antigravity Execution Prompt Template - Steno Landing Pass

Use este prompt para pedir ao antigravity uma rodada focada especificamente em reproduzir a sensacao da landing da Steno.ai dentro da `LandingPage` do petshop.

## Prompt Base

Use os arquivos desta pasta como fonte obrigatoria de design, UX, motion e criterios de aceite.

Leia obrigatoriamente estes arquivos antes de alterar a landing:

- 01-brand-direction.md
- 02-design-tokens.md
- 03-motion-system.md
- 04-component-specs.md
- 05-page-recipes.md
- 06-copy-voice.md
- 07-accessibility-quality-gates.md
- 09-image-asset-system.md
- 20-template-inspired-structure-motion.md
- 23-steno-inspired-landing-pass.md
- 25-steno-landing-acceptance-gate.md

### Tarefa desta rodada

Recriar a `LandingPage` do petshop para que ela transmita a mesma sensacao visual percebida na landing da Steno.ai:

- hero split premium
- imagem dominante com floating glass card
- faixa horizontal com marquee continuo
- bloco escuro de citacao impactante
- social proof horizontal estilo brands
- FAQ minimalista e contrastado
- CTA final forte

### Restricoes obrigatorias

1. Nao copiar texto, estrutura literal ou assets da Steno.ai.
2. Manter a identidade do petshop e os tokens existentes como sistema base.
3. Priorizar assets de `src/assets/images/mais-imagens-pet-shop` para a narrativa visual.
4. Nao entregar uma rodada cosmetica.
5. Nao remover responsividade ou acessibilidade para ganhar velocidade.
6. Em `prefers-reduced-motion`, desligar ou simplificar loops continuos e animacoes mais fortes.

### Regras de implementacao

1. A sequencia da landing deve seguir exatamente a ordem da spec 23.
2. O hero deve ter duas colunas no desktop e hierarquia muito clara no mobile.
3. O floating card deve parecer premium e contextual ao servico do petshop.
4. O marquee principal deve ser perceptivel de imediato e sem salto visual no loop.
5. A secao de citacao deve ter papel narrativo real, nao ser apenas um banner com fundo escuro.
6. A secao de social proof deve parecer credibilidade editorial, nao grade de logos improvisada.
7. O FAQ deve parecer mais limpo e sofisticado que o acordeao atual.
8. O CTA final deve fechar a narrativa com clareza.

### Se o projeto exigir escolha tecnica

1. Para loops decorativos simples, pode usar animacao CSS bem controlada.
2. Se houver necessidade de gesto touch real ou controle mais robusto no mobile, prefira Swiper, que ja existe no projeto.
3. Nao adicionar dependencias novas se as atuais forem suficientes.

### Saida esperada

1. Landing com mudanca estrutural perceptivel.
2. Melhor ritmo vertical entre secoes.
3. Tipografia mais editorial e premium.
4. Motion claro, mas controlado.
5. Melhor percepcao de valor da marca.

### Formato obrigatorio da entrega

1. Resumo por arquivo alterado.
2. Lista dos 7 blocos da landing e como cada um foi implementado.
3. Checklist de motion da landing com PASS ou FAIL por item.
4. Checklist de responsividade mobile e desktop.
5. Checklist de acessibilidade com foco, contraste e reduced-motion.
6. Veredito final usando a rubrica da spec 25: PASS, PASS COM RESSALVAS ou FAIL.

### Condicoes de rejeicao automatica

1. Hero sem split claro e sem floating card.
2. Ausencia de marquee perceptivel.
3. Ausencia do bloco de citacao escuro.
4. FAQ ainda com cara de acordeao generico.
5. CTA final fraco ou inexistente.
6. Resultado muito parecido com a landing anterior.

## Prompt Base End
