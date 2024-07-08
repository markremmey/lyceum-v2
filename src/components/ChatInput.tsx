'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
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

  const model = 'gpt-3.5-turbo';

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

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input,
        chatId, 
        model, 
        session
      }),
    }).then(() => {
      //  Toast notification to say successful
      toast.success("ChatGPT has responded!", { id: notification })
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm focus:outline-none">
      <form onSubmit={e => sendMessage} className="p-5 space-x-5 flex disabled:text-gray-300">
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
    </div>
  )
}

export default ChatInput