import { useState } from "react";

function Start() {
  const [name, setName] = useState("");

  const createPack = async () => {
    const res = await fetch("http://localhost:5000/api/create_datapack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        namespace: name.toLowerCase().replace(/\s+/g, "_")
      })
    });

    const data = await res.json();
    console.log("Created:", data);
  };

  return (
    <div>
      <h2>Datapack Setup</h2>

      <input
        placeholder="Datapack Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <button onClick={createPack} style={styles.button}>
        Create Datapack
      </button>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#0f0",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default Start;
