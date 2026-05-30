import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ToastProvider } from '@/components/ui/toast-provider'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AdminLayout } from '@/components/AdminLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { PartnersPage } from '@/pages/PartnersPage'
import { BannersPage } from '@/pages/BannersPage'
import { UsersPage } from '@/pages/UsersPage'
import { ContactInfoPage } from '@/pages/ContactInfoPage'

function RedirectToDashboard() {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    )
  }

  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CategoriesPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/partners"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PartnersPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/banners"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BannersPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ContactInfoPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<RedirectToDashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
