import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Glosses from './components/Glosses';
import Home from './components/Home';
import Synonyms from './components/Synonyms';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:word" element={<Glosses />} />
          <Route
            path="/:word/:pos/:posOffset/synonyms"
            element={<Synonyms />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
