import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StreamerPage from './pages/StreamerPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/streamers' exact element={<HomePage />} />
          <Route path='/streamers/:id' exact element={<StreamerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
