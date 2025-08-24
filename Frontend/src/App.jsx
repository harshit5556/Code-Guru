import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coding from "./pages/Coding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coding" element={<Coding/>} />
    </Routes>
  );
}

export default App;
