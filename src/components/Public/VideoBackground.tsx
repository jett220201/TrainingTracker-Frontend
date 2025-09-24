import { useEffect, useState } from "react";

function VideoBackground() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videos = [
        '/videos/4761426-hd_2048_1080_25fps.mp4',
        '/videos/5319760-hd_1920_1080_25fps.mp4',
        '/videos/6390166-hd_1920_1080_25fps.mp4'
    ];
    const videosMobile = [
        '/videos/6389061-hd_1080_1920_25fps.mp4',
        '/videos/4761423-hd_1080_2048_25fps.mp4',
        '/videos/5319754-hd_1080_1920_25fps.mp4'
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <video
                key={videos[currentVideo]}
                src={videos[currentVideo]}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden lg:block"
            />
            <video
                key={videosMobile[currentVideo]}
                src={videosMobile[currentVideo]}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 block lg:hidden"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
        </>
    );
}

export default VideoBackground;