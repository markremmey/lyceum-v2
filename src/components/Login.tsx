'use client'

import React from 'react'

import { signIn } from 'next-auth/react';
import  Image from 'next/image';


function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex items-center justify-center mb-12">
        <Image
          src="/images/Aristotle.png"
          width={300}
          height={300}
          alt="logo"
        />
      </div>
    <button 
      onClick={() => signIn('google')} 
      className="font-bold animate-pulse">
        Sign in to use Lyceum
    </button>
  </div>
)
}

export default Login