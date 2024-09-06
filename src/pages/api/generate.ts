import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

interface Body {
  prompt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { prompt } = req.body as Body;

    if (!prompt) {
      res.status(400).json("Body is missing");
    }

    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_KEY
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        const output = (
          result.response.candidates as GenerateContentCandidate[]
        )[0].content.parts[0].text;

        if (output) {
          res.status(200).json({ ok: true, message: output });
        }
      } else {
        res
          .status(400)
          .json({ ok: false, message: "Errore while generating the answer " });
      }
    } catch (e) {
      res
        .status(400)
        .json({ ok: false, message: "Errore while generating the answer" });
    }
  } else {
    res.status(405).json("Method not allowed");
  }
}
