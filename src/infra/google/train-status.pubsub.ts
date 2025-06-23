import * as functions from "firebase-functions";
import axios from "axios";
import * as cheerio from "cheerio";

import { firestore } from "../../utils/firebase";
import {
  TrainStatus,
  TrainStatusSchema,
} from "../../domain/entities/current-train-status.model";

export const pubsubTrainStatusListener = functions.pubsub.onMessagePublished(
  "train-status-topic",
  async (message) => {
    const res = await axios.get("https://www.diretodostrens.com.br", {
      timeout: 10000,
    });
    const html = res.data;

    const $ = cheerio.load(html);
    const statusElements = $(".linha-status");

    const updates: Record<string, TrainStatus> = {};

    statusElements.each((_, el) => {
      const name = $(el).find(".linha-nome").text().trim();
      const status = $(el).find(".situacao").text().trim();
      const description = $(el).find(".descricao").text().trim();

      const parsed = TrainStatusSchema.safeParse({
        name,
        status,
        description,
        updatedAt: new Date().toISOString(),
      });

      if (parsed.success) {
        updates[name] = parsed.data;
      } else {
        console.warn(`Erro ao parsear linha: ${name}`, parsed.error);
      }
    });

    const batch = firestore.batch();
    const collectionRef = firestore.collection("train-status");

    Object.entries(updates).forEach(([name, data]) => {
      const docRef = collectionRef.doc(name);
      batch.set(docRef, data);
    });

    await batch.commit();
    console.log(
      `[✔] Atualizado status de ${Object.keys(updates).length} linhas.`
    );
  }
);
