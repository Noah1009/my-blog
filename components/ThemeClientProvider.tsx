// components/ThemeClientProvider.tsx
'use client'

import ThemeProvider from '@/components/ThemeProvider'

export default function ThemeClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeProvider>{children}</ThemeProvider>
}
