import React from 'react'
import { createRoot } from 'react-dom/client'
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-[0.10]">
      
      {/* High-Performance WebGL Fluid Gradient Shader (Dark/Bold) */}
      <MeshGradient
        className="absolute inset-0 w-full h-full mix-blend-multiply"
        colors={["#000000", "#b70021", "#590011", "#ff002f", "#0a0002"]}
        speed={0.15}
        backgroundColor="transparent"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-screen mix-blend-plus-lighter"
        colors={["#000000", "#ffffff", "#b70021", "#ff002f"]}
        speed={0.1}
        wireframe={true}
        backgroundColor="transparent"
      />

      {/* Pulsing Border & Spinning Ring matching brand */}
      <div className="absolute top-[30%] right-[10%] opacity-80 z-30 pointer-events-auto hidden md:block">
        <div className="relative w-40 h-40 flex items-center justify-center translate-x-12">
          <PulsingBorder
            colors={["#b70021", "#ff002f", "#ffffff", "#590011", "#cc0000"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.06}
            softness={0.2}
            intensity={4}
            spotsPerColor={4}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.4}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
            }}
          />

          <motion.svg
            className="absolute inset-0 w-full h-full opacity-80 drop-shadow-[0_0_10px_rgba(183,0,33,0.8)]"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transform: "scale(1.4)" }}
          >
            <defs>
              <path id="spin-circle" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <text className="text-[10px] fill-zinc-900 font-bold uppercase tracking-[0.2em]">
              <textPath href="#spin-circle" startOffset="0%">
                Precise Web Solutions • High Performance Engineering • 
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
      
    </div>
  )
}

const rootEl = document.getElementById('hero-bg-react-root')
if (rootEl) {
  createRoot(rootEl).render(<HeroBackground />)
}
