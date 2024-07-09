'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { books } from '@/src/data/books';

type BookContentProps = {
  userId: string;
  bookId: string;
  pagenum: number;
};

function BookContent({ userId, bookId, pagenum }: BookContentProps) {
  console.log(bookId)
  const router = useRouter();
  const book = books.find(book => book.id === parseInt(bookId));
  const pagecontent = book ? book.chunks[pagenum - 1] : 'Page not found';
  const totalChunks = book ? book.chunks.length : 0;

  const handleNextPage = () => {
    if (pagenum < totalChunks) {
      router.push(`/${userId}/books/${bookId}/${pagenum + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (pagenum > 1) {
      router.push(`/${userId}/books/${bookId}/${pagenum - 1}`);
    }
  };

  return (
    <div>
      <div className="flex items-center h-screen">
        <button
          onClick={handlePrevPage}
          disabled={pagenum <= 1}
          className="bg-gray-200 hover:bg-gray-400 flex items-center justify-center h-full w-32 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex-grow mx-10">
          <p>{pagecontent}</p>
        </div>
        <button
          onClick={handleNextPage}
          disabled={pagenum >= totalChunks}
          className="bg-gray-200 hover:bg-gray-400 flex items-center justify-center h-full w-16 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookContent;
