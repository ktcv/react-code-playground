import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

const defaultHtml = `<h1>This is a code playground</h1>

<p>Type some code to get started.</p>`

const defaultCss = `body {
  padding: 10px 25px;
}

h1, p {
  font-family: sans-serif;
}`

const defaultJavascript = `document.body.style.backgroundColor = 'lightblue'`

const App = () => {
  const [html, setHtml] = useLocalStorage('html', defaultHtml)
  const [css, setCss] = useLocalStorage('css', defaultCss)
  const [javascript, setJavascript] = useLocalStorage(
    'javascript',
    defaultJavascript
  )
  const [srcDoc, setSrcDoc] = useState('')

  console.log(html)
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
