`use client`;

import React from 'react';
import Link from 'next/link';
import { books } from '../data/books';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'

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

  // const { data: session, status } = useSession();
  // const userId = session.user?.id;

  // // Check if session is defined
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return <div>Please log in to see the books.</div>;
  // }

  // Retrieve user ID
  // console.log("userId")
  // console.log(session.user?.id)