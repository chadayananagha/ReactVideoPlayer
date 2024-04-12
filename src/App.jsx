import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import videos from "./videos.json";
import VideoList from "./components/VideoList";

function App() {
  const [video, setvideo]=useState(videos[0]);
  return (
    <main className="flex gap-10 justify-center my-12">
      <section>
      <VideoPlayer video={video} />
      </section>
      <section className="flex flex-col gap-2">
        {videos.map((video)=>
      (
        <VideoList 
        key={video.title} 
        video={video} 
        setvideo={setvideo} />
      ))}
       
        </section>
    </main>

    )
  }
  export default App;
