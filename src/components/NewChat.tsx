import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div>NewChat</div>
  )
}

export default NewChat