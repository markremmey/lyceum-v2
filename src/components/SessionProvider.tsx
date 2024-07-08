'use client'

import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react'

type Props = {
  children: React.ReactNode;
  session: Session | null;
}

export function SessionProvider({ children, session }: Props) {
  return (
    // session={session}
    <Provider> 
      {/*  The children below refers to whatever react element is deined when the SessionProvider function is invoked in my layout.tsx */}
      {children}
    </Provider>
  )
}