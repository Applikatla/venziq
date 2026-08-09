"use client"

import { usePathname } from 'next/navigation'

export function navigate(to: string): void {
  window.location.href = to
}

export function useRoute(): string {
  return usePathname() || '/'
}
