import { Link, Routes, Route } from "react-router-dom";
import Start from "./datapack/Start";
import Recipes from "./datapack/Recipes";
import LootTables from "./datapack/LootTables";

function DatapackCreator() {
  return (
    <div style={styles.container}>
      <h1>Datapack Creator</h1>

      <div style={styles.nav}>
        <Link to="" style={styles.link}>Start</Link>
        <Link to="recipes" style={styles.link}>Recipes</Link>
        <Link to="loot" style={styles.link}>Loot Tables</Link>
      </div>

      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="loot" element={<LootTables />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  nav: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  link: {
    padding: "10px",
    background: "#222",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#0f0",
  },
  content: {
    background: "#111",
    padding: "15px",
    borderRadius: "10px",
  },
};

export default DatapackCreator;
