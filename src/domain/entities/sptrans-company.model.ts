import { z } from "zod/v4";

export const SptransCompanyModel = z.object({
  a: z.number(), // código da área da empresa
  c: z.number(), // código da empresa
  n: z.string(), // nome da empresa
});

export const SptransCompanyAreaModel = z.object({
  a: z.number(), // código da área
  e: z.array(SptransCompanyModel), // empresas da área
});

export const SptransCompanyResponseModel = z.object({
  hr: z.string(), // horário da consulta
  e: z.array(SptransCompanyAreaModel), // lista de áreas com empresas
});

export type SptransCompany = z.infer<typeof SptransCompanyModel>;
export type SptransCompanyArea = z.infer<typeof SptransCompanyAreaModel>;
export type SptransCompanyResponse = z.infer<
  typeof SptransCompanyResponseModel
>;
