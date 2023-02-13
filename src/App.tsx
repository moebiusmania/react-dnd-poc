import { useState } from 'react'
import './App.css'

import { FileUploader } from "./components/FileUploader"

function App() {
  const [count, setCount] = useState(0)

  const onChange = (items: Array<string>) => setCount(items.length)

  return (
    <div className="App">
      <h1>React + Web Drag&Drop API | POC</h1>
      {/* il parent dice all'uploader quali formati supportare e viene notificato dei cambi di selezione */}
      <FileUploader types=".png,.jpg" onChange={onChange} />
      <br />
      <small>(questo è fuori dal componente) Hai selezionato {count} files</small>
    </div>
  )
}

export default App
