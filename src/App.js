import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useEffect } from "react";
import { applyTheme } from "./Components/ThemeSwitch/ThemeSwitch";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./lib/supabase";

function App() {
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
    const theme = localStorage.getItem("theme");
    if (theme) applyTheme(theme);
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
