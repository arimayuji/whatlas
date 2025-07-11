import { z } from 'zod';

const nullableString = z.string().nullable();
const nullableNumber = z.number().nullable();
const GeoJSONSchema = z
  .object({
    type: z.string(),
    coordinates: z.any(),
  })
  .nullable();

const EducacaoPublicaFundMedSchema = z.object({
  eq_bairro: nullableString,
  eq_cep: nullableString,
  eq_classe: nullableString,
  eq_distrit: nullableString,
  eq_enderec: nullableString,
  eq_esfera: nullableString,
  eq_horario: nullableString,
  eq_nome: nullableString,
  eq_rede: nullableString,
  eq_regiao: nullableString,
  eq_subpref: nullableString,
  eq_telefon: nullableString,
  eq_tipo: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EducacaoPublicaInfantilSchema = z.object({
  eq_bairro: nullableString,
  eq_cep: nullableString,
  eq_classe: nullableString,
  eq_distrit: nullableString,
  eq_enderec: nullableString,
  eq_esfera: nullableString,
  eq_horario: nullableString,
  eq_nome: nullableString,
  eq_rede: nullableString,
  eq_regiao: nullableString,
  eq_subpref: nullableString,
  eq_telefon: nullableString,
  eq_tipo: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EducacaoTecnicaPublicaSchema = z.object({
  eq_bairro: nullableString,
  eq_cep: nullableString,
  eq_classe: nullableString,
  eq_distrit: nullableString,
  eq_enderec: nullableString,
  eq_esfera: nullableString,
  eq_horario: nullableString,
  eq_nome: nullableString,
  eq_rede: nullableString,
  eq_regiao: nullableString,
  eq_subpref: nullableString,
  eq_telefon: nullableString,
  eq_tipo: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EsporteClubeSchema = z.object({
  eq_bairro: nullableString,
  eq_cd_esfe: nullableString,
  eq_cd_tipo: nullableNumber,
  eq_cep: nullableString,
  eq_classe: nullableString,
  eq_enderec: nullableString,
  eq_nome: nullableString,
  eq_rede: nullableString,
  eq_tipo: nullableNumber,
  fid: nullableNumber,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EsporteEstadioSchema = z.object({
  eq_bairro: nullableString,
  eq_cd_esfe: nullableString,
  eq_cd_tipo: nullableNumber,
  eq_cep: nullableString,
  eq_classe: nullableString,
  eq_enderec: nullableString,
  eq_nome: nullableString,
  eq_rede: nullableString,
  eq_tipo: nullableNumber,
  fid: nullableNumber,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EsporteOutrosSchema = z.object({
  eq_bairro: nullableString,
  eq_cd_esfe: nullableString,
  eq_cd_tipo: nullableNumber,
  eq_cep: nullableString,
  eq_classe: nullableString,
  eq_enderec: nullableString,
  eq_nome: nullableString,
  eq_rede: nullableString,
  eq_tipo: nullableNumber,
  fid: nullableNumber,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EstacoesMetroSchema = z.object({
  emt_empres: nullableString,
  emt_linha: nullableString,
  emt_nome: nullableString,
  emt_situac: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const EstacoesTremSchema = z.object({
  etr_empres: nullableString,
  etr_linha: nullableString,
  etr_nome: nullableString,
  etr_situac: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
});

const LinhasMetroSchema = z.object({
  geom:GeoJSONSchema,
  gid: z.number(),
  lmt_empres: nullableString,
  lmt_linha: nullableNumber,
  lmt_linom: nullableString,
  lmt_nome: nullableString,
});

const LinhasOnibusSchema = z.object({
  geom:GeoJSONSchema,
  gid: z.number(),
  ln_empresa: nullableString,
  ln_nome: nullableString,
  ln_primeir: nullableString,
  ln_ultima: nullableString,
});

const LinhasTremSchema = z.object({
  geom:GeoJSONSchema,
  gid: z.number(),
  ltr_empres: nullableString,
  ltr_nome: nullableString,
  ltr_numero: nullableNumber,
});

const PontosOnibusSchema = z.object({
  geom:GeoJSONSchema,
  gid: z.number(),
  pt_enderec: nullableString,
  pt_id: nullableNumber,
  pt_nome: nullableString,
});

const PontosShoppingSchema = z.object({
  geom:GeoJSONSchema,
  gid: z.number(),
  sh_abl: nullableNumber,
  sh_admin: nullableString,
  sh_cep: nullableString,
  sh_constru: nullableNumber,
  sh_enderec: nullableString,
  sh_garagem: nullableNumber,
  sh_id: nullableNumber,
  sh_inaugur: nullableString,
  sh_loja: nullableNumber,
  sh_nome: nullableString,
  sh_piso: nullableNumber,
  sh_salacin: nullableNumber,
  sh_site: nullableString,
  sh_telefon: nullableString,
  sh_terreno: nullableNumber,
});

const ShoppingCentersSchema = z.object({
  geom:GeoJSONSchema,
  gid: z.number(),
  sh_abl: nullableNumber,
  sh_admin: nullableString,
  sh_cep: nullableString,
  sh_constru: nullableNumber,
  sh_enderec: nullableString,
  sh_garagem: nullableNumber,
  sh_id: nullableNumber,
  sh_inaugur: nullableString,
  sh_loja: nullableNumber,
  sh_nome: nullableString,
  sh_piso: nullableNumber,
  sh_salacin: nullableNumber,
  sh_site: nullableString,
  sh_telefon: nullableString,
  sh_terreno: nullableNumber,
});

const TerminalOnibusSchema = z.object({
  cd_identif: nullableNumber,
  cd_tipo_te: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
  nm_termina: nullableString,
  nm_tipo_te: nullableString,
  tx_enderec: nullableString,
});

const TerminalOnibusSad69Schema = z.object({
  cd_identif: nullableNumber,
  cd_tipo_te: nullableString,
  geom:GeoJSONSchema,
  gid: z.number(),
  nm_termina: nullableString,
  nm_tipo_te: nullableString,
  tx_enderec: nullableString,
});

const LineStopsSchema = z.object({
  route_short_name: nullableString,
  route_long_name: nullableString,
  stop_name: nullableString,
  stop_lat: nullableNumber,
  stop_lon: nullableNumber,
  stop_sequence: nullableNumber,
  stop_id: nullableString,
  estacao_inicio: nullableString,
  estacao_fim: nullableString
})

export const schemasMap: Record<string, z.ZodSchema<any>> = {
  educacao_publica_fund_med: EducacaoPublicaFundMedSchema,
  educacao_publica_infantil: EducacaoPublicaInfantilSchema,
  educacao_tecnica_publica: EducacaoTecnicaPublicaSchema,
  esporte_clube: EsporteClubeSchema,
  esporte_estadio: EsporteEstadioSchema,
  esporte_outros: EsporteOutrosSchema,
  estacoes_metro: EstacoesMetroSchema,
  estacoes_trem: EstacoesTremSchema,
  linhas_metro: LinhasMetroSchema,
  linhas_onibus: LinhasOnibusSchema,
  linhas_trem: LinhasTremSchema,
  pontos_onibus: PontosOnibusSchema,
  pontos_shopping: PontosShoppingSchema,
  shopping_centers: ShoppingCentersSchema,
  line_stops: LineStopsSchema,
  terminal_onibus: TerminalOnibusSchema,
  terminal_onibus_sad69: TerminalOnibusSad69Schema,
};
