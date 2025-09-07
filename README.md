# Site de Desaparecidos

**Dados de Inscrição:**

- **Nome Completo:** Davi serra de campos
- **Email:** davyserra67@gmail.com
- **Telefone:** (65) 99292-0175

Aplicação React para localização de pessoas desaparecidas com cadastro e busca de informações.

## 🚀 Tecnologias

- React + Vite
- Tailwind CSS
- Docker

## 🔧 Configuração

### Variáveis de Ambiente

Crie `.env` na raiz:

```env
VITE_ABITUS_API_URL=https://abitus-api.geia.vip
```

### Executando com Docker

```bash
# Build
docker build -t projeto-pratico .

# Executar
docker run -p 5173:5173 projeto-pratico

# Se der conflito de nome:
docker rm projeto-pratico
```

### Executando Localmente

```bash
npm install
npm run dev
```

## 🐳 Docker

- **Imagem:** `node:20-alpine`
- **Porta:** 5173
- **Container:** `projeto-pratico`

### Comandos Úteis

```bash
# Ver logs
docker logs projeto-pratico

# Parar
docker stop projeto-pratico

# Remover
docker rm projeto-pratico

# Listar containers
docker ps -a
```
