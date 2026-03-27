import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => setStatus(data.status));
  }, []);

  return (
    <div>
      <h1>Minecraft Toolkit</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;
