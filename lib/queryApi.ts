import axios from 'axios';

const endpoint = "https://oai0-yxvym5n5ej2we.openai.azure.com/openai/deployments/chat/chat/completions?api-version=2024-02-15-preview";
const apiKey = process.env.AZURE_OPENAI_API_KEY!;

const headers = {
  'Content-Type': 'application/json',
  'api-key': apiKey
};

const payload = {
  "messages": [
    {
      "role": "system",
      "content": "You are an AI assistant that helps people find information."
    }
  ],
  "temperature": 0.7,
  "top_p": 0.95,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "max_tokens": 800,
  "stop": null
};

async function query(prompt: string, chatId: string, model: string) {
  payload.messages.push({
    role: 'user',
    content: prompt,
  });
  
  try {
    const response = await axios.post(endpoint, payload, { headers });
    return response.data; // Ensure the function returns the response data
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle the error and return null or appropriate value
  }
}
// const query = async (prompt: string, chatId: string, model: string) => {
//   const res = await openai
//     .createCompletion({
//       model,
//       prompt,
//       temperature: 0.9,
//       top_p: 1,
//       max_tokens: 1000,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     })
//     .then((res) => res.data.choices[0].text)
//     .catch((err) =>
//       console.log(`chatGpt unable to find an answer fot that! ${err.message}`)
//     );

//   return res;
// };



export default query