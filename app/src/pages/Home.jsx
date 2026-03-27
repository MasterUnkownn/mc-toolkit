function Home() {
  return (
    <div style={styles.container}>
      <h1>MC Toolkit</h1>
      <p>Mobile Minecraft development toolkit</p>

      <div style={styles.card}>
        <h2>Datapack Creator</h2>
        <p>Create and manage datapacks directly from your phone.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    background: "#222",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "10px",
  },
};

export default Home;
