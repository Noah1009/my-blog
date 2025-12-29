// scripts/theme-toggle.ts
(() => {
    try {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme: 'light' | 'dark' = storedTheme || (prefersDark ? 'dark' : 'light')
  
      const html = document.documentElement
      html.setAttribute('data-theme', theme)
      html.classList.toggle('dark', theme === 'dark')
    } catch (error) {
      console.error('Error applying theme early:', error)
    }
  })()