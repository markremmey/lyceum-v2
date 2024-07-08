'use client'
import React from 'react'
import { books } from '../../../../src/data/books'
import { usePathname, useRouter } from 'next/navigation';
import Chat from '../../../../src/components/Chat';
import ChatInput from '../../../../src/components/ChatInput';

function page({ params }: { params: { page: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [_, __, bookid, pagenumStr] = pathname.split('/');
  const pagenum = parseInt(pagenumStr, 10);

  const book = books.find(book => String(book.id) === bookid);
  const pagecontent = book ? book.chunks[pagenum-1] : 'Page not found';
  // "book ?" is a ternary operator to ensure that the book at the given book id in the previos line was found. `book.pages[pagenum-1]` retrieves the content of the page at the given page number in the book.
  const handleNextPage = () => {
    if (book && pagenum < book.chunks.length) {
      router.push(`/books/${bookid}/${pagenum + 1}`);
    }
  };

  const pageid = bookid + '-' + pagenum;
  

  const handlePrevPage = () => {
    if (pagenum > 1) {
      router.push(`/books/${bookid}/${pagenum - 1}`);
    }
  };

  return (
    <div>
    <div className="flex items-center h-screen">
      <button 
        onClick={handlePrevPage} 
        disabled={pagenum <= 1}
        className="bg-gray-200 hover:bg-gray-400 flex items-center justify-center h-full w-32 disabled:opacity-50"
      >Previous
      </button>
      <div className="flex-grow mx-10">
        {/* <p>Current pathname: {pathname}; Current book id {bookid}; Current page no {pagenum}</p> */}
        <p>{pagecontent}</p>
      </div>

      <button 
        onClick={handleNextPage} 
        disabled={book && pagenum >= book.chunks.length}
        className="bg-gray-200 hover:bg-gray-400 flex items-center justify-center h-full w-16 disabled:opacity-50"
      >Next
      </button>
    </div>

    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={pageid}/>
      <ChatInput chatId={pageid}/>
    </div>
    </div>
  )
}

export default page