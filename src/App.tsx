import { useState } from "react";
import "./App.css";

import { FileUploader } from "./components/FileUploader";

function App() {
  const [count, setCount] = useState(0);

  const onChange = (items: Array<string>) => setCount(items.length);

  return (
    <div className="App">
      <h1>React + Web Drag&Drop API | POC</h1>
      {/* the parent component tells which format to support and its being notified 
      when the selected files are changing */}
      <FileUploader types=".png,.jpg" onChange={onChange} />
      <br />
      <small>
        (questo è fuori dal componente) Hai selezionato {count} files
      </small>
    </div>
  );
}

export default App;
