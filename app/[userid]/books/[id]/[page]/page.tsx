'use client'
import React from 'react'
import Chat from '@/src/components/Chat';
import ChatInput from '@/src/components/ChatInput';
import BookContent from '@/src/components/BookContent';

function page({ params }: { params: { userid: string; id: string; page: string } }) {


  const pagenum = parseInt(params.page, 10);
  const pageid = params.id + '-' + pagenum;

  return (
    <div className="h-screen flex flex-col">
      <div className="h-1/2">
        <BookContent
          userId={params.userid}
          bookId={params.id}
          pagenum={pagenum}
        />
      </div>
      <div className="h-1/2 flex flex-col">
        <Chat chatId={pageid} />
        <ChatInput chatId={pageid} />
      </div>

    </div>

  );
}

export default page