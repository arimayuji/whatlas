import { z } from "zod/v4";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";

export const ComplaintModel = z.object({
  id: z.string(),
  text: z.string().min(1).max(256).nonempty(ZOD_ERRORS_MESSAGES["string.nonempty"]),
  subjectType: z.enum(["terminal_metro","terminal_onibus","linhas_metro", "linhas_onibus", "linhas_trem"]),
  subjectId: z.string().nonempty(),
  createdAt: z.string().optional().default(new Date().toISOString()),
  upVotes: z.number().min(0).default(0),
  downVotes: z.number().min(0).default(0),
})

export type Complaint = z.infer<typeof ComplaintModel>

