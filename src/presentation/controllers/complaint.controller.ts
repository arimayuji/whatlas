import { FastifyReply, FastifyRequest } from "fastify";
import { CreateComplaintUseCase } from "../../application/usecases/CreateComplaintUseCase";
import { FindAllComplaintsUseCase } from "../../application/usecases/FindAllComplaintsUseCase";
import { GetComplaintsBySubjectTypeUseCase } from "../../application/usecases/GetComplaintsBySubjectTypeUseCase";
import { Complaint } from "../../domain/entities/complaint.model";

export class ComplaintController {
  constructor(
    private readonly createComplaintUseCase: CreateComplaintUseCase,
    private readonly findAllComplaintsUseCase: FindAllComplaintsUseCase,
    private readonly getComplaintsBySubjectTypeUseCase: GetComplaintsBySubjectTypeUseCase,
  ) { }
  
  async createComplaint(req: FastifyRequest<{ Body: Complaint }>, res: FastifyReply) {
    const {createdAt,downVotes,id,subjectId,subjectType,text,upVotes} = req.body
  }
  
  async findAllComplaints(req: FastifyRequest, res: FastifyReply) {

   }
  
  async getComplaintsBySubjectType(req: FastifyRequest<{ Params: { subjectType: string } }>, res: FastifyReply) {
    const { subjectType } = req.params
  }

}