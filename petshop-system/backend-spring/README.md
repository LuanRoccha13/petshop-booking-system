# PetShop Booking System - Backend Spring Boot

## Pré-requisitos

- Docker e Docker Compose instalados
- Port 8080 e 5432 disponíveis

## Como rodar o projeto

### Opção 1: Docker Compose (Recomendado)

```bash
# Na pasta backend-spring, rode:
docker-compose up -d

# Aguarde alguns segundos para o banco ficar pronto
```

Isso irá:
- Levantar um container PostgreSQL
- Compilar e rodar o backend Spring Boot

### Opção 2: Local (Requer PostgreSQL instalado)

```bash
# Rodar apenas o banco:
docker-compose up -d postgres

# Rodar o backend:
./mvnw spring-boot:run
```

### Opção 3: Apenas banco no Docker

```bash
# Se preferir rodar o backend localmente no IDE:
docker-compose up -d postgres

# Configure no IDE:
# - Database URL: jdbc:postgresql://localhost:5432/petshop
# - Username: petshop
# - Password: petshop
```

---

## Endpoints disponíveis

### Autenticação (Público)
- `POST /api/auth/register` — Registrar novo usuário
- `POST /api/auth/login` — Login e obter JWT token

### Usuário (Requer autenticação)
- `GET /api/user/me` — Obter dados do usuário logado

### Agendamentos (Requer autenticação)
- `POST /api/appointments` — Criar novo agendamento
- `GET /api/appointments` — Listar agendamentos do usuário

### Documentação da API
- `GET /swagger-ui.html` — Swagger UI interativa

---

## Testando a API

### 1. Registrar usuário
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Resultado:
```json
{
  "token": "eyJ...",
  "email": "test@example.com"
}
```

### 3. Criar agendamento (com token)
```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "petName": "Fluffy",
    "breed": "Golden Retriever",
    "date": "2026-07-15",
    "time": "14:30:00",
    "notes": "Banho e tosa",
    "imageUrl": "https://example.com/pet.jpg"
  }'
```

### 4. Listar agendamentos
```bash
curl -X GET http://localhost:8080/api/appointments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Parar os containers

```bash
docker-compose down
```

Para remover volumes (dados do banco):
```bash
docker-compose down -v
```

---

## Troubleshooting

### Porta 5432 já está em uso
```bash
docker-compose down  # Para os containers atuais
docker-compose up -d  # Inicia novamente
```

### Backend não conecta ao banco
- Verifique se o PostgreSQL está rodando: `docker-compose ps`
- Cheque os logs: `docker-compose logs backend`

### Ver logs do backend
```bash
docker-compose logs -f backend
```

### Ver logs do banco
```bash
docker-compose logs -f postgres
```
