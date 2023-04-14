import { useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Glosses from './components/Glosses';
import Home from './components/Home';
import Synonyms from './components/Synonyms';

function App() {
  const resetFocusRef = useRef<
    HTMLDivElement | HTMLHeadingElement | HTMLInputElement | null
  >(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home resetFocusRef={resetFocusRef} />} />
          <Route
            path="/home"
            element={<Home resetFocusRef={resetFocusRef} />}
          />
          <Route
            path="/:word"
            element={<Glosses resetFocusRef={resetFocusRef} />}
          />
          <Route
            path="/:word/:pos/:posOffset/synonyms"
            element={<Synonyms resetFocusRef={resetFocusRef} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
