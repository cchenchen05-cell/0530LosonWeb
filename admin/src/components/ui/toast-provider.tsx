import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import {
  Toast,
  ToastClose,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from '@/components/ui/toast'

type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
}

interface ToastContextType {
  toasts: ToastProps[]
  toast: (props: Omit<ToastProps, 'id'>) => void
  success: (props: Omit<ToastProps, 'id' | 'variant'>) => void
  error: (props: Omit<ToastProps, 'id' | 'variant'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...props, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const success = useCallback((props: Omit<ToastProps, 'id' | 'variant'>) => {
    toast({ ...props, variant: 'success' })
  }, [toast])

  const errorToast = useCallback((props: Omit<ToastProps, 'id' | 'variant'>) => {
    toast({ ...props, variant: 'destructive' })
  }, [toast])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, success, error: errorToast, dismiss }}>
      {children}
      <ToastViewport>
        {toasts.map((t) => (
          <Toast key={t.id} variant={t.variant}>
            <div className="flex-1">
              {t.title && <ToastTitle>{t.title}</ToastTitle>}
              {t.description && <ToastDescription>{t.description}</ToastDescription>}
            </div>
            <ToastClose onClick={() => dismiss(t.id)} />
          </Toast>
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  )
}
