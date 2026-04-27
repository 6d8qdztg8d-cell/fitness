import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { food } = req.body
  if (!food?.trim()) return res.status(400).json({ error: 'Keine Eingabe' })

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `Wie viele Kalorien (kcal) und Gramm Protein hat: "${food}"?
Antworte NUR mit JSON, kein weiterer Text:
{"kcal": <zahl>, "protein": <zahl>, "carbs": <zahl>, "fat": <zahl>}
Wenn unbekannt, schätze vernünftig. Keine Einheiten, nur Zahlen.`,
        },
      ],
    })

    const text = completion.choices[0].message.content.trim()
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Kein JSON in Antwort')

    const data = JSON.parse(match[0])
    res.json({
      kcal: Math.round(Number(data.kcal) || 0),
      protein: Math.round(Number(data.protein) || 0),
      carbs: Math.round(Number(data.carbs) || 0),
      fat: Math.round(Number(data.fat) || 0),
    })
  } catch (err) {
    const status = err?.status || 500
    const msg = err?.message || 'Unbekannter Fehler'
    console.error('OpenAI Fehler:', status, msg)
    if (status === 401) return res.status(401).json({ error: 'Ungültiger API Key' })
    if (status === 429) return res.status(429).json({ error: 'Rate limit – kurz warten' })
    if (status === 402) return res.status(402).json({ error: 'Kein OpenAI Guthaben' })
    res.status(500).json({ error: msg })
  }
}
