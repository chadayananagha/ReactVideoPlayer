// import React from 'react';
import { useRef,useState,useEffect } from 'react';

const VideoPlayer = ({currentVideo}) => {
  const videoRef= useRef(null);
  const intervalRef=useRef(null);
  const[isPlaying,setIsPlaying]=useState(false);
  // const[isFullScreen,setIsFullScreen]=useState(false);
  const[progress,setProgress]=useState(0);
  const[volume,setVolume]=useState(1);
  const[isMuted,setIsMuted]=useState(false);

  const updateProgress =() =>
  {
    if(videoRef.current)
    {
      const value=(videoRef.current.currentTime/videoRef.current.duration) *100;
      setProgress(value);
    }
  };
useEffect(() =>
{
  const video =videoRef.current;

  const handleVideoEnd = () =>
  {
    setIsPlaying(false);
    setProgress(0);
    stopProgressLoop();
  };
  if(video)
  {
    video.addEventListener('ended',handleVideoEnd);
  }
  return()=>
  {
    if(video)
    {
      video.removeEventListener('ended',handleVideoEnd);
    }
    stopProgressLoop();
  };
},[]);

  const startProgressLoop =() =>
  {
    if(intervalRef.current)
    {
      clearInterval(intervalRef.current);
    }
    intervalRef.current =setInterval(()=>
  {
    updateProgress();
  },1000);
  };

  const stopProgressLoop =() =>
  {
    if(intervalRef.current)
    {
      clearInterval(intervalRef.current);
      intervalRef.current =null;
    }
  };

  const togglePlayPause =() =>
    {
      if(videoRef.current)
      {
        if(videoRef.current.paused)
        {
          videoRef.current.play();
          setIsPlaying(true);
          startProgressLoop();
        }
        else{
          videoRef.current.pause();
          setIsPlaying(false);
          stopProgressLoop();
        }
      }
    };
    const stopVideo = () =>
    {
      if(videoRef.current)
      {
        videoRef.current.pause();
        videoRef.current.currentTime =0;
        setIsPlaying(false);
      }
    };
    const handleSeek = (event) =>
    {
      const seekTo = (event.target.value /100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTo;
      setProgress(event.target.value);
    };

    const toggleMute =() =>
    {
      const currentVolume = videoRef.current.volume;
      if(currentVolume > 0)
      {
        videoRef.current.volume=0;
        setVolume(0);
        setIsMuted(true);
      }
      else{
        videoRef.current.volume=1;
        setVolume(1);
        setIsMuted(false);
      }
    }
    const handleVolumeChange =(event) =>
    {
      const newVolume = event.target.value;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume===0);

    }
  return (
  <div className="player">
    <div>
      <h1 className='text-xl font-bold flex justify-center my-6 text-gray-600'>React Video Player</h1>
    </div>
    <video className='w-full aspect-video' src={currentVideo.sources} ref={videoRef} onClick={togglePlayPause} onPlay={startProgressLoop} onPause={stopProgressLoop}></video>
    <div className='flex my-4'>
      <button onClick={togglePlayPause}>  
        {isPlaying? 
        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>):
        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>)}
      </button>
      <button onClick={stopVideo}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
        </svg>
      </button>
      <input id="default-range" type="range" min='0' max='100' value={progress} onChange={handleSeek} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
      <button onClick={toggleMute}>
        {isMuted ? 
        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
      ):
        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      )}
      </button>
      <input id="default-range" type="range" min='0' max='1' step='0.05' value={volume} onChange={handleVolumeChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
      {/* <button onClick={toggleFullScreen}>
        {isFullScreen? 
        ():
      ()}
      </button> */}
    </div>
    <div>
      <p className='texl-base font-bold'>{currentVideo.title}</p>
    </div>
  </div>
  )
}

export default VideoPlayer;
