# 16 Permission Matrix

## Objetivo

Definir, de forma inequívoca, o que cada perfil pode ver e fazer no sistema.

Perfis:

- CLIENT
- EMPLOYEE
- ADMIN

## Matriz de permissões (MVP+)

| Capacidade | CLIENT | EMPLOYEE | ADMIN |
|---|---:|---:|---:|
| Ver próprio perfil | ✅ | ✅ | ✅ |
| Editar próprio perfil | ✅ | ✅ | ✅ |
| Cadastrar pet | ✅ | ❌ | ✅ |
| Editar pet do cliente | ✅ (somente próprios) | ✅ (somente leitura + notas operacionais) | ✅ |
| Ver pets de outros usuários | ❌ | ✅ (quando há atendimento) | ✅ |
| Criar agendamento | ✅ | ❌ | ✅ |
| Cancelar agendamento | ✅ (somente próprios) | ✅ (operacional) | ✅ |
| Alterar status do atendimento | ❌ | ✅ | ✅ |
| Ver histórico de serviços | ✅ (somente próprios) | ✅ (escopo operacional) | ✅ |
| Gerenciar catálogo de serviços | ❌ | ❌ | ✅ |
| Configurar horários de funcionamento | ❌ | ❌ | ✅ |
| Configurar intervalo entre slots | ❌ | ❌ | ✅ |
| Bloquear períodos especiais | ❌ | ❌ | ✅ |
| Gerenciar usuários e funcionários | ❌ | ❌ | ✅ |

## Regras críticas

1. CLIENT nunca acessa dados de outro cliente.
2. EMPLOYEE acessa dados de cliente somente no contexto de atendimento.
3. ADMIN pode configurar regras globais de agenda e catálogo.
4. Toda rota sensível precisa validar papel no backend (não só esconder botão no frontend).

## Estratégia de implementação

1. Adicionar campo `role` na entidade de usuário (`CLIENT`, `EMPLOYEE`, `ADMIN`).
2. Incluir o `role` no payload de resposta de autenticação e no contexto de sessão do frontend.
3. Aplicar autorização por rota no backend com regras por papel.
4. Renderizar navegação e telas por papel no frontend.
