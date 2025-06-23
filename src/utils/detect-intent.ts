import { ConversationIntent } from "../domain/enums/conversation.enums";

interface IntentPattern {
  intent: ConversationIntent;
  keywords?: RegExp[];
  regex?: RegExp;
  priority: number;
  fallback?: boolean;
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: ConversationIntent.CONSULTAR_LINHA,
    regex: /^\d{3,5}$/,
    priority: 10,
  },
  {
    intent: ConversationIntent.SALVAR_LOCAL,
    keywords: [
      /casa\b/,
      /\btrabalho\b/,
      /fica na/,
      /moro na/,
      /\u00e9 na/,
      /meu endere\u00e7o/,
    ],
    priority: 9,
  },
  {
    intent: ConversationIntent.ATUALIZAR_LOCAL,
    keywords: [
      /atualizar/,
      /mudei de/,
      /novo endere\u00e7o/,
      /endere\u00e7o atual/,
    ],
    priority: 8,
  },
  {
    intent: ConversationIntent.CONSULTAR_STATUS_METRO,
    keywords: [
      /metr\u00f4/,
      /estac\u00e3o/,
      /linha vermelha/,
      /linha azul/,
      /linha amarela/,
      /linha lil\u00e1s/,
    ],
    priority: 7,
  },
  {
    intent: ConversationIntent.CONSULTAR_STATUS_ONIBUS,
    keywords: [
      /linha\b/,
      /\b\d{3,5}\b/,
      /\b\d{3,5}[A-Z]?\b/,
      /\b\d{3,5}-\d{2}\b/,
      /funcionando/,
      /situa\u00e7\u00e3o/,
      /status/,
      /\b\u00f4nibus\b/,
    ],
    priority: 6,
  },
  {
    intent: ConversationIntent.CONSULTAR_RECLAMACOES,
    keywords: [
      /reclama\u00e7\u00f5es/,
      /coment\u00e1rios/,
      /problemas de usu\u00e1rios/,
      /relatos/,
    ],
    priority: 5,
  },
  {
    intent: ConversationIntent.FAZER_RECLAMACAO,
    keywords: [
      /quero reclamar/,
      /problema/,
      /den\u00fancia/,
      /relatar algo errado/,
      /fazer reclama\u00e7\u00e3o/,
    ],
    priority: 5,
  },
  {
    intent: ConversationIntent.CONSULTAR_SALDO,
    keywords: [/saldo/, /bilhete/, /\b\u00fanico\b/, /\btop\b/, /\bbom\b/],
    priority: 4,
  },
  {
    intent: ConversationIntent.CALCULAR_ROTA,
    keywords: [/rota/, /chegar/, /quanto tempo/, /melhor hora/, /sair/],
    priority: 3,
  },
  {
    intent: ConversationIntent.NENHUMA,
    fallback: true,
    priority: 0,
  },
];

export function detectIntent(
  message: string,
  prevIntent?: ConversationIntent
): ConversationIntent {
  const lower = message.toLowerCase();

  const matches = INTENT_PATTERNS.filter(({ keywords, regex }) => {
    const keywordMatch = keywords?.some((k) => k.test(lower));
    const regexMatch = regex?.test(lower);
    return keywordMatch || regexMatch;
  }).sort((a, b) => b.priority - a.priority);

  if (matches.length > 0) return matches[0].intent;

  const fallback = INTENT_PATTERNS.find((p) => p.fallback);
  return fallback?.intent ?? prevIntent ?? ConversationIntent.NENHUMA;
}
