# 23 - Steno Inspired Landing Pass

## Objetivo

Gerar uma nova rodada da landing publica com a mesma sensacao percebida no video da Steno.ai:

- premium e editorial
- limpa e confiante
- com poucas secoes, mas secoes fortes
- com motion claro e bem distribuido
- com imagem protagonista e cards flutuantes

Nao e para copiar a Steno.ai literalmente. E para traduzir a experiencia visual para a identidade do petshop.

## Escopo desta spec

Esta spec vale especificamente para a `LandingPage`.

Ela complementa os arquivos 01, 02, 03, 04, 05, 06, 07, 09 e 20.
Se houver conflito, esta spec prevalece para a landing desta rodada.

## Resultado esperado

A landing deve parecer uma tela realmente refeita, nao uma tela antiga com cores e sombras novas.

O resultado deve transmitir:

1. cuidado premium
2. calma e confianca
3. hierarquia tipografica mais forte
4. melhor storytelling vertical
5. acabamento mais proximo de marca premium do que de marketplace comum

## Estrutura obrigatoria da landing

Sequencia obrigatoria:

1. sticky header translucido
2. hero split com imagem dominante
3. marquee infinito de prova visual ou servicos
4. bloco de citacao impactante em secao escura
5. social proof horizontal do tipo brands / selos / credenciais
6. FAQ minimalista e contrastado
7. CTA final forte

Nao substituir essa sequencia por grade generica de beneficios logo abaixo da hero.

## 1. Sticky header translucido

### Requisitos

1. Header fixo ou sticky no topo.
2. Fundo com blur e translucidez suave ao rolar.
3. Logo do produto a esquerda.
4. Links enxutos de navegacao no centro ou alinhados ao lado da marca.
5. CTA principal sempre visivel.

### Comportamento

1. Em repouso: header mais leve, quase misturado ao fundo.
2. Em scroll: fundo mais perceptivel, borda fina, blur e leve sombra.
3. Em mobile: menu consolidado, sem comprimir todos os links lado a lado.

## 2. Hero split com imagem dominante

### Estrutura obrigatoria

Coluna esquerda:

1. eyebrow ou quote pill curta
2. headline curta e muito forte
3. subheadline com beneficio claro
4. CTA primario
5. CTA secundario opcional

Coluna direita:

1. imagem principal grande
2. overlay sutil para integrar a imagem ao fundo
3. card flutuante glassmorphic sobre a imagem

### Regras visuais

1. Texto do hero deve ficar alinhado a esquerda no desktop.
2. A headline deve usar contraste tipografico alto e sensacao editorial.
3. A coluna de imagem deve parecer protagonista, nao thumbnail lateral.
4. O card flutuante deve lembrar o papel do card "Emma's Twin" visto na referencia, mas com conteudo do petshop.

### Conteudo recomendado para o floating card

Exemplos validos:

- Cuidado premium ativo
- Banho + tosa confirmados
- Check-in do pet em andamento
- Ritual de cuidado do seu pet

### Regra de assets

1. Priorizar imagens reais de `src/assets/images/mais-imagens-pet-shop`.
2. Se houver PNG com recorte util, ele pode apoiar o card ou o overlay.
3. Nao usar video como unico meio do hero.

## 3. Marquee infinito de prova visual ou servicos

## Objetivo

Trazer o dinamismo horizontal percebido na referencia, logo apos a hero, sem cair em carrossel pesado ou grade estatica comum.

### Estrutura obrigatoria

1. Uma esteira horizontal continua.
2. O track deve conter repeticao suficiente para loop sem salto visual aparente.
3. O conteudo pode ser composto por:
   - cards de servico
   - micro-beneficios
   - provas de confianca
   - mini-cases

### Direcao recomendada

1. Desktop: autoplay continuo com ritmo suave.
2. Mobile: a secao deve continuar legivel e natural.
3. Se houver necessidade de interacao por gesto, preferir Swiper ja presente no projeto em vez de simular swipe com hacks.

### Regras de motion

1. Movimento continuo e suave, nunca rapido.
2. Hover pode pausar no desktop se isso ajudar legibilidade.
3. Em `prefers-reduced-motion`, desligar o loop automatico e exibir fallback estatico, empilhado ou com scroll manual.

## 4. Bloco de citacao impactante em secao escura

## Objetivo

Reproduzir o momento de pausa editorial do video: uma secao mais dramatica, com imagem e texto grandes, para reforcar marca e confianca.

### Estrutura obrigatoria

1. Fundo escuro local, sem transformar o resto da landing inteira em dark mode.
2. Layout assimetrico em duas colunas no desktop.
3. Imagem narrativa de um profissional ou momento de cuidado.
4. Citacao dominante com fonte display ou serif de maior impacto.
5. Texto de apoio curto, sem virar bloco longo.

