import { z } from "zod/v4";
import {
  ConversationIntent,
  ConversationStep,
} from "../enums/conversation.enums";

export const ConversationContextSchema = z.record(z.any(), z.any());

export const ConversationStateSchema = z.object({
  currentStep: z.enum(ConversationStep),
  lastIntent: z.enum(ConversationIntent),
  contextData: ConversationContextSchema.optional(),
  updatedAt: z.string(),
  expiresAt: z.string().optional(),
});

export type ConversationState = z.infer<typeof ConversationStateSchema>;
