'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


export default function Home() {
  const { data: session, status } = useSession();
  

  // Check if session is defined
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to see the books.</div>;
  }
  // const userId = session.user?.id;

  
  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen px-2">
      <h1 className="text-5xl font-bold mb-20"> Lyceum </h1>
      
      <div className="space-y-2">
        <Link href={`${session.user?.id}/books`}>Go to Books</Link>
      </div>
      
    </div>
  );
}
