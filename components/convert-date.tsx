// component/convert-date.tsx

import type { JSX } from 'react'
import { parseISO, format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import type { Locale } from 'date-fns' // ✅ Locale型を明示

type Props = {
  dateISO: string
}

export default function ConvertDate({ dateISO }: Props): JSX.Element {
  return (
    <time dateTime={dateISO}>
      {format(parseISO(dateISO), 'yyyy年MM月dd日', {
        locale: ja as unknown as Locale, // ✅ ← 型変換を二重にかけて回避
      })}
    </time>
  )
}

