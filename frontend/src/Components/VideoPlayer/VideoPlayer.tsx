import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css"

type VideoPlayerProps = {
    url: string;
    width?: string | number;
    height?: string | number;
    controls?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    className?;
}

function VideoPlayer({
    url,
    width,
    height,
    controls,
    autoPlay = true,
    muted = false,
    loop = false,
    className = "videoPlayer"
}: VideoPlayerProps) {
    return (
        <ReactPlayer
            src={url}
            width={width}
            height={height}
            controls={controls}
            playing={autoPlay}
            muted={muted}
            loop={loop}
            className={styles[className]}
            onEnded={()=>{
                console.log("Aula concluída")
            }}
        />
    )
}
export default VideoPlayer