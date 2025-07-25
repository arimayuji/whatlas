import { SupabaseClient } from "@supabase/supabase-js";
import { ComplaintRepository, VoteResult } from "../../domain/repositories/ComplaintRepository";
import { Complaint, ComplaintModel } from "../../domain/entities/complaint.model";
import { logger } from "../logger";
import { AppError } from "../../domain/errors/app-error";

export class ComplaintRepositorySupabase implements ComplaintRepository {
  constructor(private readonly client: SupabaseClient) { }

  async create(complaint: Complaint){
    const { data, error } = await this.client.from('complaints').insert(complaint);
    
    if (error) {
      logger.error(`Error creating complaint: ${error.message}`)
      throw error
    }

    if (!data) {
      logger.error("Error creating complaint: no data returned")
      throw new Error("Error creating complaint: no data returned")
    }

    const parsedData = ComplaintModel.safeParse(data);

    if (!parsedData.success) {
      logger.error(`Error creating complaint: ${parsedData.error.message}`)
      throw parsedData.error
    }

    logger.info(`Complaint created successfully: ${parsedData.data.id}`)

    return data 
  }

  async findAll() {
    const { data, error } = await this.client.from('complaints').select('*');
    
    if (error) {
      logger.error(`Error finding complaints: ${error.message}`)
      throw error
    }

    if (!data) {
      logger.error("Error finding complaints: no data returned")
      throw new Error("Error finding complaints: no data returned")
    }

    logger.info(`Found ${data.length} complaints`)

    return data
  };

  async findBySubjectType(subjectType: string){
    const { data, error} = await this.client.from('complaints').select('*').eq('subject_type', subjectType);
    
    if (error) {
      logger.error(`Error finding complaints: ${error.message}`)
      throw new AppError("Error finding complaints", 500)
    }

    if (!data) {
      logger.error("Error finding complaints: no data returned")
      throw new AppError("Error finding complaints: no data returned", 500)
    }

    logger.info(`Found ${data.length} complaints`)

    return data
  };

  async vote(id: string, userId: string, voteType: "up" | "down") {
    const columnType = voteType === "up" ? "upVotes" : "downVotes";

    const { data: newScore, error } = await this.client.rpc("increment_vote_column_and_return_score", {
      complaint_id: id,
      column_name: columnType,
    });

    if (error || newScore === null) {
      logger.error("Erro ao atualizar votos");
      throw new Error("Erro ao atualizar votos");
    }

    return {
      status: 'voted',
      newScore: newScore,
    } satisfies VoteResult;
  }
  
}