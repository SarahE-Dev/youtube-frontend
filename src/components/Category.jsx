import React from 'react'
import { useParams } from 'react-router'

export default function Category({children}) {
    const category = useParams().category
  return (
    <div>
        {children}
    </div>
  )
}
