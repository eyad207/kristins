import { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import AdminGuard from '@/components/auth/AdminGuard'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Kristins Brudesalong',
  description: 'Administrasjonspanel for Kristins Brudesalong',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className='min-h-screen bg-gray-50'>
        <AdminHeader />
        <div className='flex'>
          <AdminSidebar />
          <main className='flex-1 p-6'>{children}</main>
        </div>
      </div>
    </AdminGuard>
  )
}
