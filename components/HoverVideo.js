// components/HoverVideo.js
import { useRef, useState } from 'react'

export default function HoverVideo({ poster, videoSrc, alt = '', className = '' }) {
  const videoRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  const handleEnter = async () => {
    setHovering(true)
    const v = videoRef.current
    if (!v) return
    try {
      v.currentTime = 0
      await v.play()
    } catch (e) {
      // autoplay blocked or not ready — ignore
    }
  }

  const handleLeave = () => {
    setHovering(false)
    const v = videoRef.current
    if (!v) return
    try {
      v.pause()
      v.currentTime = 0
    } catch (e) {}
  }

  return (
    <div
      className={`hover-video ${hovering ? 'hovering' : ''} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
    >
      <img src={poster} alt={alt} className="hover-video__img" />
      <video
        ref={videoRef}
        className="hover-video__video"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}
