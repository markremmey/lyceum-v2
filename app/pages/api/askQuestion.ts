import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const endpoint = "https://remmey-aoai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview";
  const apiKey = process.env.AZURE_OPENAI_API_KEY!;
  const systemMessage = {
    role: 'system',
    content: 'You are an AI assistant that helps people find information.'
  };

  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey
  };
  
  if (req.method === 'POST') {
    const { prompt, chatId, model, session } = req.body;
    console.log(prompt, chatId, model, session)
    const payload = {
      "messages": [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": "You are an AI assistant that helps people find information."
            }
          ]
        }
      ],
      "temperature": 0.7,
      "top_p": 0.95,
      "max_tokens": 800
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error relaying the request:', error);
      res.status(500).json({ error: 'Internal Server Error' });

    } 
  } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
}