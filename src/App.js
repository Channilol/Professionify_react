import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import { useEffect } from 'react';
import { applyTheme } from './Components/ThemeSwitch/ThemeSwitch';

function App() {

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
    const theme = localStorage.getItem("theme");
    if (theme) applyTheme(theme);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Dashboard />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