### Exemplo de intencao

Nao apenas cuidamos de pets.
Nos construimos confianca para a vida toda.

### Regras visuais

1. A citacao deve ser o foco principal da secao.
2. A imagem deve equilibrar a composicao, nao competir com a frase.
3. O contraste deve ser alto, mas elegante.
4. Espacamento vertical generoso.

## 5. Social proof horizontal tipo brands

## Objetivo

Criar uma faixa estreita de credibilidade inspirada no bloco "Brands" da referencia.

### Conteudo permitido

1. marcas parceiras reais, se existirem
2. selos de confianca
3. categorias de servico
4. certificacoes
5. nomes placeholder elegantes se o usuario ainda nao tiver logos finais

### Estrutura obrigatoria

1. faixa horizontal separada visualmente das outras secoes
2. itens igualmente respirados
3. leitura limpa mesmo sem logos definitivos

### Regras

1. Nao usar logos aleatorios ou inventados com cara falsa.
2. Se nao houver logos reais, preferir textos curtos elegantes a mock logos ruins.
3. A faixa pode usar marquee suave, desde que nao conflite com a faixa principal anterior.

## 6. FAQ minimalista e contrastado

### Objetivo

Aproximar o FAQ da sensacao "Ask away" da referencia: limpo, fino, editorial e sem cara de acordeao generico pesado.

### Estrutura obrigatoria

1. lista vertical clara
2. linhas divisorias finas
3. pergunta com alta legibilidade
4. resposta com contraste secundario
5. hover discreto

### Regras de UX

1. foco por teclado obrigatorio
2. `aria-expanded`, `aria-controls` e relacao correta entre trigger e conteudo
3. icone de abrir/fechar simples
4. abertura suave, sem bounce exagerado

## 7. CTA final forte

### Objetivo

Fechar a pagina com uma chamada tao forte quanto a abertura.

### Estrutura obrigatoria

1. titulo curto
2. reforco de beneficio
3. CTA principal
4. CTA secundario opcional

### Regra

O CTA final nao pode parecer repeticao mecanica do hero. Ele precisa funcionar como fechamento natural da narrativa.

## Motion obrigatorio desta landing

Minimo obrigatorio:

1. entrada do hero com stagger claro entre eyebrow, titulo, subtitulo e CTA
2. entrada da coluna de imagem ou do floating card
3. marquee principal em movimento continuo
4. reveal de secao para o bloco de citacao
5. motion discreto no social proof horizontal
6. expansao suave do FAQ
7. microinteracao clara nos CTAs principais
8. comportamento visivel do header no scroll

## Mapa de densidade da pagina

O ritmo deve alternar:

1. hero claro e amplo
2. faixa dinamica horizontal
3. bloco escuro dramatico
4. faixa estreita de prova
5. FAQ leve e legivel
6. CTA final limpo

Nao empilhar secoes com a mesma densidade visual seguidas.

## Responsividade obrigatoria

### Desktop

1. Hero obrigatoriamente split.
2. Quote section obrigatoriamente em duas colunas.
3. Marquees com bom respiro lateral.

### Mobile

1. Hero pode virar coluna unica, mas deve preservar hierarquia.
2. Floating card nao pode bloquear o CTA.
3. Marquee deve continuar legivel; se necessario, reduzir densidade ou trocar por scroll horizontal manual.
4. Quote section deve empilhar imagem e texto sem perder impacto.
5. FAQ deve manter area de toque confortavel.

## Regras anti-copia

1. Nao copiar textos da Steno.ai.
2. Nao copiar classes, estrutura HTML ou assets da Steno.ai.
3. Nao reproduzir o mesmo layout pixel a pixel.
4. Copiar apenas a sensacao de hierarquia, espacamento, clima e motion.

## Regras anti-regressao

1. Nao remover a identidade do petshop.
2. Nao transformar a landing em template SaaS generico.
3. Nao inserir secoes extras desnecessarias so para "preencher".
4. Nao usar motion chamativo demais.
5. Nao comprometer legibilidade dos CTAs e textos sobre imagem.

## Checklist de aceite desta spec

Para considerar a landing conforme:

1. a estrutura obrigatoria dos 7 blocos foi respeitada
2. o hero tem imagem protagonista e floating card
3. existe um marquee real e perceptivel
4. existe um bloco de citacao escuro e editorial
5. existe uma faixa de social proof inspirada em brands
6. o FAQ ficou mais minimalista e contrastado
7. o CTA final fecha a narrativa
8. reduced-motion foi respeitado
9. a pagina continua com cara de petshop premium, nao de copia da Steno.ai
