import { useRouter } from 'next/router'
import React from 'react'

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();


  return (
    <div>NewChat</div>
  )
}

export default NewChat