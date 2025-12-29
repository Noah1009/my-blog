// components/PageLayout.tsx

import type { JSX } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function PageLayout({ children }: Props): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
