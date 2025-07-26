import { SupabaseClient } from "@supabase/supabase-js";
import { ComplaintVoteRepository } from "../../domain/repositories/ComplaintVoteRepository";
import { AppError } from "../../domain/errors/app-error";
import { logger } from "../logger";
import { ComplaintVote, ComplaintVoteModel } from "../../domain/entities/complaint-vote.model";
import { DeleteResult } from "../../domain/repositories/dtos/DeleteResult";

export class ComplaintVoteReppositorySupabase implements ComplaintVoteRepository{
  constructor(private readonly client: SupabaseClient) { }

  async registerVote(userId: string, complaintId: string, voteType: "up" | "down"): Promise<ComplaintVote> {
    const { data, error } = await this.client.from('complaint_votes').insert({ user_id: userId, complaint_id: complaintId, vote_type: voteType })

    if (error) {
      logger.error(`Error registering vote: ${error.message}`)
      throw new AppError("Error registering vote", 500)
    }

    if (!data) {
      logger.error("Error registering vote: no data returned")
      throw new AppError("Error registering vote: no data returned", 500)
    }

    const parsedData = ComplaintVoteModel.safeParse(data);

    if (!parsedData.success) {
      logger.error(`Error registering vote: ${parsedData.error.message}`)
      throw parsedData.error
    }

    logger.info(`Vote registered successfully: ${parsedData.data.id}`)

    return parsedData.data
  }

  async hasVoted(userId: string, complaintId: string): Promise<boolean> {
    const { data, error } = await this.client.from('complaint_votes').select('*').eq('user_id', userId).eq('complaint_id', complaintId).single()
    
    if (error) {
      logger.error(`Error checking if user has voted: ${error.message}`)
      throw new AppError("Error checking if user has voted", 500)
    }

    if (!data) {
      logger.error("Error checking if user has voted: no data returned")
      throw new AppError("Error checking if user has voted: no data returned", 500)
    }

    const parsed = ComplaintVoteModel.safeParse(data);

    if (!parsed.success) {
      logger.error(`Error checking if user has voted: ${parsed.error.message}`)
      throw new AppError(parsed.error.message, 500)
    }

    logger.info(`Checked if user has voted: ${data.length > 0}`)

    return parsed.data !== null
  }

  async getVote(userId: string, complaintId: string): Promise<"up" | "down" | null> {
    const {data, error } = await this.client.from('complaint_votes').select('*').eq('user_id', userId).eq('complaint_id', complaintId).limit(1)
    
    if(error) {
      logger.error(`Error getting vote: ${error.message}`)
      throw new AppError("Error getting vote", 500)
    }

    if (!data) {
      logger.error("Error getting vote: no data returned")
      throw new AppError("Error getting vote: no data returned", 500)
    }

    const parsedData = ComplaintVoteModel.safeParse(data[0]);

    if (!parsedData.success) {
      logger.error(`Error getting vote: ${parsedData.error.message}`)
      throw parsedData.error
    }

    logger.info(`Got vote: ${parsedData.data.id }`)

    return parsedData.data.vote_type
  }

  async removeVote(userId: string, complaintId: string): Promise<DeleteResult> {
    const { data, error } = await this.client
      .from("complaint_votes")
      .delete()
      .eq("user_id", userId)
      .eq("complaint_id", complaintId)
      .select()
      .single();

    if (error) {
      throw new AppError(`Erro ao remover voto: ${error.message}`, 500);
    }

    if (!data) {
      throw new AppError("Nenhum dado retornado ao tentar remover voto", 500);
    }

    const parsed = ComplaintVoteModel.safeParse(data);
    if (!parsed.success) {
      throw new AppError("Formato inválido do voto removido", 500);
    }

    return {
      success: true,
      message: "Voto removido com sucesso",
      deletedId: parsed.data.id,
    };
  }
}