// types/html-to-text.d.ts
declare module 'html-to-text' {
    export interface HtmlToTextOptions {
      selectors?: {
        selector: string
        format?: 'skip'
        options?: {
          ignoreHref?: boolean
        }
      }[]
    }
  
    export function convert(input: string, options?: HtmlToTextOptions): string
  }