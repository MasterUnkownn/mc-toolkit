import { useState } from "react";

const TABS = [
  "minecraft:crafting_shaped",
  "minecraft:crafting_shapeless",
  "minecraft:smelting",
  "custom"
];

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const scan = async () => {
    const res = await fetch("http://localhost:5000/api/scan_recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/data/data/com.termux/files/home/mc-toolkit/backend/generated_datapacks"
      })
    });

    setRecipes(await res.json());
  };

  const filtered = recipes.filter(r =>
    activeTab === "custom"
      ? !r.type?.startsWith("minecraft:")
      : r.type === activeTab
  );

  return (
    <div>
      <h2>Recipes</h2>

      <div style={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={styles.tab}
          >
            {tab.split(":")[1]}
          </button>
        ))}
      </div>

      <button onClick={scan}>Scan Recipes</button>

      <RecipeBuilder />

      {filtered.map((r, i) => (
        <div key={i} style={styles.card}>
          {r.namespace}/{r.file}
        </div>
      ))}
    </div>
  );
}

function RecipeBuilder() {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [result, setResult] = useState("");
  const [name, setName] = useState("");

  const updateSlot = (i, value) => {
    const copy = [...grid];
    copy[i] = value;
    setGrid(copy);
  };

  const buildRecipe = () => {
    const pattern = ["ABC", "DEF", "GHI"];

    const key = {};
    grid.forEach((item, i) => {
      if (!item) return;
      const char = String.fromCharCode(65 + i);
      key[char] = { item };
    });

    return {
      type: "minecraft:crafting_shaped",
      pattern,
      key,
      result: {
        item: result
      }
    };
  };

  const save = async () => {
    const recipe = buildRecipe();

    await fetch("http://localhost:5000/api/save_recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        path: "/data/data/com.termux/files/home/mc-toolkit/backend/generated_datapacks/YOUR_PACK",
        namespace: "default",
        subfolder: "",
        filename: name,
        recipe
      })
    });

    alert("Saved!");
  };

  return (
    <div style={styles.builder}>
      <h3>JEI Style Builder</h3>

      <div style={styles.grid}>
        {grid.map((slot, i) => (
          <input
            key={i}
            placeholder="minecraft:stick"
            value={slot}
            onChange={(e) => updateSlot(i, e.target.value)}
            style={styles.slot}
          />
        ))}
      </div>

      <input
        placeholder="Result item"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Recipe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <button onClick={save} style={styles.button}>
        Save Recipe
      </button>
    </div>
  );
}

const styles = {
  tabs: {
    display: "flex",
    gap: "5px",
    marginBottom: "10px"
  },
  tab: {
    padding: "8px",
    background: "#222",
    color: "#0f0",
    border: "none"
  },
  builder: {
    marginTop: "20px",
    padding: "10px",
    background: "#111"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "5px"
  },
  slot: {
    padding: "10px"
  },
  input: {
    width: "100%",
    marginTop: "10px",
    padding: "8px"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#0f0"
  },
  card: {
    background: "#222",
    padding: "8px",
    marginTop: "5px"
  }
};

export default Recipes;
