'use client'

import Sidebar from './components/Sidebar'
import AdminHeader from './components/AdminHeader'

// Authentication is now handled by middleware.ts
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#e6e6e6] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

