import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type ToastKind = 'success' | 'error'

interface Toast {
  id: number
  kind: ToastKind
  message: string
}

export interface ToastApi {
  success: (message: string) => void
  error: (message: string) => void
}

const DURATION_MS: Record<ToastKind, number> = { success: 4000, error: 7000 }
const MAX_VISIBLE = 4

// Module-level store so any page can raise a toast without a React context.
let queue: Toast[] = []
let nextId = 1
const timers = new Map<number, ReturnType<typeof setTimeout>>()
const subscribers = new Set<(toasts: Toast[]) => void>()

function publish() {
  subscribers.forEach(subscriber => subscriber(queue))
}

function dismissToast(id: number) {
  const timer = timers.get(id)
  if (timer !== undefined) clearTimeout(timer)
  timers.delete(id)
  queue = queue.filter(toast => toast.id !== id)
  publish()
}

function notify(kind: ToastKind, message: string) {
  const id = nextId++
  queue = [...queue.slice(-(MAX_VISIBLE - 1)), { id, kind, message }]
  timers.set(id, setTimeout(() => dismissToast(id), DURATION_MS[kind]))
  publish()
}

const toastApi: ToastApi = {
  success: message => notify('success', message),
  error: message => notify('error', message),
}

export function useToast(): ToastApi {
  return toastApi
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>(queue)

  useEffect(() => {
    subscribers.add(setToasts)
    setToasts(queue)
    return () => {
      subscribers.delete(setToasts)
    }
  }, [])

  return (
    <>
      {children}
      <div className="toaster" aria-live="polite">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast toast-${toast.kind}`}
            role={toast.kind === 'error' ? 'alert' : 'status'}
          >
            <span className="toast-message">{toast.message}</span>
            <button
              type="button"
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
