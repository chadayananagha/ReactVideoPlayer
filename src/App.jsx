import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import videos from "./videos.json";
import VideoList from "./components/VideoList";

function App() {
  const [currentVideo, setCurrentVideo]=useState(videos[0]);
  return (
    <main className="flex gap-10 justify-center my-12">
      <section>
      <VideoPlayer currentVideo={currentVideo} />
      </section>
      <section className="flex flex-col gap-2">
        {videos.map((video)=>
      (
        <VideoList 
        key={video.title} 
        video={video} 
        setCurrentVideo={setCurrentVideo} />
      ))}
       
        </section>
    </main>

    )
  }
  export default App;
