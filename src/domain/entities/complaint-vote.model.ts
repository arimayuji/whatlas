import { z } from "zod/v4";

export const ComplaintVoteModel = z.object({
  id: z.string(),
  complaintId: z.string(),
  userId: z.string(),
  vote_type: z.enum(["up", "down"]),
})

export type ComplaintVote = z.infer<typeof ComplaintVoteModel>
