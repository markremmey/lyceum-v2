'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';

import React from 'react'
import { serverTimestamp } from 'firebase/database';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = React.useState('');
  const { data: session } = useSession();
  const [response, setResponse] = React.useState('');

  const endpoint = "https://remmey-aoai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview";
  const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY!;
  const systemMessage = {
    role: 'system',
    content: 'You are an AI assistant that helps people find information.'
  };
  const userMessage = {
    role: 'user',
    content: prompt
  };

  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey
  };
  
  const payload = {
    "messages": [
      systemMessage,
      userMessage
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "max_tokens": 800
  };


  const sendMessage = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("")

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!
      }
    };

    console.log(chatId)

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );
    
    // Toast notification to say loading
    const notification = toast.loading('Sending message...');
    console.log('headers', headers)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      console.log('API Response:', JSON.stringify(result, null, 2))
      setResponse(result.choices[0].message.content);
      toast.success("ChatGPT has responded!", { id: notification });
    } catch (error) {
      console.error('Error fetching response:', error);
      toast.error("Failed to get response!", { id: notification });
    }
  };
  console.log(response)

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm focus:outline-none">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex disabled:text-gray-300">
        <input 
          type="text" 
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-transparent w-full focus:outline-none"
          placeholder="Type your message here...."
        />
        <button 
          type="submit"
          disabled={!prompt || !session}
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45"/>
        </button>
      </form>
      <p>Chat Input</p>
      {response && <div className="mt-4 p-4 bg-gray-800 text-black rounded">{response}</div>}
    </div>
  )
}

export default ChatInput