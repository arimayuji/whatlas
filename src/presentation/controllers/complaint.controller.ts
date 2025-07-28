import { FastifyReply, FastifyRequest } from "fastify";
import { CreateComplaintUseCase } from "../../application/usecases/CreateComplaintUseCase";
import { FindAllComplaintsUseCase } from "../../application/usecases/FindAllComplaintsUseCase";
import { GetComplaintsBySubjectTypeUseCase } from "../../application/usecases/GetComplaintsBySubjectTypeUseCase";
import { responseSuccess } from "../../utils/responseSuccess";

export class ComplaintController {
  constructor(
    private readonly createComplaintUseCase: CreateComplaintUseCase,
    private readonly findAllComplaintsUseCase: FindAllComplaintsUseCase,
    private readonly getComplaintsBySubjectTypeUseCase: GetComplaintsBySubjectTypeUseCase,
  ) { }
  
  async createComplaint(req: FastifyRequest<{ Body: { subjectType: 'terminal_onibus' | 'linhas_metro' | 'linhas_trem' | 'linhas_onibus', text: string} }>, res: FastifyReply) {
    const { subjectType, text } = req.body
    
    const result = await this.createComplaintUseCase.exec({subjectType, text});

    return responseSuccess(res, { data: result, message: "Complaint created successfully", code: 201 });
  }
  
  async findAllComplaints(req: FastifyRequest, res: FastifyReply) {
    const result = await this.findAllComplaintsUseCase.exec();
    
    return responseSuccess(res, { data: result, message: "Complaints retrieved successfully", code: 200 });
   }
  
  async getComplaintsBySubjectType(req: FastifyRequest<{ Params: { subjectType: string } }>, res: FastifyReply) {
    const { subjectType } = req.params

    const result = await this.getComplaintsBySubjectTypeUseCase.exec({ subjectType });  

    return responseSuccess(res, { data: result, message: "Complaints by subject type retrieved successfully", code: 200 });
  }

}