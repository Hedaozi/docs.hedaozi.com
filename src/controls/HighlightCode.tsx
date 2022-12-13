import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'

export function HighlightCode(props: CodeProps) {
  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true
    })
    const codes = document.querySelectorAll('pre code')
    codes.forEach((el) => {
      hljs.highlightElement(el as HTMLElement)
    })
  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
  )
}

interface CodeProps {
  content: string;
}
