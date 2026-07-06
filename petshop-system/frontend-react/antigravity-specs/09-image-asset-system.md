# 09 Image Asset System

## Objetivo

Definir como as imagens JPG e PNG devem ser usadas no produto sem quebrar o estilo atual, mantendo consistencia visual, performance e responsividade.

## Regra principal

Nao redesenhar a identidade atual. O papel das imagens e reforcar o design existente, nao substituir layout, paleta ou hierarquia.

## Estrutura de arquivos obrigatoria

- src/assets/images/landing
- src/assets/images/shared
- src/assets/images/auth
- src/assets/images/dashboard
- src/assets/images/illustrations
- src/assets/images/mais-imagens-pet-shop

## Regra para a pasta mais-imagens-pet-shop

Use `src/assets/images/mais-imagens-pet-shop` como pool adicional de midias para novas variacoes visuais da landing, auth, dashboard e 404.

Regras obrigatorias:

1. Priorizar arquivos com boa resolucao e leitura limpa para UI.
2. Evitar nomes genericos no import final. Crie aliases semanticos no codigo quando necessario.
3. Se houver versao JPG e PNG da mesma imagem, escolher a versao que melhor preserva composicao e performance para cada contexto.
4. O arquivo MP4 da pasta so pode ser usado como apoio curto e opcional em secao hero ou 404, com fallback estatico em imagem.
5. Nunca usar video como unico conteudo sem fallback.
6. Manter coerencia com a linguagem premium do produto, sem transformar a tela em galeria.

## Regra para a pasta illustrations

Use `src/assets/images/illustrations` para artes maiores, mais narrativas ou de apoio contextual.

Exemplos adequados para `illustrations`:

- empty states do dashboard
- arte lateral de login e cadastro
- ilustração de sucesso ou confirmação
- cenas decorativas maiores para apoiar uma seção
- composição visual para telas com pouco conteúdo

Exemplos inadequados para `illustrations`:

- ícone pequeno reutilizável
- padrão sutil repetido em várias telas
- badge vetorial modular
- shape decorativo simples de uso sistêmico

## Diretrizes especificas para illustrations

1. As ilustrações podem ser geradas pelo antigravity, desde que respeitem o estilo atual do produto.
2. Devem apoiar a interface, nunca competir com o conteúdo principal.
3. Em telas funcionais, usar ilustração com moderação e boa hierarquia.
4. O estilo deve continuar premium, acolhedor, leve e moderno.
5. Evitar excesso de detalhe que prejudique leitura ou responsividade.
6. Priorizar composições que se adaptem bem ao desktop e simplifiquem no mobile.
7. Manter coerência cromática com os tokens já definidos.

## Recomendação de uso por contexto

1. Landing: ilustração apenas se complementar a composição principal sem roubar o foco da hero.
2. Login/Cadastro: muito útil como painel visual lateral em desktop.
3. Dashboard: preferir uso em empty state, áreas introdutórias ou apoio discreto.

## Regra específica para SVGs de fallback no dashboard

1. Quando o cliente nao enviar foto do animal, o dashboard pode exibir uma ilustração SVG de pet como fallback visual.
2. Essas ilustrações devem ser acolhedoras, premium e coerentes com a identidade visual atual.
3. A coleira do animal deve funcionar como acento cromático principal da ilustração.
4. As cores da coleira devem vir prioritariamente da paleta da marca:
   - #ff6b35
   - #e85a28
   - #c84b20
   - #ffe9df
5. O corpo do animal deve permanecer em tons neutros, suaves ou dessaturados para manter contraste e elegância.
6. O fundo do card e os demais detalhes nao devem competir visualmente com a coleira.
7. Entre diferentes SVGs de fallback, pode haver variação discreta na cor da coleira para evitar repetição artificial.
8. A ilustração deve continuar legível em tamanhos menores dentro dos cards de agendamento.

## Tipos de arquivo

- JPG: fotos reais para hero, servicos e depoimentos da landing.
- PNG: elementos com transparencia, stickers, badges e ilustrações utilitarias para landing e telas internas.
- SVG: assets vetoriais reutilizaveis para a pasta shared, incluindo shapes, padrões, linhas decorativas, selos visuais e acentos graficos.

## Regra para a pasta shared

Use `src/assets/images/shared` para elementos visuais reutilizaveis entre duas ou mais paginas.

Exemplos adequados para `shared`:

- blobs organicos
- paw motifs
- linhas de destaque
- padrões sutis
- trust badges
- selos decorativos da marca
- acentos vetoriais para header, hero e secoes internas

Exemplos inadequados para `shared`:

- foto exclusiva da hero da landing
- imagem lateral exclusiva do login
- ilustração unica de empty state do dashboard

## Diretrizes especificas para SVG em shared

1. Os SVGs devem parecer autorais e consistentes com a identidade do produto.
2. Priorizar formas simples, premium e acolhedoras, sem cara de biblioteca generica.
3. Usar estritamente a paleta principal do projeto:
   - #ff6b35
   - #e85a28
   - #c84b20
   - #ffe9df
   - #fff4e8
   - #1f2421
   - #5f6b64
4. Preferir preenchimentos suaves, strokes limpos e composições leves.
5. Os SVGs devem funcionar bem tanto na landing quanto em login, cadastro e dashboard.
6. Nao usar excesso de detalhe visual em assets pequenos.
7. Quando possivel, preparar os vetores para recoloração futura sem reestruturar o arquivo.

## Convencao de nomes

- Formato: secao-funcao-variacao.ext
- Exemplo: hero-pet-banho-01.jpg
- Exemplo: badge-trust-01.png
- Exemplo: auth-side-pet-01.png

## Diretrizes de composicao

1. Hero deve ter uma imagem protagonista com recorte limpo e boa leitura de titulo/cta.
2. Seção de servicos deve usar imagens de apoio com mesma linguagem de cor.
3. Depoimentos podem usar fotos pequenas ou avatares estilizados.
4. Auth e dashboard devem usar imagens de apoio discretas, sem poluir a leitura dos formularios.

## Diretrizes de responsividade

1. Nunca distorcer imagem; sempre manter object-fit apropriado.
2. Definir proporcao por contexto:
   - hero: 4:5 ou 16:10
   - cards: 16:9
   - miniaturas/avatar: 1:1
3. Em mobile, priorizar corte central e reduzir altura visual para evitar scroll excessivo.
4. Garantir que texto e CTA nunca percam contraste por causa da imagem.

## Diretrizes de tratamento visual

1. Aplicar overlays suaves quando necessario para legibilidade.
2. Manter bordas, raios e sombras alinhados aos tokens.
3. Evitar filtros pesados que alterem drasticamente o tom da marca.
4. Usar gradientes e shapes existentes para integrar imagem ao fundo.

## Diretrizes de performance

1. Comprimir assets antes de versionar.
2. Priorizar dimensoes coerentes com uso real (nao subir imagens gigantes).
3. Carregar imagens criticas primeiro (hero e cards acima da dobra).

## Checklist de aceite

1. Imagens reforcam o estilo atual, sem regressao visual.
2. Landing continua consistente com a identidade ja aplicada.
3. Login, cadastro e dashboard ficam conectados visualmente com a landing.
4. Nenhuma quebra de layout em mobile/tablet/desktop.
5. Contraste e legibilidade mantidos em textos sobre imagem.
