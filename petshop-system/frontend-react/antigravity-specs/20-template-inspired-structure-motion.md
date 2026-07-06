# 20 - Template Inspired Structure and Motion (Hard Mode)

## Objetivo

Usar o template `www.steno.ai` como referencia de estrutura e ritmo de animacao, com mudanca perceptivel e mensuravel.

Esta rodada nao aceita "ajuste cosmetico". O resultado deve mostrar evolucao clara de hierarquia, storytelling e motion.

## Resultado minimo obrigatorio

1. Landing, Login, Cadastro, Dashboard e 404 devem apresentar mudanca estrutural visivel.
2. Cada pagina deve ter pelo menos 1 bloco visual novo ou reorganizado (nao apenas troca de cor/texto).
3. Animacao deve existir como comportamento de interface, nao apenas transicao de hover.
4. O conjunto final deve parecer uma nova rodada real de design, nao patch pequeno.

## Heranca obrigatoria do template (sem copia literal)

1. Hero com impacto imediato e mensagem curta.
2. Ritmo vertical de leitura com secoes amplas.
3. Alternancia de densidade: bloco narrativo, bloco informativo, bloco social.
4. Prova de credibilidade proxima do topo.
5. CTA principal forte no inicio e CTA de fechamento no fim.
6. Motion por secao para conduzir leitura.

## Estrutura obrigatoria por pagina

### Landing

1. Sequencia obrigatoria: hero -> prova social -> beneficios -> processo -> depoimentos -> FAQ -> CTA final.
2. Cada secao deve ter intencao unica e evitar repeticao de composicao.
3. Pelo menos 3 secoes devem alternar entre foco em texto e foco em imagem.

### Login e Cadastro

1. Layout em duas colunas no desktop (visual + formulario).
2. Coluna visual com narrativa de confianca e elemento principal (imagem/arte).
3. Formulario com hierarquia limpa, sem ruido.

### Dashboard

1. Topo com contexto e acao imediata.
2. Separacao clara entre criar agendamento, lista e estados vazios.
3. Empty state com composicao intencional e CTA funcional.

### 404

1. Tratar como micro landing: arte + mensagem curta + CTA forte.
2. Nao aceitar tela 404 estatica com apenas texto e botao.

## Motion obrigatorio (criterios minimos)

1. Landing: minimo 5 momentos de motion (reveal de secao, stagger de cards/listas, entrada de hero, feedback de CTA, menu mobile).
2. Login/Cadastro: minimo 3 momentos de motion (entrada da lateral, entrada do formulario, microinteracao em CTA).
3. Dashboard: minimo 4 momentos de motion (entrada de topo, cards/lista, empty state, feedback de acao).
4. 404: minimo 3 momentos de motion (entrada da cena, destaque visual discreto, CTA com hover+press).
5. Em `prefers-reduced-motion`, substituir translate/scale por fade curto.

## Linguagem visual obrigatoria

1. Manter identidade do petshop (paleta e tokens existentes).
2. Elevar contraste tipografico entre titulo, subtitulo e corpo.
3. Usar espacamento vertical generoso para ritmo editorial.
4. Usar imagens com papel narrativo real (nao decorativo aleatorio).

## Regras anti-regressao (nao negociaveis)

1. Proibido entregar somente ajuste de cor, borda, sombra e microspacing.
2. Proibido manter estrutura quase igual em 3 ou mais paginas principais.
3. Proibido remover motion por facilidade de implementacao.
4. Proibido copiar layout, texto ou assets do template original.

## Gate de aceite desta rodada

A rodada so e aceita se TODOS os itens abaixo forem verdadeiros:

1. Mudanca estrutural visivel nas 5 paginas-alvo.
2. Minimos de motion por pagina atendidos.
3. Navegacao e responsividade estaveis em mobile e desktop.
4. Sem violacao das regras de acessibilidade do arquivo 07.
5. Sem regressao de upload de imagem (continuar file upload + URL, sem Base64).

## Evidencia obrigatoria de implementacao

1. Para cada pagina-alvo, listar quais secoes foram reorganizadas (antes/depois em linguagem objetiva).
2. Para cada pagina-alvo, listar as animacoes aplicadas com nome da classe, seletor ou bloco de codigo associado.
3. Informar os arquivos alterados por pagina (TSX/CSS), evitando resumo generico.
4. Se uma pagina tiver mudanca apenas de estilo fino, ela conta como NAO CONFORME.
