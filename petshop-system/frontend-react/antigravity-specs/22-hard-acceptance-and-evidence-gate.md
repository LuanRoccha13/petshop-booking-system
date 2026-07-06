# 22 - Hard Acceptance and Evidence Gate

## Objetivo

Evitar entrega fraca, cosmetica ou sem prova tecnica. Este arquivo define quando a rodada e aprovada ou reprovada.

## Definition of Done (obrigatorio)

Todos os itens abaixo devem ser verdadeiros:

1. Houve mudanca estrutural clara em Landing, Login, Cadastro, Dashboard e 404.
2. Os minimos de motion da spec 20 foram implementados por pagina.
3. Responsividade validada para mobile e desktop em todas as paginas-alvo.
4. Regras de acessibilidade da spec 07 respeitadas.
5. Fluxo de imagem do pet continua em file upload + URL (sem Base64).
6. Uso da pasta `src/assets/images/mais-imagens-pet-shop` foi considerado para variacao visual relevante quando fizer sentido.

## Pacote de evidencias obrigatorio

A entrega deve conter, no minimo:

1. Lista de arquivos alterados (por pagina).
2. Tabela de mudanca estrutural por pagina (o que foi reorganizado de fato).
3. Tabela de motion por pagina (animacao, alvo, gatilho, duracao).
4. Checklist de responsividade (mobile/desktop) com status PASS/FAIL.
5. Checklist de acessibilidade (focus, contraste, reduced-motion) com status PASS/FAIL.

## Rubrica de severidade

Classificacao:

1. PASS: todos os gates cumpridos e sem falhas graves.
2. PASS COM RESSALVAS: pequenas lacunas nao estruturais, sem comprometer objetivo.
3. FAIL: qualquer gate obrigatorio nao cumprido.

## Motivos de reprovacao automatica

1. Mudancas cosmeticas em vez de mudanca estrutural.
2. Ausencia de motion em qualquer pagina-alvo.
3. Entrega sem evidencias objetivas por pagina.
4. Regressao de responsividade em mobile.
5. Reintroducao de Base64 em imagens de pet.

## Politica de correcao

Se resultado for FAIL:

1. Reabrir a rodada com foco apenas nos itens NAO CONFORME.
2. Corrigir primeiro estrutura e motion, depois refinamento visual.
3. Reapresentar pacote de evidencias completo.