# 11 Layout Error Fixes

Este arquivo registra correcoes pontuais de layout detectadas em revisoes visuais.
Cada item aqui e obrigatorio para novas iteracoes do antigravity.

## Fix 01 — Landing testimonials sem card orfao

### Problema observado

Na seção de depoimentos da landing, os cards aparecem em desktop como 3 na primeira linha e 1 na segunda.
Isso cria efeito de card órfão, reduz equilíbrio visual e passa sensação de grid quebrado.

### Objetivo

Reorganizar a grade de depoimentos para manter simetria e ritmo visual, evitando linhas com apenas 1 card em desktop sempre que possível.

### Especificação obrigatória

1. Desktop deve usar grade que evite card órfão quando houver 4 depoimentos.
2. Preferência para layout de 2 colunas no desktop para 4 itens (2x2).
3. Em telas grandes, usar 2 ou 4 colunas apenas se a distribuição final não gerar última linha com 1 card.
4. Em tablet, usar 2 colunas.
5. Em mobile, usar 1 coluna.
6. Todos os cards devem manter mesma altura visual mínima por linha.
7. Espaçamento horizontal e vertical da grade deve ser consistente.
8. Não alterar o estilo visual dos cards além do necessário para corrigir a composição.

### Regra adaptativa para quantidade variável de depoimentos

1. Se total de cards for par, usar distribuição uniforme por linha.
2. Se total de cards for ímpar e maior que 3, centralizar a última linha ou ajustar colunas para reduzir sensação de quebra.
3. Nunca deixar uma última linha desalinhada visualmente sem estratégia de compensação.

### Critério de aceite

1. Em desktop com 4 depoimentos: 2 cards na primeira linha e 2 na segunda.
2. Não existe card isolado visualmente na última linha.
3. A seção mantém leitura limpa, hierarquia clara e ritmo visual equilibrado.

## Fix 02 — Troca do logo da landing pelo asset oficial

### Problema observado

A landing ainda utiliza logo temporário/placeholder no header.
Existe um logo oficial adicionado na pasta de imagens da landing que deve ser utilizado para reforçar identidade visual.

### Objetivo

Substituir o logo atual pelo arquivo oficial `dog-sleeping-svgrepo-com.svg`, mantendo alinhamento, legibilidade e responsividade do header.

### Especificação obrigatória

1. Usar o asset `src/assets/images/landing/dog-sleeping-svgrepo-com.svg` como logo principal da landing.
2. Remover o ícone/emoji temporário utilizado como marca no header.
3. Preservar o texto da marca ao lado do logo, com boa hierarquia visual.
4. Garantir que o logo fique nítido em desktop e mobile, sem distorção.
5. Definir tamanho responsivo do logo para não quebrar a altura do navbar.
6. Respeitar espaçamento e alinhamento do header existente.
7. Não alterar a direção visual global da landing, apenas a identidade de marca no header.

### Acessibilidade

1. O logo deve possuir `alt` descritivo.
2. O link da marca no header deve manter rótulo acessível para navegação por leitor de tela.

### Critério de aceite

1. O arquivo `dog-sleeping-svgrepo-com.svg` aparece como logo no header da landing.
2. O header continua alinhado e responsivo em mobile, tablet e desktop.
3. O logo não fica esticado, pixelado ou desalinhado com o nome da marca.

## Fix 03 — Ajuste da lateral de login/cadastro com foco no cachorro PNG

### Problema observado

Nas telas de login e cadastro, a lateral visual está poluída por sobreposição de elementos.
Existe um SVG de cachorro em segundo plano que compete com o conteúdo e reduz a qualidade da composição.

### Objetivo

Remover o SVG de cachorro da lateral e usar o cachorro em PNG como elemento principal da composição, com posicionamento mais elegante e convidativo.

### Especificação obrigatória

1. Remover o SVG de cachorro atualmente usado na lateral das telas de login/cadastro.
2. Usar o cachorro PNG presente na pasta `src/assets/images/auth` como protagonista visual da lateral.
3. Reposicionar o PNG para o centro inferior da lateral, com recorte limpo e sem sobrepor texto crítico.
4. Preservar cards/informações de confiança na lateral, mas com hierarquia clara acima do personagem.
5. Evitar excesso de elementos competindo no mesmo plano visual.
6. Ajustar escala do PNG por breakpoint:
	- desktop: destaque visual alto
	- tablet: destaque médio
	- mobile: reduzir ou ocultar lateral conforme necessidade de foco no formulário
7. Garantir que a lateral continue alinhada com a paleta e o tom premium do produto.

### Interatividade e animações

1. Aplicar animações suaves de entrada para os blocos da lateral (fade + translateY curto).
2. Aplicar micro-movimento discreto no PNG do cachorro (float sutil, sem exagero).
3. Adicionar transições suaves em cards e selos de confiança da lateral.
4. Evitar animações contínuas agressivas que distraiam o usuário do login/cadastro.

### Acessibilidade

