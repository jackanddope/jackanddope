import { useRef, useEffect, useState } from 'react'
export default function AudioPlayer({src}){
  const ref = useRef(null); const [playing,setPlaying]=useState(false)
  useEffect(()=>{ if(ref.current){ ref.current.muted=true; ref.current.play().catch(()=>{}) } },[])
  return (
    <div className="fixed right-4 bottom-4 p-2 bg-black/60 rounded border">
      <audio ref={ref} src={src} loop />
      <div className="flex gap-2">
        <button onClick={()=>{ const a=ref.current; if(a.paused){ a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) } }} className="px-2 py-1 bg-white/5 rounded">{playing?'Pause':'Play'}</button>
        <button onClick={()=>{ const a=ref.current; a.muted=!a.muted }} className="px-2 py-1 bg-white/5 rounded">Mute</button>
      </div>
    </div>
  )
}