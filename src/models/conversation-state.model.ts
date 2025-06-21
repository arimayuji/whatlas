import { z } from "zod";
import {
  ConversationIntent,
  ConversationStep,
} from "../enums/conversation.enums";

export const ConversationContextSchema = z.record(z.any());

export const ConversationStateSchema = z.object({
  currentStep: z.nativeEnum(ConversationStep),
  lastIntent: z.nativeEnum(ConversationIntent),
  contextData: ConversationContextSchema.optional(),
  updatedAt: z.string(),
  expiresAt: z.string().optional(),
});

export type ConversationState = z.infer<typeof ConversationStateSchema>;
