# Whatlas

[![Built with Node.js](https://img.shields.io/badge/built%20with-Node.js-339933.svg)](https://nodejs.org/)  
[![Serverless](https://img.shields.io/badge/serverless-✔️-blue.svg)](https://www.serverless.com/)  
[![WhatsApp Business API](https://img.shields.io/badge/WhatsApp–API-green.svg)](https://www.whatsapp.com/business/api)  
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

Whatlas é um assistente inteligente de mobilidade urbana 100% via WhatsApp, projetado para calcular o horário ideal de saída considerando trânsito, transporte público, clima e imprevistos em grandes cidades brasileiras.

---

## 📖 Visão Geral

- **Problema**: Deslocamentos urbanos no Brasil têm alta variabilidade e imprevistos constantes, gerando atrasos, estresse e perda de produtividade.  
- **Solução**: Usuário informa destino e horário de chegada desejado no WhatsApp. Whatlas consulta múltiplas fontes em tempo real e retorna o melhor horário de saída, com margem de segurança personalizável.

---

## ✨ Principais Funcionalidades

- **Cálculo Preditivo de Tempo de Viagem**  
  - Integra APIs de rotas (Google Directions), dados de ônibus (SPTrans), clima (OpenWeather) e agenda (Google Calendar).  
  - Ajuste dinâmico de margem de segurança conforme perfil do usuário (Pro/Enterprise).

- **Notificações Programadas**  
  - Agendamento de lembretes via Pub/Sub e Cloud Scheduler.  
  - Mensagens automáticas no WhatsApp no horário de saída calculado.

- **Status Operacional**  
  - Consulta de disponibilidade de linhas de metrô e CPTM via scrapers em Cloud Functions.  
  - Alertas de interrupções e atrasos em tempo real.

- **Customização de Perfil**  
  - Margem de segurança configurável (rápido, normal, conservador).  
  - Histórico de trajetos e estatísticas de desempenho.

---

## 🏗 Arquitetura Técnica

\`\`\`plaintext
[WhatsApp Business API]
          │
          ▼
     [n8n Orquestração]
       ┌─────────────┐
       │ Conversas   │
       │ e Fluxos    │
       └─────────────┘
          │
          ▼
┌──────────────────────────┐
│ Backend Serverless       │
│ - Node.js + Fastify      │
│ - Clean Architecture     │
│ - Google Cloud Run       │
└──────────────────────────┘
    │      │       │
    │      │       └─► [Cloud Functions (Python)]: scrapers CPTM, SPTrans
    │      │
    │      └─► [Firestore]: usuários, histórico, perfis
    │
    └─► [Google Directions API, OpenWeather, Google Calendar]
          │
          └─► [Pub/Sub & Scheduler]: notificações & tarefas recorrentes
\`\`\`

---

## ⚙️ Tech Stack

| Camada              | Tecnologia / Serviço                                     |
|---------------------|----------------------------------------------------------|
| Mensageria          | WhatsApp Business API (360Dialog / Twilio)               |
| Orquestração        | n8n                                                      |
| Backend             | Node.js, Fastify, Clean Architecture                     |
| Serverless Compute  | Google Cloud Run                                         |
| Funções Auxiliares  | Google Cloud Functions (Python)                          |
| Banco de Dados      | Firestore                                                |
| Agendamento         | Pub/Sub, Cloud Scheduler                                |
| APIs Externas       | Google Directions, OpenWeather, Google Calendar, SPTrans |
| Deploy & CI/CD      | GitHub Actions → Cloud Build → Cloud Run                 |

---

## 🚀 Instalação & Deploy

1. **Clone o repositório**  
   \`\`\`bash
   git clone https://github.com/seu-org/whatlas.git
   cd whatlas
   \`\`\`

2. **Configurar variáveis de ambiente** (em \`.env`)  
   \`\`\`env
   WHATSAPP_API_TOKEN=…
   SPTRANS_API_KEY=…
   GOOGLE_DIRECTIONS_KEY=…
   OPENWEATHER_KEY=…
   FIREBASE_PROJECT_ID=…
   GCLOUD_SERVICE_ACCOUNT_KEY=…
   \`\`\`

3. **Instalar dependências & testar local**  
   \`\`\`bash
   npm ci
   npm run dev        # Inicia Fastify em modo desenvolvimento
   \`\`\`

4. **Deploy no Google Cloud Run**  
   - Configure \`gcloud\` CLI e autentique-se.  
   - Execute:  
     \`\`\`bash
     npm run build
     gcloud run deploy whatlas-backend        --image gcr.io/$GOOGLE_CLOUD_PROJECT/whatlas        --platform managed        --region southamerica-east1        --allow-unauthenticated
     \`\`\`

5. **Configurar Cloud Scheduler & Pub/Sub**  
   - Importar job de agendamento em \`scheduler.yaml\`.  
   - Vincular tópico Pub/Sub a \`notifier\` Cloud Function.

---

## 📱 Como Usar

1. Adicione o número de WhatsApp do Whatlas aos seus contatos.  
2. Envie mensagem no formato:  
   \`\`\`
   /trajeto
   Destino: Av. Paulista, 1000
   Chegar até: 08:30
   Margem: Normal
   \`\`\`
3. Aguarde o cálculo e receba a resposta:
   > “Para chegar às 08:30 na Av. Paulista, 1000, saia às 07:45. Margem de segurança: 10 minutos.”

4. Opcional:  
   - \`/agendar\` para receber lembrete de saída.  
   - \`/historico\` para ver seus últimos 10 trajetos.

---

## 🤝 Contribuição

1. Fork este repositório  
2. Crie uma branch: \`git checkout -b feature/nova-funcionalidade\`  
3. Faça commit das mudanças: \`git commit -m "feat: descrição breve"\`  
4. Abra um Pull Request para \`main\`

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](./LICENSE.md).
