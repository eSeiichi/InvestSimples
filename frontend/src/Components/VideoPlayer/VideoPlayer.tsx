import ReactPlayer from "react-player";
import { FaVideoSlash } from "react-icons/fa";
import styles from "./VideoPlayer.module.css";

type VideoPlayerProps = {
  url?: string | null;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  /** classe extra aplicada no contêiner do player */
  className?: string;
  /** mensagem exibida quando a aula ainda não tem vídeo */
  emptyMessage?: string;
  onEnded?: () => void;
};

function VideoPlayer({
  url,
  width,
  height,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  className = "",
  emptyMessage = "Este conteúdo ainda não possui vídeo.",
  onEnded,
}: VideoPlayerProps) {
  const estiloContainer = {
    width: width ?? "100%",
    // sem altura definida o contêiner mantém a proporção 16:9 pelo CSS
    height: height,
  };

  if (!url) {
    return (
      <div
        className={`${styles.player} ${styles.empty} ${className}`}
        style={estiloContainer}
      >
        <FaVideoSlash aria-hidden="true" />
        <span>{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.player} ${className}`} style={estiloContainer}>
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls={controls}
        playing={autoPlay}
        muted={muted}
        loop={loop}
        onEnded={onEnded}
      />
    </div>
  );
}

export default VideoPlayer;
