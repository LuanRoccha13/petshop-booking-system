# 05 Page Recipes

## Landing page

## Structure

1. Sticky header
2. Hero de alto impacto
3. Servicos
4. Beneficios
5. Depoimentos
6. CTA final
7. Footer

## Mobile navigation

- Em mobile, usar menu de hamburguer para concentrar links e CTAs que não cabem na navbar.
- Priorizar logo, acessibilidade e toque confortável.
- Não comprimir links/ações horizontalmente a ponto de prejudicar leitura.
- O menu mobile deve incluir as ações relevantes do fluxo atual.

## Hero requirements

- Headline forte em ate 2 linhas
- Subheadline curta com proposta de valor
- CTA principal Quero agendar
- CTA secundaria opcional
- Composicao com fundo em gradiente + shape decorativa

## Auth pages (cadastro e login)

- Layout centralizado com card principal
- Lado visual opcional em desktop, simplificado no mobile
- Erros de validacao em linha
- Link claro entre login e cadastro
- Feedback de submit com estado loading
- Lateral com composição limpa e hierarquia visual clara
- Personagem/foto de pet deve ser protagonista único na lateral (sem sobreposição confusa)
- Em mobile, priorizar formulário e reduzir elementos decorativos da lateral

## Dashboard

- Header com usuario e acao sair
- Grid em duas zonas no desktop:
  - coluna formulario de novo agendamento
  - coluna lista de agendamentos
- No mobile, ordem: formulario antes da lista
- Appointment cards com imagem do pet, metadados e botao de cancelar
- Empty state com visual acolhedor e fallback de imagem consistente com a paleta
- CTAs do dashboard so devem existir quando possuirem acao funcional real
- Evitar botões redundantes ou sem utilidade no estado vazio e no estado com agendamentos

## Profile and pets

- Perfil do usuario com foco em gerenciamento de pets
- Lista de pets como cards ou tiles com foto, raça e observações principais
- Quick-select dos pets cadastrados no formulário de agendamento
- Estados vazios com CTA para cadastrar o primeiro pet

## Services and history

- Aba ou seção para serviços disponíveis com seleção clara
- Aba ou seção para histórico de serviços já solicitados
- Cada item do histórico deve mostrar status e informações essenciais

## Employee dashboard

- Visão operacional da agenda do dia
- Atualização de status do atendimento
- Acesso rápido aos detalhes do pet e observações relevantes

## Admin dashboard

- Configuração de horários de funcionamento
- Configuração do intervalo entre atendimentos
- Gerenciamento de serviços, usuários e permissões
- Bloqueio de horários ou períodos especiais

## Formulario de agendamento

Campos obrigatorios:

- Nome do pet
- Raca
- Data
- Horario
- Upload de imagem

Campos opcionais:

- Observacoes

## Empty states

- Lista vazia deve mostrar texto acolhedor e CTA para criar o primeiro agendamento

## Error pages (404)

- Mensagem objetiva, humana e acolhedora
- Um CTA principal claro para retorno ao fluxo
- Ilustração/elemento visual de apoio sem competir com a mensagem
- Microinterações no botão de retorno
- Animação de entrada leve para evitar tela estática
- Composição central limpa em mobile e desktop
