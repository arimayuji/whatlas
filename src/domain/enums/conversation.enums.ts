export enum ConversationIntent {
  SALVAR_LOCAL = "salvar_local",
  ATUALIZAR_LOCAL = "atualizar_local",
  CONSULTAR_LINHA = "consultar_linha",
  CONSULTAR_STATUS_METRO = "consultar_status_metro",
  CONSULTAR_STATUS_ONIBUS = "consultar_status_onibus",
  CONSULTAR_RECLAMACOES = "consultar_reclamacoes",
  FAZER_RECLAMACAO = "fazer_reclamacao",
  CALCULAR_ROTA = "calcular_rota",
  AGENDAR_SAIDA = "agendar_saida",
  CONSULTAR_SALDO = "consultar_saldo",
  NENHUMA = "nenhuma",
}

export enum ConversationStep {
  AGUARDANDO_DESTINO = "aguardando_destino",
  CONFIRMAR_LOCAL = "confirmar_local",
  AGUARDANDO_OPCAO_LINHA = "aguardando_opcao_linha",
  AGUARDANDO_GEOCODIFICACAO = "aguardando_geocodificacao",
  AGUARDANDO_HORARIO = "aguardando_horario",
  FINALIZADO = "finalizado",
}
