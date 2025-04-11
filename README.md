# 📈 Selic Notifier API

Um projeto simples com propósito didático para consultar a **taxa Selic** e enviar notificações por e-mail sempre que houver uma atualização.

Utiliza:
- **Puppeteer** para fazer scraping da Selic no site oficial,
- **Bull** para agendamento e gerenciamento de jobs,
- **NodeMailer** para envio de e-mails,
- **Docker** para facilitar o ambiente de execução.

---

## 🚀 O que essa API faz?

- Acessa o site oficial do Banco Central (ou outro configurado) para buscar a **taxa Selic** atualizada.
- Caso a taxa Selic mude, um e-mail é disparado automaticamente com o novo valor.
- O job de verificação roda periodicamente em segundo plano utilizando Bull e Redis.

---

## 🛠️ Como rodar o projeto com Docker

> **Pré-requisitos**:  
> Ter o Docker e Docker Compose instalados em sua máquina.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/selic-notifier-api.git
cd selic-notifier-api
```


### 2. Crie o arquivo .env
Use o exemplo abaixo para criar o seu .env:

```bash
PORT=3000
REDIS_HOST= 'localhost'
MAIL_USER=
MAIL_PASS=
```

> ⚠️ Como gerar uma senha de app (para Gmail):
- Acesse: https://myaccount.google.com/apppasswords
- Selecione "Email" como app e "Outro (nome personalizado)" para dar um nome como Selic Notifier.
- Copie a senha gerada e cole no .env como EMAIL_PASS.

### 3. Suba os containers com Docker Compose

```bash
docker-compose up --build
```
O serviço estará disponível em:
📍 http://localhost:3000

### 📬 Exemplo de e-mail enviado
Quando a taxa Selic muda, o sistema envia um e-mail como este:

Assunto: 🚨 Nova taxa Selic disponível!

Corpo: A nova taxa Selic é 13.75%

### 📚 Tecnologias utilizadas

Node.js
TypeScript
Puppeteer
Bull
NodeMailer
Docker
Redis


