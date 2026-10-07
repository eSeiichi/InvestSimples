import { Link } from "react-router-dom";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer";

function Home() {
  return (
    <div className="pageContainer" style={{ padding: "48px 24px" }}>
      <h1>Invista com clareza, desde a primeira aula</h1>
      <p style={{ maxWidth: "70ch", marginTop: "12px", color: "var(--text-muted)" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam similique modi
        error. Quae debitis officia quos suscipit voluptas reprehenderit est voluptatem,
        eveniet quas, tempora, culpa tenetur at blanditiis doloremque amet!
      </p>

      <div style={{ maxWidth: "720px", marginTop: "28px" }}>
        <VideoPlayer
          url="https://youtu.be/4nFYQ1JUGAI?si=UGlfRXwObv1MUZNk"
          controls
        />
      </div>

      <p style={{ marginTop: "24px" }}>
        <Link to="/cursos">Conheça nossos cursos →</Link>
      </p>
    </div>
  );
}

export default Home;
