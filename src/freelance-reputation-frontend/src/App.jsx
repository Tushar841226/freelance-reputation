import React from "react";
import Home from "./pages/Home.jsx";
import { AuthProvider } from "./pages/useAuthClient.jsx";
import Login from "./pages/login.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
      <Home />
      <Login />
      </AuthProvider>
    </div>
  );
}

export default App;