1. O PNG deve possuir `alt` descritivo.
2. Conteúdo textual da lateral deve manter contraste adequado.
3. A lateral não pode comprometer a navegação por teclado no formulário.

### Critério de aceite

1. O SVG de cachorro não aparece mais na lateral de login/cadastro.
2. O cachorro PNG é o elemento visual principal e está bem posicionado.
3. A tela fica mais limpa, convidativa e visualmente equilibrada.
4. As animações estão fluidas e discretas.
5. O foco funcional no formulário é mantido em todos os breakpoints.

## Fix 04 — Dashboard mais vivo com fallback rotativo e remoção de botões sem utilidade

### Problema observado

1. No estado de lista vazia do dashboard, o visual pode ficar estático e pouco convidativo.
2. O bloco de empty state possui botão "Criar primeiro agendamento" sem utilidade real no fluxo atual.
3. No estado com agendamento cadastrado, existe botão no canto superior direito sem ação útil.

### Objetivo

Deixar o dashboard mais vivo e atrativo, trocando o SVG principal de fallback por imagens da pasta de dashboard com rotação por recarga, mantendo o calendário SVG e eliminando CTAs sem função.

### Especificação obrigatória

1. Manter o ícone SVG de calendário no empty state.
2. Substituir o SVG principal de pet no empty state por fallback de imagens da pasta `src/assets/images/dashboard`.
3. Implementar rotação de fallback a cada recarga da página (usar uma imagem diferente por load, quando possível).
4. Garantir que o fallback rotativo respeite o estilo visual do dashboard (sem distorção e com boa integração).
5. O botão "Criar primeiro agendamento" deve ser:
	- removido, se não houver ação clara
	- ou receber função real (ex.: scroll + foco no formulário de novo agendamento)
6. O botão no canto superior direito da lista (estado com agendamento) deve ser:
	- removido, se não houver utilidade
	- ou receber utilidade concreta e coerente com o fluxo
7. Nunca manter botão visível sem ação funcional validada.

### Regras de UX para CTAs do dashboard

1. CTA só aparece quando resolve uma tarefa real do usuário.
2. Se houver CTA para novo agendamento, ele deve levar diretamente ao formulário (scroll/foco).
3. Evitar redundância entre CTA secundário e ação primária já existente no formulário.

### Interatividade e animações

1. Aplicar entrada suave no bloco de empty state (fade + translateY curto).
2. Aplicar transição sutil na troca visual do fallback entre recargas (sem efeito agressivo).
3. Manter animações discretas para não competir com o conteúdo do formulário/lista.

### Acessibilidade

1. Imagem de fallback deve ter `alt` descritivo.
2. CTAs funcionais devem ser navegáveis por teclado.
3. Se CTA for removido, não pode sobrar elemento interativo fantasma no DOM.

### Critério de aceite

1. Empty state mantém calendário SVG e usa imagem de pet da pasta dashboard como destaque.
2. Ao recarregar a página, o fallback visual pode alternar entre imagens disponíveis.
3. O botão "Criar primeiro agendamento" não fica mais sem função.
4. O botão do canto superior direito não fica mais sem função.
5. Dashboard fica mais vivo e convidativo, sem ruído visual funcional.

## Fix 05 — Página 404 mais viva, interativa e com animações

### Problema observado

A página 404 está funcional, porém visualmente estática. Falta energia visual, microinterações e elementos que reforcem acolhimento e direção de retorno.

### Objetivo

Transformar a página 404 em uma experiência mais viva e convidativa, mantendo clareza da mensagem e foco no CTA principal.

### Especificação obrigatória

1. Manter mensagem clara de erro e CTA principal de retorno.
2. Adicionar elementos visuais de apoio (ex.: ilustração pet, shapes suaves, detalhes da marca) sem poluir a tela.
3. Reforçar hierarquia visual com melhor contraste entre título, descrição e ação.
4. Garantir composição equilibrada em desktop, tablet e mobile.
5. Preservar consistência com a identidade do restante do produto.

### Interatividade e animações

1. Entrada da página com reveal suave (fade + translateY curto).
2. Microinteração no CTA principal (hover elegante + press sutil).
3. Elemento visual principal com animação discreta (float leve ou breathing motion).
4. Pequenos acentos visuais podem usar stagger curto para dar sensação de vida.
5. Não usar animações agressivas ou distrações contínuas.

### Acessibilidade

1. CTA principal com foco visível e navegação por teclado.
2. Contraste de textos e botão deve atender leitura confortável.
3. Em `prefers-reduced-motion`, reduzir animações para fade curto sem movimento amplo.

### Critério de aceite

1. Página 404 transmite visual mais vivo e acolhedor.
2. A interação do CTA está mais clara e convidativa.
3. As animações são fluidas e discretas.
4. Layout permanece limpo, legível e responsivo em todos os breakpoints.

## Fix 06 — Consistência de marca + responsividade da landing + limpeza funcional no dashboard

### Problema observado

