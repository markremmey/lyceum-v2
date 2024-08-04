import React from 'react';
import Link from 'next/link';
import { books } from '../data/books';

function DisplayBooks({ userId }: { userId: string }) {

  console.log(userId)

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`books/${book.id}/1`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayBooks