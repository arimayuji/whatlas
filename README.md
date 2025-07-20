# Whatlas 🚏

**Assistente Inteligente de Mobilidade Urbana via WhatsApp**

Whatlas é uma plataforma que automatiza o planejamento de deslocamentos urbanos nas grandes cidades brasileiras. Por meio de uma interface 100% no WhatsApp, usuários informam seu destino e horário desejado de chegada, e o Whatlas retorna o melhor horário de saída com base em dados de trânsito, transporte público, clima e eventos imprevistos.

---

## 📌 Principais Funcionalidades

- Planejamento de rota com base no trânsito e transporte público em tempo real  
- Integração com Google Directions API, SPTrans, OpenWeather e Google Calendar  
- Sugestão de horário ideal de saída para compromissos  
- Agendamento de notificações automáticas para próximos deslocamentos  
- Operação direta via WhatsApp Business (sem necessidade de app)

---

## 🧱 Arquitetura Técnica

- **Frontend**: WhatsApp Business API (via 360Dialog ou Twilio)
- **Orquestração de Fluxos**: [n8n](https://n8n.io)
- **Backend**: Serverless (Node.js + Fastify) com Clean Architecture no Google Cloud Run
- **Módulos Auxiliares**: Cloud Functions em Python (ex: scraping da CPTM)
- **Banco de Dados**: Google Firestore
- **Infraestrutura**: Pub/Sub + Cloud Scheduler (para notificações e jobs)

---

## 🧪 Tecnologias Utilizadas

- Node.js, TypeScript, Fastify  
- Google Cloud Platform (Cloud Run, Firestore, Pub/Sub, Functions)  
- Python (scraping e automações)  
- WhatsApp Business API  
- SPTrans API, Google Directions API, OpenWeather API  
- CI/CD com GitHub Actions

---

## 💼 Modelo de Negócio

- **SaaS B2C**: Assinatura mensal para usuários individuais (com plano Pro)
- **SaaS B2B**: Soluções para empresas e RHs monitorarem pontualidade e deslocamento de equipes

---

## 📈 Roadmap

- [x] MVP funcional com integração WhatsApp + API Directions  
- [x] Integração com Google Calendar  
- [x] Monitoramento de linhas SPTrans/CPTM  
- [ ] Classificação inteligente de compromissos por prioridade  
- [ ] Dashboard B2B para empresas

---

## 🤝 Contribuindo

1. Fork este repositório  
2. Crie uma branch com sua feature (`git checkout -b feature/nome`)  
3. Commit suas alterações (`git commit -m 'feat: minha contribuição'`)  
4. Faça push da branch (`git push origin feature/nome`)  
5. Abra um Pull Request

---

## 🧑‍💻 Equipe

- **Yuji Arima** — Desenvolvedor Full Stack, Idealizador  

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