1. A nova logo não foi aplicada em todas as telas onde a marca PetShop aparece.
2. A responsividade da landing ainda está disfuncional em viewport mobile.
3. No dashboard, o botão "+ Novo agendamento" segue sem utilidade percebida.
4. No empty state do dashboard, há excesso visual com dois elementos de pet; o usuário quer remover o SVG superior de pet e tornar o outro principal.

### Objetivo

Corrigir consistência de marca em todas as páginas, estabilizar a experiência mobile da landing e resolver ruído funcional/visual do dashboard.

### Especificação obrigatória

#### 1) Logo global consistente

1. Aplicar a logo oficial da marca em todas as páginas que exibem a identidade PetShop no header/topbar.
2. Usar o mesmo asset, dimensão base e proporção visual da marca em todas as telas relevantes.
3. Evitar variações de implementação (emoji em uma tela, SVG em outra, etc.).
4. Garantir alinhamento e contraste da marca em desktop e mobile.

#### 2) Landing mobile responsiva

1. Corrigir navbar em mobile para não comprimir links e CTAs lado a lado sem respiro.
2. Em mobile, usar menu simplificado (links compactados ou ocultos) priorizando legibilidade e toque.
3. Garantir que hero, CTAs, estatísticas e cards não estourem largura da tela.
4. Remover gaps/colunas vazias laterais e evitar conteúdo esmagado no eixo horizontal.
5. Revisar espaçamento vertical para manter ritmo visual sem blocos apertados.

#### 3) Botão "+ Novo agendamento" no dashboard

1. O botão só deve permanecer se tiver utilidade concreta e verificável.
2. Se mantido, deve executar scroll para o formulário e focar o primeiro campo (`#dash-petName`).
3. Se essa ação já estiver coberta por outro CTA principal e gerar redundância, remover o botão.
4. Não manter CTA sem percepção clara de valor para o usuário.

#### 4) Empty state do dashboard — hierarquia visual

1. Remover o SVG superior de pet no empty state, mantendo o calendário e reduzindo ruído visual.
2. Tornar o outro pet (fallback principal) o elemento de destaque.
3. O elemento principal deve ter escala e posicionamento que reforcem hierarquia sem poluir.
4. Preservar composição limpa e acolhedora, com foco na mensagem e ação principal.

### Interatividade e animações

1. Landing mobile: transições suaves em menu/CTA sem impactar performance.
2. Dashboard empty state: animação discreta apenas no elemento principal de pet.
3. Evitar múltiplos elementos animados competindo na mesma área.

### Acessibilidade

1. Logo com `alt` descritivo quando renderizada como imagem.
2. Navbar mobile com toque confortável e navegação por teclado.
3. CTAs funcionais com foco visível e área de clique adequada.

### Critério de aceite

1. Logo oficial aparece de forma consistente em todas as telas de marca.
2. Landing funciona corretamente em mobile (sem compressão/overflow/disposição quebrada).
3. O botão "+ Novo agendamento" deixa de ser redundante ou passa a ter utilidade clara.
4. Empty state do dashboard remove o pet superior e mantém apenas o destaque principal desejado.

## Fix 07 — Navbar mobile com menu de hamburguer

### Problema observado

Em telas menores, a navbar não tem espaço suficiente para exibir logo, links e CTAs sem compressão visual ou perda de legibilidade.

### Objetivo

Adicionar um menu de hamburguer na navbar mobile para concentrar funcionalidades que não cabem na largura da tela, mantendo a experiência limpa e acessível.

### Especificação obrigatória

1. Em mobile, substituir os links/ações horizontais da navbar por um botão de hamburguer quando o espaço não comportar a navegação completa.
2. O botão deve abrir um menu/overlay acessível com as ações e links principais da navegação.
3. O menu mobile deve conter, no mínimo, os itens relevantes para o fluxo atual do site.
4. Não comprimir links e CTAs a ponto de quebrar a leitura ou o toque.
5. O logo da marca deve continuar visível e proporcional no topo.
6. Em tablet, avaliar se o hambúrguer ainda é necessário conforme a largura; se houver risco de compressão, usar o menu compactado.
7. Em desktop, manter a navegação horizontal atual quando houver espaço suficiente.

### Interatividade e animações

1. Abrir/fechar o menu com transição suave (fade + slide curto).
2. O botão hamburguer deve ter estado de foco e feedback visual claros.
3. O menu não deve bloquear o conteúdo sem necessidade ou introduzir animações agressivas.

### Acessibilidade

1. O botão hamburguer deve ter `aria-label` descritivo.
2. O menu deve ser navegável por teclado.
3. O fechamento do menu deve ser possível por ação clara (botão fechar, ESC quando aplicável, ou toque fora se suportado).

### Critério de aceite

1. Em mobile, a navbar não comprime os links e CTAs horizontalmente.
2. O menu hamburguer dá acesso às funcionalidades ocultas de forma clara.
3. A navegação permanece legível, acessível e coerente com a identidade visual.


