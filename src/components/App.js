import React, { useState, useEffect } from 'react'
import Editor from './Editor'

const App = () => {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [javascript, setJavascript] = useState('')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>
    `)
    }, 500)

    return () => clearTimeout(timeout)
  }, [html, css, javascript])

  return (
    <div className='grid-container'>
      <Editor
        language='xml'
        displayName='HTML'
        value={html}
        onChange={setHtml}
      />
      <Editor language='css' displayName='CSS' value={css} onChange={setCss} />
      <Editor
        language='javascript'
        displayName='JS'
        value={javascript}
        onChange={setJavascript}
      />

      <div className='editor-container result-container'>
        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          frameBorder='0'
          width='100%'
          height='100%'
        />
      </div>
    </div>
  )
}

export default App
