import React from 'react'
import DisplayBooks from '@/src/components/DisplayBooks';


function page({ params }: { params: { userid: string }}) {
  return (
    <DisplayBooks userId={params.userid}/>
  )
}

export default page;