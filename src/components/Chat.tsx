'use client';

import { useCollection } from 'react-firebase-hooks/firestore';
import { useSession } from 'next-auth/react';
import React from 'react'
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';

type Props = {
  chatId: string;
};

function Chat({chatId}: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session && 
    query(
      collection (
        db, 
        'users', 
        session?.user?.email!, 
        'chats', 
        chatId, 
        'messages'),
        orderBy('createdAt', 'asc')
      )
    );
  
  return (
    <div className="flex-1">Chat</div>
  )
}

export default Chat