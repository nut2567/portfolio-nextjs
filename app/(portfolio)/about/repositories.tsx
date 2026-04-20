// components/Repositories.tsx (Client Component)
'use client' // ตรงนี้เป็น Client Component
import React from 'react'

export default function Repositories({
  repositories: _repositories,
}: {
  repositories: any[]
}) {
  return <div className="contributions-grid"></div>
}
