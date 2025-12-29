// components/VideoBackground.tsx
export default function VideoBackground() {
    return (
      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/oceanU_poster.jpg"
          className="video-bg"
        >
          <source src="/oceanU_compressed.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  