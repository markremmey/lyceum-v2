import React from 'react';
// import BookList from '../src/components/BookList';
import Link from 'next/link'
import { books } from '../src/data/books';

export default function Home() {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/books/${book.id}/1`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
