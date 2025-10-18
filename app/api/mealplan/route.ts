import OpenAI from "openai";

export const runtime = "nodejs"; // EdgeでなくNodeを使用

type Preferences = Record<string, unknown>;

const schema = {
  type: "object",
  properties: {
    week: {
      type: "array",
      minItems: 7,
      maxItems: 7,
      items: {
        type: "object",
        properties: {
          day: { type: "string" },
          meals: {
            type: "object",
            properties: {
              breakfast: { type: "string" },
              lunch: { type: "string" },
              dinner: { type: "string" },
              calories: { type: "number" },
              ingredients: { type: "array", items: { type: "string" } },
            },
            required: ["breakfast", "lunch", "dinner"],
            additionalProperties: false,
          },
        },
        required: ["day", "meals"],
        additionalProperties: false,
      },
    },
  },
  required: ["week"],
  additionalProperties: false,
} as const;

export async function POST(req: Request) {
  try {
    const { preferences } = (await req.json()) as { preferences?: Preferences };
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const instructions = [
      "あなたは管理栄養士であり料理研究家です。",
      "日本の一般家庭向けに、来週7日分の献立(朝/昼/夜)を提案してください。",
      "食材の重複を適度に再利用し、無駄を減らします。",
      "和洋中のバランスと季節感を意識します。",
      "指定がある場合はアレルギー・嗜好・時間・予算を厳守してください。",
      "出力は厳密に指定のJSONスキーマに一致させてください。",
    ].join("\n");

    const prompt = `${instructions}\n\n条件: ${JSON.stringify(preferences ?? {}, null, 2)}`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "MealPlan",
          schema,
          strict: false,
        },
      },
      temperature: 0.7,
    });

    // Node SDKのヘルパー
    const text = (response as any).output_text ??
      (response as any).output?.[0]?.content?.[0]?.text ?? "";

    if (!text) {
      return new Response(JSON.stringify({ error: "No content" }), { status: 502 });
    }

    const data = JSON.parse(text);
    return Response.json(data);
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err?.message ?? "Unexpected error" }),
      { status: 500 }
    );
  }
}
