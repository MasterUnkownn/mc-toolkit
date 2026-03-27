import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/datapack" style={styles.link}>Datapack Creator</Link>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    background: "#111",
  },
  link: {
    color: "#0f0",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;
