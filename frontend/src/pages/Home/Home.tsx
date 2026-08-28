import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer"

function Home() {
    return (
        <div>
            <h1>home</h1>
            <VideoPlayer
                url="https://youtu.be/4nFYQ1JUGAI?si=UGlfRXwObv1MUZNk"
                width="25%"
                height="200px"
                controls={true}
                muted={false}
                loop={false}
                className="styles.video"
            />
            <p>conheçam nossos cursos!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam similique modi error. Quae debitis officia quos suscipit voluptas reprehenderit est voluptatem, eveniet quas, tempora, culpa tenetur at blanditiis doloremque amet!</p>

        </div>
    )
}
export default Home