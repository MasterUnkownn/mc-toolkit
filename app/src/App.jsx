import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DatapackCreator from "./pages/DatapackCreator";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={styles.app}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datapack/*" element={<DatapackCreator />} />
      </Routes>
    </div>
  );
}

const styles = {
  app: {
    background: "#000",
    color: "#fff",
    minHeight: "100vh",
  },
};

export default App;
